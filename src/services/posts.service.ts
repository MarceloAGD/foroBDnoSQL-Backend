import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { Repository} from 'typeorm';
import { TagsService } from './tags.service';
import { CommunitiesService } from './communities.service';
import { UsersService } from './users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        private tagsService: TagsService,
        private communitiesService: CommunitiesService,
        private usersService: UsersService,
        
    ){}

    async findAll(): Promise<Posts[]>{
        return this.postsRepository.find();
    }

    async createPost(input: CreatePostInput): Promise<Posts> {
        const post = new Posts();
        post.title = input.title;
        post.description = input.description;
        post.tags = [];
    
        // Obtener el objeto Users basado en el campo author
        const author = await this.usersService.getUserByEmail(input.author);
        if (!author) {
          throw new Error(`El usuario ${input.author} no existe.`);
        }
        post.author = author.email; // Asigna el correo electrónico del autor
        
        
        if (input.community == null){
            post.community = "General";
        }
        else{
            if(await this.communitiesService.getCommunityByName(input.community)){
                post.community = input.community;
            }
            else{
                throw new Error(`La comunidad ${input.community} no existe.`);
            }
        }

        for(const tags of input.tags){
            if(!await this.tagsService.findOne(tags.name)){
                await this.tagsService.createTag({name: tags.name});
            }
            const tag = await this.tagsService.findOne(tags.name);
            post.tags.push(tag);
            
        }
        return this.postsRepository.save(post);
    }

    async findPostsByCommunity(communityName: string): Promise<Posts[]> {
        return this.postsRepository.find({ where: { community: communityName } });
    }

    async deletePost(postId: string): Promise<boolean> {
        const result = await this.postsRepository.delete(postId);
        return result.affected > 0;
    }

    async findPostsByAuthor(authorEmail: string): Promise<Posts[]> {
        return this.postsRepository.find({ where: { author: authorEmail } });
    }
      
      
    
}
