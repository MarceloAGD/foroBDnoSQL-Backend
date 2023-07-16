import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { PostsService } from 'src/services/posts.service';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Posts])
  posts() {
    return this.postsService.findAll();
  }

  @Query(() => [Posts])
  postsByCommunity(@Args('communityName') communityName: string) {
    return this.postsService.findPostsByCommunity(communityName);
  }

  @Mutation(() => Posts)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.createPost(input);
  }
  @Mutation(() => Boolean)
  async deletePost(@Args('postId') postId: string): Promise<boolean> {
    const result = await this.postsService.deletePost(postId);
    return result;
  }

  @Query(() => [Posts])
  postsByAuthor(@Args('authorEmail') authorEmail: string) {
    return this.postsService.findPostsByAuthor(authorEmail);
  }
  @Mutation(() => Posts)
  async addLikeToPost(
    @Args('postId') postId: string,
    @Args('userEmail') userEmail: string,
  ) {
    return this.postsService.addLikeToPost(postId, userEmail);
  }
}
