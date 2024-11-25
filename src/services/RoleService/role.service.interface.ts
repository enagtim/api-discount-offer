import { InfoRole, Role } from '@prisma/client';

export interface IRoleService {
	createRole: (roledata: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}) => Promise<InfoRole>;
	getRoleById: (id: number) => Promise<InfoRole | null>;
	updateDataRole: (
		id: number,
		roledata: Partial<{ email: string; password: string; name: string; role: Role }>,
	) => Promise<InfoRole>;
	deleteRole: (id: number) => Promise<InfoRole>;
}
