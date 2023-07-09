import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tags)
        private tagsRepository: Repository<Tags>,
    ){}

    async findAll(): Promise<Tags[]>{
        return this.tagsRepository.find();
    }
    async createTag(name: string): Promise<Tags>{
        const tag = this.tagsRepository.create({name:name})
        return this.tagsRepository.save(tag)
    }
}
