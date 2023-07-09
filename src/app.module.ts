import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { TagsModule } from './modules/tags.module';
import { PostsModule } from './modules/posts.module';

@Module({
  imports: [UsersModule, TagsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
