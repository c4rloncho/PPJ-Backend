import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { Image } from './entities/image.entity';
import { CloudinaryModule } from './cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    CloudinaryModule,
  ],
  providers: [ImageResolver, ImageService],
})
export class ImageModule {}