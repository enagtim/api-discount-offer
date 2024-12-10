import { inject, injectable } from 'inversify';
import { ITagController } from './tag.controller.interface';
import { TYPES } from '../../type';
import { ITagService } from '../../services/TagsService/tag.service.interface';
import 'reflect-metadata';
import { Request, Response } from 'express';
import { Tag } from '@prisma/client';

@injectable()
export class TagController implements ITagController {
	constructor(@inject(TYPES.TagService) private tagservice: ITagService) {}
	public async createTag(req: Request, res: Response): Promise<void> {
		try {
			const { name }: { name: string } = req.body;
			if (!name) {
				res.status(400).json({ message: 'Tag name is required' });
				return;
			}
			const tag = await this.tagservice.createTag(name);
			res.status(201).json(tag);
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async getAllTags(req: Request, res: Response): Promise<void> {
		try {
			const tags = await this.tagservice.getAllTags();
			res.status(200).json(tags);
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async getTagsByUserId(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(404).json({ message: 'User ID is required' });
				return;
			}
			const tags = await this.tagservice.getTagsByUserId(id);
			res.status(200).json(tags);
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async addTagsToUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const { tagIds }: { tagIds: number[] } = req.body;
			if (!tagIds) {
				res.status(400).json({ message: 'Tags array is required' });
				return;
			}
			await this.tagservice.addTagsToUser(id, tagIds);
			res.status(200).json({ message: 'Tags added successfully' });
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
	public async removeTagsFromUser(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.query.id);
			if (!id) {
				res.status(400).json({ message: 'User ID is required' });
				return;
			}
			const { tagIds }: { tagIds: number[] } = req.body;
			if (!tagIds) {
				res.status(400).json({ message: 'Tags array is required' });
				return;
			}
			await this.tagservice.removeTagsFromUser(id, tagIds);
			res.status(200).json({ message: 'Tags removed successfully' });
		} catch (error) {
			res
				.status(500)
				.json({ message: error instanceof Error ? error.message : 'Unexpected error occurred.' });
		}
	}
}
