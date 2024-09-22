import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { User } from 'src/auth/entities/user.entity';
import { UploadVideo } from './dto/upload-video.input';
import { VideoResponse } from './dto/video-response';
import { PaginatedVideosResponse } from './dto/paginated-video-response';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async uploadVideo(input: UploadVideo): Promise<VideoResponse> {
    return await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, {
        where: { id: input.id_user },
        relations: ['videos'],
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const video = new Video();
      video.content = input.content;
      video.url = input.url;
      video.user = user;

      const savedVideo = await manager.save(video);

      user.videos.push(savedVideo);
      await manager.save(user);

      return {
        message: 'Video guardado',
        success: true,
      };
    });
  }

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<PaginatedVideosResponse> {
    const skip = (page - 1) * limit;

    const [videos, total] = await this.videoRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      videos,
      totalPages,
      currentPage: page,
      total,
    };
  }
}
