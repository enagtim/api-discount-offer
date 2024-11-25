import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InfoRole } from '@prisma/client';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		res.status(401).json({ message: 'Authentication token is required' });
		return;
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as InfoRole;
		req.infoRole = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};
