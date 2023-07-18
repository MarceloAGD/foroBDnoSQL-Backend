import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Communities } from '../entities/communities.entity';
import { UsersService } from './users.service';
import { TagsService } from './tags.service';
import { Users } from '../entities/users.entity';


@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Communities)
    private readonly communitiesRepository: Repository<Communities>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
  ) {}

  async getAllCommunities(): Promise<Communities[]> {
    return this.communitiesRepository.find();
  }

  async getCommunityByName(name: string): Promise<Communities> {
    return this.communitiesRepository.findOne({ where: { name } });
  }

  async createCommunity(
    name: string,
    description: string,
    createdby: string,
    tagNames: string[],
  ): Promise<Communities> {
    const user = await this.usersService.findOne(createdby);
    if (!user) {
      throw new Error(
        'El correo electrónico del creador no existe en la entidad Users.',
      );
    }

    const tags = await Promise.all(
      tagNames.map(async (tagName) => {
        let tag = await this.tagsService.findOne(tagName);
        if (!tag) {
          tag = await this.tagsService.createTag({ name: tagName });
        }
        return tag;
      }),
    );

    const community = new Communities();
    community.name = name;
    community.description = description;
    community.createdby = createdby;
    community.members = [createdby];
    community.tags = tags;

    return this.communitiesRepository.save(community);
  }

  async getCommunitiesByUser(user: string): Promise<Communities[]> {
    return this.communitiesRepository.find({ where: { members: user } });
  }
  
  async updateCommunity(community: Communities): Promise<Communities> {
    return this.communitiesRepository.save(community);
}
}
