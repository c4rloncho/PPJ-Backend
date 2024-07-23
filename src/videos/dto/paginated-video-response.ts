import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Video } from '../entities/video.entity';

@ObjectType()
export class PaginatedVideosResponse {
  @Field(() => [Video])
  videos: Video[];

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  total: number;
}