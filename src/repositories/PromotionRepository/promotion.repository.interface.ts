import { Promotion, PromotionStatus } from '@prisma/client';

export interface IPromotionRepository {
	create: (promotionData: {
		title: string;
		description: string;
		status: PromotionStatus;
		supplierId: number;
		city: string;
		createdAt: Date;
		endDate: Date;
		startDate: Date;
	}) => Promise<Promotion>;
	getById: (promotionId: number) => Promise<Promotion | null>;
	getBySupplier: (supplierId: number) => Promise<Promotion[] | null>;
	updateStatus: (promotionId: number, status: PromotionStatus) => Promise<Promotion>;
	delete: (promotionId: number) => Promise<Promotion>;
	getPendingPromotions: () => Promise<Promotion[]>;
	getApprovedPromotions: () => Promise<Promotion[]>;
	getRejectedPromotions: () => Promise<Promotion[]>;
}
