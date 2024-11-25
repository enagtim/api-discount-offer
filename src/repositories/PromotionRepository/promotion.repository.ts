import { PrismaClient, Promotion, PromotionStatus } from '@prisma/client';
import { IPromotionRepository } from './promotion.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import 'reflect-metadata';

@injectable()
export class PromotionRepository implements IPromotionRepository {
	constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}
	public async create(promotionData: {
		title: string;
		description: string;
		status: PromotionStatus;
		supplierId: number;
		city: string;
		createdAt: Date;
		endDate: Date;
		startDate: Date;
	}): Promise<Promotion> {
		const promotion = await this.prisma.promotion.create({
			data: promotionData,
		});
		return promotion;
	}
	public async getById(promotionId: number): Promise<Promotion | null> {
		const promotionByID = await this.prisma.promotion.findUnique({
			where: { id: promotionId },
		});
		return promotionByID;
	}
	public async getBySupplier(supplierId: number): Promise<Promotion[] | null> {
		const promotions = await this.prisma.promotion.findMany({
			where: { supplierId },
		});
		return promotions;
	}
	public async updateStatus(promotionId: number, status: PromotionStatus): Promise<Promotion> {
		const updatepromotion = await this.prisma.promotion.update({
			where: { id: promotionId },
			data: { status },
		});
		return updatepromotion;
	}
	public async delete(promotionId: number): Promise<Promotion> {
		const deletepromotion = await this.prisma.promotion.delete({
			where: { id: promotionId },
		});
		return deletepromotion;
	}
	public async getPendingPromotions(): Promise<Promotion[]> {
		const pendingPromotions = await this.prisma.promotion.findMany({
			where: { status: 'PENDING' },
		});
		return pendingPromotions;
	}
	public async getApprovedPromotions(): Promise<Promotion[]> {
		const approvedPromotions = await this.prisma.promotion.findMany({
			where: { status: 'APPROVED' },
		});
		return approvedPromotions;
	}
	public async getRejectedPromotions(): Promise<Promotion[]> {
		const rejectedPromotions = await this.prisma.promotion.findMany({
			where: { status: 'REJECTED' },
		});
		return rejectedPromotions;
	}
}
