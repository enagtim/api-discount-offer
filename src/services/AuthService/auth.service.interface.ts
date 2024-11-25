import { InfoRole, Role } from '@prisma/client';

export interface IAuthService {
	register: (registerdata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}) => Promise<InfoRole>;
	login: (logingdata: { email: string; password: string }) => Promise<{ token: string }>;
}
