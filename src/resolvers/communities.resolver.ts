import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Communities } from '../entities/communities.entity';
import { CommunitiesService } from '../services/communities.service';
import { UsersService } from '../services/users.service';


@Resolver(() => Communities)
export class CommunitiesResolver {
    constructor(
        private readonly communitiesService: CommunitiesService,
        private readonly usersService: UsersService, // Agrega esta línea
      ) {}
      

  @Query(() => [Communities])
  async communities(): Promise<Communities[]> {
    return this.communitiesService.getAllCommunities();
  }

  @Query(() => Communities)
  async community(@Args('name') name: string): Promise<Communities> {
    return this.communitiesService.getCommunityByName(name);
  }



  @Mutation(() => Communities)
  async createCommunity(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('createdby') createdby: string,
    @Args('members', { defaultValue: [], type: () => [String] }) memberEmails: string[],
    @Args('tags', { type: () => [String] }) tagNames: string[],
  ): Promise<Communities> {
    return this.communitiesService.createCommunity(
      name,
      description,
      createdby,
      tagNames,
    );
  }

  @Query(() => [Communities])
  async communitiesByUserEmail(@Args('email') email: string): Promise<Communities[]> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new Error('El correo electrónico del usuario no existe en la entidad Users.');
    }
    return this.communitiesService.getCommunitiesByUser(user);
  }
  
}