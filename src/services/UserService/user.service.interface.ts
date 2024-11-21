import { User, UserRole } from '@prisma/client';

export interface IUserService {
	createUser: (data: {
		email: string;
		password: string;
		name: string;
		role: UserRole;
	}) => Promise<User>;
	getUserById: (userId: number) => Promise<User | null>;
	updateDataUser: (
		userId: number,
		userData: Partial<{ email: string; password: string; name: string; role: UserRole }>,
	) => Promise<User>;
	deleteUser: (userId: number) => Promise<User>;
}
