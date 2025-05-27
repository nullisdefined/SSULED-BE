import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/entities/post.entity';
import { LikesModule } from '@/modules/likes/likes.module';
import { CommentsModule } from '../comments/comments.module';
import { GroupModule } from '../group/group.module';
import { User } from '@/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { WorkoutLog } from '@/entities/workout-log.entity';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { DailyGroupActivity } from '@/entities/daily_group_activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      User,
      WorkoutLog,
      QuarterlyStatistics,
      QuarterlyRanking,
      DailyGroupActivity,
    ]),
    forwardRef(() => LikesModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => GroupModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
