import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (requiredRole: Role) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const infoRole = req.infoRole;

		if (!infoRole) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		if (infoRole.role !== requiredRole) {
			res.status(403).json({ message: 'Role does not exist' });
			return;
		}
		next();
	};
};
