import { Entity, Column, Unique, ObjectIdColumn, ObjectId} from 'typeorm';
import { ObjectType, Field} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Users{

    @ObjectIdColumn()
    id: ObjectId;

    @Column({unique: true})
    @Unique(["email"]) // Indica que el campo debe ser único en la columna "email"
    @Field()
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

}