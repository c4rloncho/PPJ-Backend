import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments)
  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

}