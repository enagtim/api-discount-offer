import { inject, injectable } from 'inversify';
import { INotificationService } from './notification.service.interface';
import { TYPES } from '../../type';
import { INotificationRepository } from '../../repositories/NotificationRepository/notification.repository.interface';
import { Notification } from '@prisma/client';

@injectable()
export class NotificationService implements INotificationService {
	constructor(
		@inject(TYPES.NotificationRepository) private notificationrepository: INotificationRepository,
	) {}
	public async createNotificationForPromotion(
		promotionId: number,
		userIds: number[],
	): Promise<void> {
		await this.notificationrepository.createNotification(promotionId, userIds);
	}
	public async getNotificationsByUser(userId: number): Promise<Notification[] | []> {
		return this.notificationrepository.getNotificationsByUser(userId);
	}
	public async deleteNotificationById(id: number): Promise<void> {
		return this.notificationrepository.deleteNotificationById(id);
	}
}
