import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CommentsPaginated } from './dto/comments-paginated.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(@Args('input') createCommentInput: CreateCommentInput) {
    return this.commentsService.create(createCommentInput);
  }
  @Query(() => [Comment])
  async findByUser(@Args('id',{type:() => Int})id:number ) {
    return this.commentsService.findByUser(id);
  }
  @Query(() => [Comment], { name: 'findAll' })
  async findAll() {
    try{
      return this.commentsService.findAll();
    }
    catch (error){
      throw new Error(error.message)
    }
  }
  @Query(() => CommentsPaginated)
  async getPaginatedComments(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 7 }) limit: number,
  ): Promise<CommentsPaginated> {
    return this.commentsService.findPaginated(page, limit);
  }
}
