import { Field, ObjectType } from "@nestjs/graphql"; 
import { Column, Entity, ObjectIdColumn, ObjectId, CreateDateColumn} from "typeorm";
import { Users } from "./users.entity";
import { Tags } from "./tags.entity";

@Entity()
@ObjectType()
export class Posts{
    
    @ObjectIdColumn()
    @Field(() => String) // Agregar el decorador @Field para exponer el campo en GraphQL
    id: ObjectId;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    author: string;
    
    @Column({type: 'timestamptz'})
    @CreateDateColumn()
    @Field()
    time: Date;

    @Column()
    @Field(()=> [Users], {nullable: true})
    likes?: Users[];

    @Column()
    @Field(()=> [Tags], {nullable: true})
    tags?: Tags[]

    @Column()
    @Field({nullable: true})
    community?: string;
}