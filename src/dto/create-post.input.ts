import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail} from 'class-validator';

@InputType()
export class CreatePostInput {

    @IsNotEmpty()
    @Field()
    title: string;

    @IsNotEmpty()
    @Field()
    description: string;
    
}