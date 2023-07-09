import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Tags } from 'src/entities/tags.entity';
import { TagsService } from 'src/services/tags.service';

@Resolver()
export class TagsResolver {

    constructor(private tagsService: TagsService){}

    @Query(() => [Tags])
    tags(){
        return this.tagsService.findAll();
    }

    @Mutation(() => Tags)
    createTag(@Args('name') name: string){
        return this.tagsService.createTag(name)
    }
}
