import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id:number;

    @Column()
    @Field()
    content:string;

    @Column()
    @Field()
    url:string;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>User , user => user.videos)
    @Field(()=>User)
    user:User
}