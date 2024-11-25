import { Role, InfoRole } from '@prisma/client';
import { IRoleService } from './role.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IRoleRepository } from '../../repositories/RoleRepository/role.repository.interface';
import bcrypt from 'bcryptjs';
import 'reflect-metadata';

@injectable()
export class RoleService implements IRoleService {
	constructor(@inject(TYPES.RoleRepository) private userRepository: IRoleRepository) {}
	public async createRole(roledata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}): Promise<InfoRole> {
		const existedRole = await this.userRepository.getByEmail(roledata.email);
		if (existedRole) {
			throw new Error(`Role ${roledata.email} is existed!`);
		}
		const hashedPassword = await bcrypt.hash(roledata.password, 10);
		return this.userRepository.create({ ...roledata, password: hashedPassword });
	}
	public async getRoleById(id: number): Promise<InfoRole | null> {
		const role = await this.userRepository.getById(id);
		return role;
	}
	public async updateDataRole(
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	): Promise<InfoRole> {
		await this.userRepository.getById(id);
		if (roledata.password) {
			roledata.password = await bcrypt.hash(roledata.password, 10);
		}
		return this.userRepository.update(id, roledata);
	}
	public async deleteRole(id: number): Promise<InfoRole> {
		await this.userRepository.getById(id);
		return this.userRepository.delete(id);
	}
}
