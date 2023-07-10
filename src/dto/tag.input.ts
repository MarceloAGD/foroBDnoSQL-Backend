import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail} from 'class-validator';

@InputType()
export class TagInput {

    @IsNotEmpty()
    @Field()
    name: string;
}