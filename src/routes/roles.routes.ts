import { Router } from 'express';
import { Container } from 'inversify';
import { TYPES } from '../type';
import { RoleController } from '../controllers/RoleController/role.controller';
import { authenticate } from '../middlewares/authenticate';
import { checkRole } from '../middlewares/сheckrole';

export function getUsersRoutes(appContainer: Container): Router {
	const usersRouter = Router();
	const usersController = appContainer.get<RoleController>(TYPES.RoleController);
	usersRouter.post('/create', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.createRole(req, res);
	});
	usersRouter.get('/get', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.getRoleById(req, res);
	});
	usersRouter.patch('/update', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.updateRole(req, res);
	});
	usersRouter.delete('/delete', authenticate, checkRole('ADMIN'), (req, res) => {
		return usersController.deleteRole(req, res);
	});
	return usersRouter;
}
export function setupUsersRoutes(appContainer: Container): Router {
	const router = Router();
	router.use('/roles', getUsersRoutes(appContainer));
	return router;
}
