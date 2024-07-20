import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comments/entities/comment.entity"; 

@ObjectType()
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    @Field(()=> Int)
    id:number;

    @Column()
    @Field()
    username:string;

    @Column()
    @Field()
    password:string;

    @Field(()=>[Comment])
    @OneToMany(()=>Comment , comment =>comment.user)
    comments: Comment[];
}