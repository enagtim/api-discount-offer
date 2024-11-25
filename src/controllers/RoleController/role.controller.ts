import { Request, Response } from 'express';
import { IRoleController } from './role.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IRoleService } from '../../services/RoleService/role.service.interface';
import 'reflect-metadata';
import { InfoRole, User } from '@prisma/client';

@injectable()
export class RoleController implements IRoleController {
	constructor(@inject(TYPES.RoleService) private roleService: IRoleService) {}
	public async createRole(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, name, role } = req.body as InfoRole;
			if (!email || !password || !name || !role) {
				res.status(400).json({
					message: 'Invalid user data. email, password, name and role are required.',
				});
				return;
			}
			const inforole = await this.roleService.createRole({
				email,
				password,
				name,
				role,
			});
			res.status(201).json(inforole);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async getRoleById(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const inforole = await this.roleService.getRoleById(id);
			if (!inforole) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			res.status(200).json(inforole);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async updateRole(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const inforole = await this.roleService.updateDataRole(id, req.body);
			if (!inforole) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			res.status(200).json(inforole);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async deleteRole(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Role ID is required' });
				return;
			}
			const inforole = await this.roleService.deleteRole(id);
			if (!inforole) {
				res.status(404).json({ message: 'Role not found' });
				return;
			}
			res.status(200).json({ message: 'Role deleted successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
