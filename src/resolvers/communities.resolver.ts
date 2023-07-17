import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Communities } from '../entities/communities.entity';
import { CommunitiesService } from '../services/communities.service';
import { UsersService } from '../services/users.service';


@Resolver()
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
    return this.communitiesService.getCommunitiesByUser(email);
  }
  

  @Mutation(() => Communities)
  async addMemberToCommunity(
    @Args('name') name: string,
    @Args('memberEmail') memberEmail: string,
  ): Promise<Communities> {
    const community = await this.communitiesService.getCommunityByName(name);
    const member = await this.usersService.getUserByEmail(memberEmail);
  
    if (!community) {
      throw new Error('La comunidad no existe.');
    }
  
    if (!member) {
      throw new Error('El correo electrónico del miembro no existe en la entidad Users.');
    }
  
    community.members = [memberEmail]; // Convertir la cadena de caracteres en un arreglo de un solo elemento
    return this.communitiesService.updateCommunity(community);
  }
  
  
  
  

  
  
}