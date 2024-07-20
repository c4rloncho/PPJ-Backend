import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  title: string;

}