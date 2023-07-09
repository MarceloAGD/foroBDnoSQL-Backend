import { Field, ObjectType } from "@nestjs/graphql"; 
import { Column, Entity, ObjectIdColumn, ObjectId, CreateDateColumn} from "typeorm";
import { Users } from "./users.entity";
import { Tags } from "./tags.entity";

@Entity()
@ObjectType()
export class Posts{
    
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column({type: 'timestamptz'})
    @CreateDateColumn()
    @Field()
    time: Date;

    @Column()
    @Field(()=> [Users])
    likes: Users[];

    @Column()
    @Field(()=> [Tags])
    tags: Tags[]
}