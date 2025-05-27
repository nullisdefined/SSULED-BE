import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@/entities/group.entity';
import { Post } from '@/entities/post.entity';
import { DailyGroupActivity } from '@/entities/daily_group_activity.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuarterlyRanking,
      QuarterlyStatistics,
      Group,
      Post,
      DailyGroupActivity,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
