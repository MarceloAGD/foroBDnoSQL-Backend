import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail} from 'class-validator';

@InputType()
export class CreateUserInput {
    @IsEmail()
    @IsNotEmpty()
    @Field()
    email: string;

    @IsNotEmpty()
    @Field()
    nickname: string;

    @IsNotEmpty()
    @Field()
    password: string;

    @IsNotEmpty()
    @Field()
    country: string;

    @IsNotEmpty()
    @Field()
    language: string;

}