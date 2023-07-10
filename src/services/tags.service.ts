import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagInput } from 'src/dto/tag.input';
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
    async findOne(name: string){
        return this.tagsRepository.findOne({where: {name: name}})
    }
    async createTag(input: TagInput): Promise<Tags>{
        const tag = this.tagsRepository.create(input)
        return this.tagsRepository.save(tag)
    }
}
