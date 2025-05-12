import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';
import { Group } from '@/entities/group.entity';
import { Post } from '@/entities/post.entity';
import { DailyGroupActivity } from '@/entities/daily_group_activiry.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(QuarterlyRanking)
    private readonly quarterlyRankingRepository: Repository<QuarterlyRanking>,
    @InjectRepository(QuarterlyStatistics)
    private readonly quarterlyStatisticsRepository: Repository<QuarterlyStatistics>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(DailyGroupActivity)
    private readonly dailyGroupActivity: Repository<DailyGroupActivity>,
  ) {}

  // 개인 통계
  async getGroupRanking(year: number, quarter: number) {
    const rankings = await this.quarterlyRankingRepository.find({
      where: { year, quarter },
      order: { score: 'desc' },
      take: 3,
    });

    const groupIds = rankings.map((r) => r.groupId);

    const groups = await this.groupRepository.find({
      where: { id: In(groupIds) },
      select: ['id', 'title'],
    });

    const groupTitleMap = Object.fromEntries(
      groups.map((g) => [g.id, g.title]),
    );

    return {
      year,
      quarter,
      isFinal: rankings[0]?.isFinal ?? false,
      teams: rankings.map((ranking) => ({
        groupId: ranking.groupId,
        groupTitle: groupTitleMap[ranking.groupId] || '',
        score: ranking.score,
        commits: ranking.commits,
      })),
    };
  }

  async getUserQuarterlyStats(userUuid: string, year: number, quarter: number) {
    // 분기 시작/끝 날짜 계산
    const quarterStartMonth = (quarter - 1) * 3 + 1;
    const startDate = new Date(Date.UTC(year, quarterStartMonth, 1));
    const endDate = new Date(Date.UTC(year, quarterStartMonth + 3, 0)); // 말일

    // 날짜 문자열 배열 생성
    const allDates: string[] = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setUTCDate(d.getUTCDate() + 1)
    ) {
      allDates.push(d.toISOString().slice(0, 10));
    }

    // 작성한 post들 가져오기
    const posts = await this.postRepository.find({
      where: {
        userUuid,
        createdAt: Between(startDate, endDate),
      },
    });

    const postedDates = new Set(
      posts.map((p) => p.createdAt.toISOString().slice(0, 10)),
    );

    const data = allDates.map((date) => ({
      date,
      didWorkout: postedDates.has(date),
    }));

    // 통계 데이터 가져오기
    const stat = await this.quarterlyStatisticsRepository.findOne({
      where: { userUuid, year, quarter },
    });

    const streakInfo = {
      currentStreak: stat?.currentStreak ?? 0,
      longestStreak: stat?.longestStreak ?? 0,
      startDate: allDates[0],
      endDate: allDates[allDates.length - 1],
    };

    const day = {
      dawn: stat?.timeZone?.dawn ?? 0,
      morning: stat?.timeZone?.morning ?? 0,
      afternoon: stat?.timeZone?.afternoon ?? 0,
      night: stat?.timeZone?.night ?? 0,
    };

    const exercise = {
      chest: stat?.bodyPart?.chest ?? 0,
      back: stat?.bodyPart?.back ?? 0,
      legs: stat?.bodyPart?.legs ?? 0,
      core: stat?.bodyPart?.core ?? 0,
      sports: stat?.bodyPart?.sports ?? 0,
      shoulders_arms: stat?.bodyPart?.shoulders_arms ?? 0,
      cardio: stat?.bodyPart?.cardio ?? 0,
      other: stat?.bodyPart?.other ?? 0,
    };

    return { data, streakInfo, day, exercise };
  }

  async getGroupStreaks(groupId: number, year: number, quarter: number) {
    const startMonth = (quarter - 1) * 3;
    const startDate = new Date(Date.UTC(year, startMonth, 1));
    const endDate = new Date(Date.UTC(year, startMonth + 3, 0));

    const dateRange: string[] = [];
    const cursor = new Date(startDate);
    while (cursor <= endDate) {
      dateRange.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    // daily_group_activity에서 groupId와 날짜 조건으로 조회
    const records = await this.dailyGroupActivity.find({
      where: {
        groupId,
        date: Between(
          startDate.toISOString().slice(0, 10),
          endDate.toISOString().slice(0, 10),
        ),
      },
    });

    const valueMap = new Map(records.map((r) => [r.date, r.value]));

    const data = dateRange.map((day) => ({
      day,
      value: valueMap.get(day) || 0,
    }));

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      select: ['maxMember'],
    });

    return {
      data,
      groupInfo: {
        totalMembers: group?.maxMember ?? 0,
        startDate: dateRange[0],
        endDate: dateRange[dateRange.length - 1],
      },
    };
  }
}
