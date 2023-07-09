import { Entity, Column, Unique, ObjectIdColumn} from 'typeorm';
import { ObjectType, Field} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Users{

    @ObjectIdColumn()
    id: string;

    @Column()
    @Unique(["email"]) // Indica que el campo debe ser único en la columna "email"
    @Field()
    email: string;
    
    @Column()
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

}