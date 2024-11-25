import { Promotion, PromotionStatus } from '@prisma/client';

export interface IPromotionService {
	createPromotion: (promotiondata: {
		title: string;
		description: string;
		supplierId: number;
		city: string;
		startDate: Date;
		endDate: Date;
		createdAt: Date;
	}) => Promise<Promotion>;
	getPromotionBySupplier: (supplierId: number) => Promise<Promotion[] | null>;
	updateStatusPromotion: (
		promotionId: number,
		status: PromotionStatus,
	) => Promise<Promotion | null>;
	deletePromotion: (promotionId: number) => Promise<Promotion | null>;
}
