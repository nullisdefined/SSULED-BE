import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiGroupStreaks,
  ApiGetQuarterlyGroupRanking,
  ApiGetQuarterlyUserStatistics,
} from '@/decorators/swagger.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.decorator';

@ApiTags('statistics')
@ApiBearerAuth('JWT-auth')
@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/user/stats')
  @ApiGetQuarterlyUserStatistics()
  getUserStatistics(
    @Query('year') year: number,
    @Query('quarter') quarter: number,
    @UserUuid() userUuid: string,
  ) {
    return this.statisticsService.getUserQuarterlyStats(
      userUuid,
      year,
      quarter,
    );
  }

  @Get('/group/streaks')
  @ApiGroupStreaks()
  getGroupStreaks(
    @Query('groupId') groupId: number,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.statisticsService.getGroupStreaks(groupId, year, month);
  }

  @Get('/group/ranking')
  @ApiGetQuarterlyGroupRanking()
  getGroupRanking(
    @Query('year') year: number,
    @Query('quarter') quarter: number,
  ) {
    return this.statisticsService.getGroupRanking(year, quarter);
  }
}
