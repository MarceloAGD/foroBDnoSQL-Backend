import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from 'src/dto/create-post.input';
import { Posts } from 'src/entities/post.entity';
import { PostsService } from 'src/services/posts.service';
import { ILike } from 'typeorm';

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

  @Query(() => [Posts])
  postsByTitle(@Args('title') postTitle: string) {
    return this.postsService.findPostsByTitle(postTitle);
  }
  
  @Query(() => [Posts])
  searchPostsByTitle(@Args('keyword') keyword: string): Promise<Posts[]> {
    return this.postsService.searchPostsByTitle(keyword);
  }

  @Mutation(() => Posts)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.createPost(input);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('idPrimary') idPrimary: string): Promise<boolean> {
    return this.postsService.deletePost(idPrimary);
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

  @Mutation(() => Posts)
  async addDislikeToPost(
    @Args('postId') postId: string,
    @Args('userEmail') userEmail: string,
  ) {
    return this.postsService.addDislikeToPost(postId, userEmail);
  }
}
