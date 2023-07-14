import { Module } from '@nestjs/common';
import { CommunitiesService } from '../services/communities.service';
import { CommunitiesResolver } from '../resolvers/communities.resolver';
import { Communities } from 'src/entities/communities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags.module';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Communities]), TagsModule, UsersModule],
  providers: [CommunitiesService, CommunitiesResolver],
  exports: [CommunitiesService]
})
export class CommunitiesModule {}
