import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { TagsModule } from './modules/tags.module';
import { PostsModule } from './modules/posts.module';

@Module({
  imports: [UsersModule, TagsModule, PostsModule],
  providers: [],
})
export class AppModule {}
