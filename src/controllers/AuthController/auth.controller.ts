import { Request, Response } from 'express';
import { IAuthController } from './auth.controller.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../type';
import { IAuthService } from '../../services/AuthService/auth.service.interface';
import { InfoRole, User } from '@prisma/client';

@injectable()
export class AuthController implements IAuthController {
	constructor(@inject(TYPES.AuthService) private authservice: IAuthService) {}
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, password, name, role } = req.body as InfoRole;
			if (!email || !password || !name || !role) {
				res.status(400).json({
					message: 'Invalid user data. email, password, name, role, notifications are required.',
				});
				return;
			}
			const registeruser = await this.authservice.register({
				email,
				password,
				name,
				role,
			});
			res.status(201).json(registeruser);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body as InfoRole;
			if (!email || !password) {
				res.status(400).json({
					message: 'Invalid user data. email, password are required.',
				});
				return;
			}
			const { token } = await this.authservice.login({
				email,
				password,
			});
			res.status(200).json({ access_token: token });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
