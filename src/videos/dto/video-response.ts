import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class VideoResponse {
    @Field(()=>Boolean)
    success:boolean;
    
    @Field()
    message:string;
}