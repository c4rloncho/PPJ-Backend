import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => Image)
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    @Args('input') createImageInput: CreateImageInput,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.imageService.create(createImageInput, file);
  }

  @Query(() => [Image], { name: 'images' })
  findAll() {
    return this.imageService.findAll();
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imageService.findOne(id);
  }



  @Mutation(() => Boolean)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imageService.remove(id);
  }
}