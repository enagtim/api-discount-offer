import express, { Express } from 'express';
import { Server } from 'http';
import { Container, inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../type';
import { PrismaClient } from '@prisma/client';
import { setupAuthRoutes } from '../routes/auth.router';
import dotenv from 'dotenv';
import { setupUsersRoutes } from '../routes/users.router';

@injectable()
export class App {
	private app: Express;
	private port: number;
	private server: Server;

	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {
		this.app = express();
		this.port = 8000;
	}
	public async init(appContainer: Container) {
		this.app.use(express.json());
		this.app.use(setupAuthRoutes(appContainer));
		this.app.use(setupUsersRoutes(appContainer));
		dotenv.config();
		await this.prisma.$connect();
		this.server = this.app.listen(this.port, () => {
			console.log(`Сервер запущен на http://localhost:${this.port}`);
		});
	}
}
