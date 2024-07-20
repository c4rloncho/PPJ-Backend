import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "../entities/comment.entity";

@ObjectType()
export class CommentsPaginated {
    @Field(() => [Comment])
    comments: Comment[];

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    total: number;
}