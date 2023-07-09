import { Module } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { TagsResolver } from '../resolvers/tags.resolver';
import { Tags } from 'src/entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsService, TagsResolver],
  exports: [TagsService]
})
export class TagsModule {}
