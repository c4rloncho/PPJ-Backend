import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse{
    @Field()
    message:string;
    @Field(()=>Boolean)
    success:boolean
}