import { Module } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostsResolver } from '../resolvers/posts.resolver';

@Module({
  providers: [PostsService, PostsResolver]
})
export class PostsModule {}
