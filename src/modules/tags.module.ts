import { Module } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { TagsResolver } from '../resolvers/tags.resolver';

@Module({
  providers: [TagsService, TagsResolver]
})
export class TagsModule {}
