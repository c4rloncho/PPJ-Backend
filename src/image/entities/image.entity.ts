import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Image {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  cloudinary_public_id: string;

  @Field()
  @Column()
  cloudinary_url: string;

  @Field(() => Int)
  @Column()
  width: number;

  @Field(() => Int)
  @Column()
  height: number;

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column()
  is_active: boolean;
}