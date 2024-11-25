import { Request, Response } from 'express';
import { IPromotionController } from './promotion.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { IPromotionService } from '../../services/PromotionService/promotion.service.interface';
import 'reflect-metadata';
import { Promotion } from '@prisma/client';

@injectable()
export class PromotionController implements IPromotionController {
	constructor(@inject(TYPES.PromotionService) private promotionService: IPromotionService) {}
	public async createPromotion(req: Request, res: Response): Promise<void> {
		try {
			const { title, description, supplierId, city, createdAt, startDate, endDate } =
				req.body as Promotion;
			if (!title || !description || !supplierId || !city || !startDate || !endDate) {
				res.status(400).json({
					message: 'Invalid promotion data!',
				});
				return;
			}
			const promotion = await this.promotionService.createPromotion({
				title,
				description,
				supplierId,
				city,
				createdAt,
				startDate,
				endDate,
			});
			res.status(201).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async getPromotionsBySupplier(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Promotion id is required' });
				return;
			}
			const promotions = await this.promotionService.getPromotionBySupplier(id);
			if (!promotions) {
				res.status(404).json({ message: 'Promotions not found!' });
				return;
			}
			res.status(200).json(promotions);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async updatePromotionStatus(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Promotion id is required' });
				return;
			}
			const promotion = await this.promotionService.updateStatusPromotion(id, req.body.status);
			if (!promotion) {
				res.status(404).json({ message: 'Promotion not found' });
				return;
			}
			res.status(200).json(promotion);
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
	public async deletePromotion(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'Promotion id is required' });
				return;
			}
			const promotion = await this.promotionService.deletePromotion(id);
			if (!promotion) {
				res.status(404).json('Promotion not found');
				return;
			}
			res.status(200).json({ message: 'Promotion deleted successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ message: error.message });
			}
		}
	}
}
