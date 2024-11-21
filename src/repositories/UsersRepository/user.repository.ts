import { PrismaClient, User, UserRole } from '@prisma/client';
import { IUserRepisitory } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class UserRepository implements IUserRepisitory {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(userdata: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}): Promise<User> {
		const user = await this.prisma.user.create({
			data: userdata,
		});
		return user;
	}
	public async getById(userId: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});
		return user;
	}
	public async getByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { email: email },
		});
		return user;
	}
	public async getAll(): Promise<User[] | null> {
		const users = await this.prisma.user.findMany();
		return users;
	}
	public async update(
		userId: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	): Promise<User> {
		const updateuser = await this.prisma.user.update({
			where: { id: userId },
			data: userData,
		});
		return updateuser;
	}
	public async delete(userId: number): Promise<User> {
		const deleteuser = await this.prisma.user.delete({
			where: { id: userId },
		});
		return deleteuser;
	}
}
