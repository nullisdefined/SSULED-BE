import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from '../likes/likes.module';
import { Auth } from '@/entities/auth.entity';
import { Post } from '@/entities/post.entity';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth, Post]),
    forwardRef(() => LikesModule),
    forwardRef(() => PostsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
