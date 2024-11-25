import { inject, injectable } from 'inversify';
import { IAuthService } from './auth.service.interface';
import { TYPES } from '../../type';
import { IRoleRepository } from '../../repositories/RoleRepository/role.repository.interface';
import { Role, InfoRole } from '@prisma/client';
import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(TYPES.RoleRepository) private roleRepository: IRoleRepository) {}
	public async register(registerdata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}): Promise<InfoRole> {
		if (registerdata.role === 'ADMIN') {
			const admin = await this.roleRepository.getByRole(registerdata.role);
			if (admin) {
				throw new Error(`Admin is existed!`);
			}
		}
		if (registerdata.role === 'SUPPLIER') {
			throw new Error('Only admin can register! We should wait until ADMIN create your account');
		}
		const hashedPassword = await bcrypt.hash(registerdata.password, 10);
		return this.roleRepository.create({ ...registerdata, password: hashedPassword });
	}
	public async login(logingdata: { email: string; password: string }): Promise<{ token: string }> {
		const role = await this.roleRepository.getByEmail(logingdata.email);
		if (!role) {
			throw new Error('Email or password not valid!');
		}
		const isPasswordIsValid = await bcrypt.compare(logingdata.password, role.password);
		if (!isPasswordIsValid) {
			throw new Error('Password invalid');
		}
		const token = jwt.sign(
			{ id: role.id, role: role.role },
			process.env.JWT_SECRET || 'default_secret',
			{
				expiresIn: '1h',
			},
		);
		return { token };
	}
}
