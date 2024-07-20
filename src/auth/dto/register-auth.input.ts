import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  username: string;
  @Field()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password:string;
}
