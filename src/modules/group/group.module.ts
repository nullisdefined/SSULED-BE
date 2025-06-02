import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from '@/entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { forwardRef } from '@nestjs/common';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { DailyGroupActivity } from '@/entities/daily_group_activity.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Group, QuarterlyRanking, DailyGroupActivity]),
    forwardRef(() => UsersModule),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
