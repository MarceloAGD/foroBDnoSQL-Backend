import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { PostsService } from 'src/services/posts.service';

@Resolver()
export class PostsResolver {
    constructor(private postsService: PostsService){}

    @Query(() => [Posts])
    posts(){
        return this.postsService.findAll();
    }

    @Mutation(()=> Posts)
    createPost(@Args('input') input: CreatePostInput){
        return this.postsService.createPost(input);
    } 
}
