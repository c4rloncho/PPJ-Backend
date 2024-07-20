import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { NotFoundError } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository:Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private dataSource: DataSource,
  ){}
  async create(input: CreateCommentInput): Promise<Comment> {
    return await this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, {
        where: { id: input.id },
        relations: ['comments'],
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const comment = new Comment();
      comment.content = input.content;
      comment.user = user;
      comment.createdAt = new Date();

      const savedComment = await manager.save(comment);
  
      // Relación inversa con usuario
      user.comments.push(savedComment);
      await manager.save(user); 
      return savedComment;
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['user'],
    });
  }
  async findPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [comments, total] = await this.commentRepository.findAndCount({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      comments,
      totalPages,
      currentPage: page,
      total,
    };
  }
  async findByUser(id: number):Promise<Comment[]> {
    const user = await this.userRepository.findOne({where:{id:id},relations:['comments']});
    if(!user){
      throw new NotFoundException('usuario no encontrado');
    };
    const comments = user.comments;
    return comments;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
