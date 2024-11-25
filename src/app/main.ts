import { PrismaClient } from '@prisma/client';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../type';
import { IRoleRepository } from '../repositories/RoleRepository/role.repository.interface';
import { RoleRepository } from '../repositories/RoleRepository/role.repository';
import { IPromotionRepository } from '../repositories/PromotionRepository/promotion.repository.interface';
import { PromotionRepository } from '../repositories/PromotionRepository/promotion.repository';
import { App } from './app';
import { IRoleService } from '../services/RoleService/role.service.interface';
import { RoleService } from '../services/RoleService/role.service';
import { IPromotionService } from '../services/PromotionService/promotion.service.interface';
import { PromotionService } from '../services/PromotionService/promotion.service';
import { IRoleController } from '../controllers/RoleController/role.controller.interface';
import { RoleController } from '../controllers/RoleController/role.controller';
import { IPromotionController } from '../controllers/PromotionController/promotion.controller.interface';
import { PromotionController } from '../controllers/PromotionController/promotion.controller';
import { IAuthService } from '../services/AuthService/auth.service.interface';
import { AuthService } from '../services/AuthService/auth.service';
import { IAuthController } from '../controllers/AuthController/auth.controller.interface';
import { AuthController } from '../controllers/AuthController/auth.controller';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());
	bind<IRoleRepository>(TYPES.RoleRepository).to(RoleRepository);
	bind<IRoleService>(TYPES.RoleService).to(RoleService);
	bind<IRoleController>(TYPES.RoleController).to(RoleController);
	bind<IPromotionRepository>(TYPES.PromotionRepository).to(PromotionRepository);
	bind<IPromotionService>(TYPES.PromotionService).to(PromotionService);
	bind<IPromotionController>(TYPES.PromotionController).to(PromotionController);
	bind<IAuthService>(TYPES.AuthService).to(AuthService);
	bind<IAuthController>(TYPES.AuthController).to(AuthController);
	bind<App>(TYPES.Application).to(App);
});
function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init(appContainer);
	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
