import { Field, ObjectType } from "@nestjs/graphql"; 
import { Column, Entity, ObjectIdColumn, ObjectId} from "typeorm";
import { Users } from "./users.entity";
import { Tags } from "./tags.entity";

@Entity()
@ObjectType()
export class Communities{

    @ObjectIdColumn()
    id: ObjectId;

    @Column({unique: true})
    @Field()
    name: string;

    @Column()
    @Field()
    description: string;
    
    @Column()
    @Field()
    createdby: string;

    @Column()
    @Field(()=> [String], {nullable: true})
    members?: string[];

    @Column()
    @Field(()=> [Tags], {nullable: true})
    tags?: Tags[]

}