import { Field, ObjectType } from "@nestjs/graphql"; 
import { Column, Entity, ObjectIdColumn, ObjectId} from "typeorm";

@Entity()
@ObjectType()
export class Tags{

    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @Field()
    name: string;
}