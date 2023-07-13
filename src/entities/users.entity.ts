import { Entity, Column, Unique, ObjectIdColumn, ObjectId} from 'typeorm';
import { ObjectType, Field} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Posts } from './post.entity';


@Entity()
@ObjectType()
export class Users{

    @ObjectIdColumn()
    id: ObjectId;

    @Column({unique: true})
    
    @Unique(["email"]) // Indica que el campo debe ser único en la columna "email"
    @Field()
    @IsEmail() 
    email: string;
    
    @Column({unique: true})
    @Unique(["nickname"]) 
    @Field()
    nickname: string;
    
    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    country: string;

    @Column()
    @Field()
    language: string;

    @Column()
    @Field(()=> [Users], {nullable: true})
    friend: Users[];

    @Column()
    @Field(()=> [Users], {nullable: true})
    friendRequest: Users[];

    @Column()
    @Field(()=> [Posts], {nullable: true})
    posts: Posts[];
}