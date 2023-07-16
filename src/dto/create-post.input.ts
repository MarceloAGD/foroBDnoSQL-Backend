import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail} from 'class-validator';
import { TagInput } from './tag.input';


@InputType()
export class CreatePostInput {

    @IsNotEmpty()
    @Field()
    title: string;

    @IsNotEmpty()
    @Field()
    description: string;

    @Field()
    author: string;
    
    @Field(()=> [TagInput])
    tags?: TagInput[];

    
    @Field({nullable: true})
    community?: string;
}