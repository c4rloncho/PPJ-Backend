import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  publicId: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;
}