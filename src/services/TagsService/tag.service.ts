import { Tag } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../type';
import { ITagService } from './tag.service.interface';
import { ITagRepository } from '../../repositories/TagsRepository/tag.repository.interface';
import 'reflect-metadata';

@injectable()
export class TagService implements ITagService {
	constructor(@inject(TYPES.TagRepository) private tagRepository: ITagRepository) {}
	public async createTag(name: string): Promise<Tag> {
		return this.tagRepository.createTag(name);
	}
	public async getAllTags(): Promise<Tag[] | []> {
		return this.tagRepository.getAllTags();
	}
	public async addTagsToUser(userId: number, tagIds: number[]): Promise<void> {
		await this.tagRepository.addTagsToUser(userId, tagIds);
	}
	public async removeTagsFromUser(userId: number, tagIds: number[]): Promise<void> {
		await this.tagRepository.removeTagsFromUser(userId, tagIds);
	}
	public async getTagsByUserId(userId: number): Promise<Tag[] | []> {
		return this.tagRepository.getTagsByUserId(userId);
	}
}
