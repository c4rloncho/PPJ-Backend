import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { UploadVideo } from './dto/upload-video.input';
import { VideoResponse } from './dto/video-response';
import { PaginatedVideosResponse } from './dto/paginated-video-response';

@Resolver(of => Video)
export class VideosResolver {
  constructor(private videoService: VideosService) {}

  @Query(returns => PaginatedVideosResponse)
  async sharedVideos(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number
  ) {
    return this.videoService.findPaginated(page, limit);
  }

  @Mutation(returns => VideoResponse)
  async uploadVideo(@Args('input') input: UploadVideo) {
    return this.videoService.uploadVideo(input);
  }
}