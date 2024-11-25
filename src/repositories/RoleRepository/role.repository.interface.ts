import { InfoRole, Role } from '@prisma/client';

export interface IRoleRepository {
	create: (roledata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}) => Promise<InfoRole>;
	getById: (id: number) => Promise<InfoRole | null>;
	getByEmail: (email: string) => Promise<InfoRole | null>;
	getByRole: (role: Role) => Promise<InfoRole | null>;
	update: (
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	) => Promise<InfoRole>;
	delete: (id: number) => Promise<InfoRole>;
}
