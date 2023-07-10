import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { TagsService } from './tags.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        private tagsService: TagsService,
    ){}

    async findAll(): Promise<Posts[]>{
        return this.postsRepository.find();
    }

    async createPost(input: CreatePostInput): Promise<Posts>{
        const post = new Posts();
        post.title= input.title;
        post.description = input.description;
        post.tags = []
        for(const tags of input.tags){
            if(!await this.tagsService.findOne(tags.name)){
                await this.tagsService.createTag({name: tags.name});
            }
            const tag = await this.tagsService.findOne(tags.name);
            post.tags.push(tag);
            
        }
        return this.postsRepository.save(post);
    }
}
