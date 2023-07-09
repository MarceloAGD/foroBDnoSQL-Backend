import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ){}

    async findAll(): Promise<Posts[]>{
        return this.postsRepository.find();
    }

    async createPost(input: CreatePostInput): Promise<Posts>{
        const post = this.postsRepository.create(input);
        return this.postsRepository.save(post);
    }
}
