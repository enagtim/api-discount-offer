import { Request, Response } from 'express';

export interface IRoleController {
	createRole: (req: Request, res: Response) => Promise<void>;
	getRoleById: (req: Request, res: Response) => Promise<void>;
	updateRole: (req: Request, res: Response) => Promise<void>;
	deleteRole: (req: Request, res: Response) => Promise<void>;
}
