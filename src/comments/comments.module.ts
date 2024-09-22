import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
