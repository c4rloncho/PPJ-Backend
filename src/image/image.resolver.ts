import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { CreateImageInput } from './dto/create-image.input';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private imageService: ImageService) {}

  @Query(() => [Image])
  async images(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Query(() => Image)
  async image(@Args('id') id: number): Promise<Image> {
    return this.imageService.findOne(id);
  }

  @Mutation(() => Image)
  async createImage(@Args('input') input: CreateImageInput): Promise<Image> {
    return this.imageService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteImage(@Args('id') id: number): Promise<boolean> {
    return this.imageService.remove(id);
  }
}