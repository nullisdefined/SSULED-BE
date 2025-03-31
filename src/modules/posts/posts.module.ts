import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/entities/post.entity';
import { LikesModule } from '@/modules/likes/likes.module';
import { CommentsModule } from '../comments/comments.module';
import { GroupModule } from '../group/group.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => LikesModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => GroupModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
