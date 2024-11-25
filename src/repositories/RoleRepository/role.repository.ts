import { PrismaClient, InfoRole, Role } from '@prisma/client';
import { IRoleRepository } from './role.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class RoleRepository implements IRoleRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(roledata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}): Promise<InfoRole> {
		const role = await this.prisma.infoRole.create({
			data: roledata,
		});
		return role;
	}
	public async getById(id: number): Promise<InfoRole | null> {
		const role = await this.prisma.infoRole.findUnique({
			where: { id },
		});
		return role;
	}
	public async getByEmail(email: string): Promise<InfoRole | null> {
		const role = await this.prisma.infoRole.findUnique({
			where: { email },
		});
		return role;
	}
	public async getByRole(inforole: Role): Promise<InfoRole | null> {
		const role = await this.prisma.infoRole.findFirst({
			where: { role: inforole },
		});
		return role;
	}
	public async update(
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	): Promise<InfoRole> {
		const updaterole = await this.prisma.infoRole.update({
			where: { id },
			data: roledata,
		});
		return updaterole;
	}
	public async delete(id: number): Promise<InfoRole> {
		const deleterole = await this.prisma.infoRole.delete({
			where: { id },
		});
		return deleterole;
	}
}
