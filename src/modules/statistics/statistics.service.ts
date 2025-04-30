import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';
import { Group } from '@/entities/group.entity';
import { Post } from '@/entities/post.entity';

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
  ) {}

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
    return this.quarterlyStatisticsRepository.findOne({
      where: { userUuid, year, quarter },
    });
  }

  async getGroupStreaks(groupId: number, year: number, month: number) {
    const quarter = Math.ceil(month / 3);
    const startMonth = (quarter - 1) * 3 + 1;
    const startDate = new Date(
      `${year}-${String(startMonth).padStart(2, '0')}-01`,
    );
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 3);
    endDate.setDate(endDate.getDate() - 1);

    // 날짜별 참여 인원 수 조회
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .select("TO_CHAR(post.created_at, 'YYYY-MM-DD')", 'day')
      .addSelect('COUNT(DISTINCT post.user_uuid)', 'value')
      .where('post.created_at BETWEEN :start AND :end', {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      })
      .andWhere('post.user_uuid = ANY(:members)', {
        members:
          (await this.groupRepository.findOne({ where: { id: groupId } }))
            ?.memberUuid || [],
      })
      .groupBy('day')
      .getRawMany();

    // 전체 날짜 생성
    const allDates: string[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      allDates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }

    // 데이터 매핑
    const postMap = new Map(posts.map((p) => [p.day, Number(p.value)]));

    const data = allDates.map((day) => ({
      day,
      value: postMap.get(day) || 0,
    }));

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      select: ['maxMember'],
    });

    return {
      data,
      groupInfo: {
        maxMember: group?.maxMember ?? 0,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      },
    };
  }
}
