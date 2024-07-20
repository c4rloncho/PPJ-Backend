import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}


  async create(input: CreateImageInput, file: Express.Multer.File): Promise<Image> {
    const result = await this.cloudinaryService.uploadImage(file);
    
    const image = new Image();
    image.title = input.title;
    image.cloudinary_public_id = result.public_id;
    image.cloudinary_url = result.secure_url;
    image.width = result.width;
    image.height = result.height;
    image.created_at = new Date();
    image.is_active = true;

    return this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find({ where: { is_active: true } });
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id, is_active: true } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async update(id: number, updateImageInput: UpdateImageInput): Promise<Image> {
    const image = await this.findOne(id);
    Object.assign(image, updateImageInput);
    return this.imageRepository.save(image);
  }

  async remove(id: number): Promise<boolean> {
    const image = await this.findOne(id);
    image.is_active = false;
    await this.imageRepository.save(image);
    return true;
  }
}