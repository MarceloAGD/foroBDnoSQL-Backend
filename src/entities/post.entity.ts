import { Field, ObjectType } from "@nestjs/graphql"; 
import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

Entity()
ObjectType()
export class Post{
    @ObjectIdColumn()
    @Field()
    id: ObjectId;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column({type: 'timestamptz'})
    @Field()
    time: Date;

    @Column()
    @Field()
    likes: []

}