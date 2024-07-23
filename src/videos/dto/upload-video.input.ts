import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UploadVideo {
    @Field(()=>Int)
    id_user:number;

    @Field()
    content:string;

    
    @Field()
    url:string;
    
}