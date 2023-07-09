import { Module } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostsResolver } from '../resolvers/posts.resolver';
import { Posts } from 'src/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostsService, PostsResolver],
  exports: [PostsService]
})
export class PostsModule {}
