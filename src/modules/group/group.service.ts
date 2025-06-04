/* eslint-disable @typescript-eslint/no-unused-vars */
import { Group } from '@/entities/group.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UsersService } from '../users/users.service';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { Post } from '@/entities/post.entity';
import { DailyGroupActivity } from '@/entities/daily-group-activity.entity';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(QuarterlyRanking)
    private quarterlyRankingRepository: Repository<QuarterlyRanking>,
    @InjectRepository(DailyGroupActivity)
    private dailyGroupActivityRepository: Repository<DailyGroupActivity>,
    private usersService: UsersService,
  ) {}

  /**
   * 사용자가 소속된 그룹 찾기
   * @param userUuid 사용자 UUID
   * @returns 사용자가 소속된 그룹 또는 null
   */
  async findUserGroup(userUuid: string): Promise<any> {
    // memberUuid 배열에 사용자 UUID가 포함된 그룹 찾기
    const groups = await this.groupRepository.find({
      where: {},
    });

    const group = groups.find((group) => group.memberUuid.includes(userUuid));

    if (!group) {
      return null;
    }

    // 오늘 날짜 범위 설정
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Post 엔티티에 접근하기 위해 레포지토리 사용
    const postRepository =
      this.quarterlyRankingRepository.manager.getRepository(Post);

    // 현재 사용자 인증 상태 확인
    const userTodayPost = await postRepository.findOne({
      where: {
        userUuid: userUuid,
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const userIsCertificated = !!userTodayPost;

    // 그룹 전체 멤버의 오늘 게시글 조회
    const memberPostsToday = await postRepository.find({
      where: {
        userUuid: In(group.memberUuid),
        createdAt: Between(todayStart, todayEnd),
      },
    });

    // userUuid별 인증 상태 매핑
    const certificationMap = new Map();
    memberPostsToday.forEach((post) => {
      certificationMap.set(post.userUuid, true);
    });

    // 그룹원들의 상세 정보 조회
    const memberDetails = await Promise.all(
      group.memberUuid.map(async (memberUuid) => {
        const userInfo = await this.usersService.getUserInfo(memberUuid);
        return {
          ...userInfo,
          isCertificated: certificationMap.has(memberUuid), // 멤버별 인증 상태
        };
      }),
    );

    // uuid, password 제외한 그룹 정보
    const { ownerUuid, memberUuid, password, ...safeGroupInfo } = group;

    return {
      ...safeGroupInfo,
      members: memberDetails,
      isOwner: userUuid === group.ownerUuid,
      isCertificated: userIsCertificated,
    };
  }

  /**
   * 그룹 생성
   * @param createGroupDto 그룹 생성 정보
   * @param ownerUuid 방장 UUID
   * @returns 생성된 그룹 정보
   */
  async createGroup(
    createGroupDto: CreateGroupDto,
    ownerUuid: string,
  ): Promise<Partial<Group>> {
    // 이미 다른 그룹에 소속되어 있는지 확인
    const existingGroup = await this.findUserGroup(ownerUuid);
    if (existingGroup) {
      throw new BadRequestException(
        '이미 다른 그룹에 소속되어 있습니다. 계정당 하나의 그룹만 가입할 수 있습니다.',
      );
    }

    if (createGroupDto.password) {
      createGroupDto.isAccessible = false;
    } else {
      createGroupDto.isAccessible = true;
    }

    const group = this.groupRepository.create({
      ...createGroupDto,
      ownerUuid,
      memberUuid: [ownerUuid],
    });

    const savedGroup = await this.groupRepository.save(group);

    const {
      ownerUuid: _,
      memberUuid: __,
      password: ___,
      ...safeGroupInfo
    } = savedGroup;

    return safeGroupInfo;
  }

  /**
   * 그룹 수정
   * @param groupId 그룹 ID
   * @param updateGroupDto 그룹 수정 정보
   * @param ownerUuid 방장 UUID
   * @returns 수정된 그룹 정보
   */
  async updateGroup(
    groupId: number,
    updateGroupDto: UpdateGroupDto,
    ownerUuid: string,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    if (group.ownerUuid !== ownerUuid) {
      throw new UnauthorizedException('이 그룹을 수정할 권한이 없습니다.');
    }

    if (updateGroupDto.password !== undefined) {
      if (updateGroupDto.password) {
        updateGroupDto.isAccessible = false;
      } else {
        updateGroupDto.isAccessible = true;
      }
    }

    Object.assign(group, {
      ...updateGroupDto,
      updatedAt: new Date(),
    });

    return this.groupRepository.save(group);
  }

  /**
   * 그룹 삭제
   * @param groupId 그룹 ID
   * @param ownerUuid 방장 UUID
   * @returns 삭제 메시지
   */
  async deleteGroup(
    groupId: number,
    ownerUuid: string,
  ): Promise<{ message: string }> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    if (group.ownerUuid !== ownerUuid) {
      throw new UnauthorizedException('이 그룹을 삭제할 권한이 없습니다.');
    }

    await this.dailyGroupActivityRepository.delete({ groupId });
    await this.quarterlyRankingRepository.delete({ groupId });
    await this.groupRepository.delete(groupId);
    return {
      message: '그룹이 성공적으로 삭제되었습니다.',
    };
  }

  /**
   * 모든 그룹 조회
   * @param options 그룹 목록 조회 조건들
   * @returns 모든 그룹 정보
   */
  async findAllGroups(options: { page: number; limit: number }) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [groups, total] = await this.groupRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    const safeGroups = groups.map((group) => {
      const { ownerUuid, memberUuid, password, ...safeGroupInfo } = group;
      return {
        ...safeGroupInfo,
        memberCount: memberUuid.length,
      };
    });

    return {
      data: safeGroups,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * 공개 그룹 조회
   * @param options 그룹 목록 조회 조건들
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 공개 그룹 정보
   */
  async findAccessibleGroups(
    options: { page: number; limit: number },
    userUuid: string,
  ) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const whereCondition = {
      isAccessible: true,
    };

    const [groups, total] = await this.groupRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    // 각 그룹의 멤버 상세 정보 조회
    const groupsWithDetails = await Promise.all(
      groups.map(async (group) => {
        const memberDetails = await Promise.all(
          group.memberUuid.map(async (memberUuid) => {
            const userInfo = await this.usersService.getUserInfo(memberUuid);
            return {
              ...userInfo,
              isOwner: memberUuid === group.ownerUuid,
            };
          }),
        );

        // uuid, password 제외한 그룹 정보
        const { ownerUuid, memberUuid, password, ...safeGroupInfo } = group;

        return {
          ...safeGroupInfo,
          members: memberDetails,
          isOwner: userUuid === group.ownerUuid,
        };
      }),
    );

    return {
      data: groupsWithDetails,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * 그룹 제목 검색
   * @param options 그룹 목록 조회 조건들
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 그룹 목록 정보
   */
  async searchGroupsByTitle(
    options: {
      page: number;
      limit: number;
      title: string;
    },
    userUuid: string,
  ) {
    const { page, limit, title } = options;
    const skip = (page - 1) * limit;

    const whereCondition: any = {
      title: Like(`%${title}%`),
      isAccessible: true,
    };

    const [groups, total] = await this.groupRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    // 각 그룹의 멤버 상세 정보 조회
    const groupDetails = await Promise.all(
      groups.map(async (group) => {
        const memberDetails = await Promise.all(
          group.memberUuid.map(async (memberUuid) => {
            const userInfo = await this.usersService.getUserInfo(memberUuid);
            return {
              ...userInfo,
              isOwner: memberUuid === group.ownerUuid,
            };
          }),
        );

        const { ownerUuid, memberUuid, password, ...safeGroupInfo } = group;

        return {
          ...safeGroupInfo,
          members: memberDetails,
          isOwner: userUuid === group.ownerUuid,
          currentMembers: group.memberUuid.length,
        };
      }),
    );

    return {
      data: groupDetails,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * 그룹 상세 조회
   * @param groupId 그룹 ID
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 그룹 상세 정보
   */
  async findOneGroup(groupId: number, userUuid: string): Promise<any> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    // 오늘 날짜 범위 설정
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Post 엔티티에 접근하기 위해 레포지토리 사용
    const postRepository =
      this.quarterlyRankingRepository.manager.getRepository(Post);

    // 현재 사용자 인증 상태 확인
    const userTodayPost = await postRepository.findOne({
      where: {
        userUuid: userUuid,
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const userIsCertificated = !!userTodayPost;

    // 그룹 전체 멤버의 오늘 게시글 조회
    const memberPostsToday = await postRepository.find({
      where: {
        userUuid: In(group.memberUuid),
        createdAt: Between(todayStart, todayEnd),
      },
    });

    // userUuid별 인증 상태 매핑
    const certificationMap = new Map();
    memberPostsToday.forEach((post) => {
      certificationMap.set(post.userUuid, true);
    });

    // 그룹원들의 상세 정보 조회
    const memberDetails = await Promise.all(
      group.memberUuid.map(async (memberUuid) => {
        const userInfo = await this.usersService.getUserInfo(memberUuid);
        return {
          ...userInfo,
          isOwner: memberUuid === group.ownerUuid,
          isCertificated: certificationMap.has(memberUuid), // 멤버별 인증 상태
        };
      }),
    );

    // 민감 정보 제외
    const { ownerUuid, memberUuid, password, ...safeGroupInfo } = group;

    return {
      ...safeGroupInfo,
      members: memberDetails,
      isOwner: userUuid === group.ownerUuid,
      isCertificated: userIsCertificated,
    };
  }

  /**
   * 사용자가 속한 그룹 조회
   * @param userUuid 사용자 UUID
   * @returns 사용자가 속한 그룹 정보 또는 null
   */
  async findUserCurrentGroup(userUuid: string): Promise<Group | null> {
    // TypeORM에서 배열 필드 검색이 제대로 작동하지 않을 수 있으므로 메모리에서 필터링
    const groups = await this.groupRepository.find({
      where: {},
    });

    const group = groups.find((group) => group.memberUuid.includes(userUuid));

    if (!group) {
      throw new NotFoundException('사용자가 가입된 그룹이 없습니다.');
    }

    return group;
  }

  /**
   * 그룹 탈퇴
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @returns 탈퇴 결과
   */
  async leaveGroup(
    groupId: number,
    userUuid: string,
  ): Promise<{ message: string }> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    // 방장은 그룹을 탈퇴할 수 없음
    if (group.ownerUuid === userUuid) {
      throw new BadRequestException(
        '그룹 소유자는 탈퇴할 수 없습니다. 그룹을 삭제하거나 소유권을 이전한 후 시도해주세요.',
      );
    }

    // 그룹에 속해있는지 확인
    if (!group.memberUuid.includes(userUuid)) {
      throw new BadRequestException('해당 그룹에 가입되어 있지 않습니다.');
    }

    // 멤버 목록에서 사용자 제거
    group.memberUuid = group.memberUuid.filter((id) => id !== userUuid);
    group.updatedAt = new Date();

    await this.groupRepository.save(group);

    return {
      message: '그룹에서 성공적으로 탈퇴했습니다.',
    };
  }

  /**
   * 그룹 가입
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @param password 비밀번호 (필요한 경우)
   * @returns 가입된 그룹 정보
   */
  async joinGroup(
    groupId: number,
    userUuid: string,
    password?: string,
  ): Promise<Group> {
    // 이미 다른 그룹에 소속되어 있는지 확인
    try {
      const existingGroup = await this.findUserGroup(userUuid);
      if (existingGroup) {
        throw new BadRequestException(
          '이미 다른 그룹에 소속되어 있습니다. 계정당 하나의 그룹만 가입할 수 있습니다.',
        );
      }
    } catch (error) {
      // 사용자가 아직 그룹에 가입되어 있지 않으면 findUserGroup에서 NotFoundException이 발생하므로 이를 무시
      if (!(error instanceof NotFoundException)) {
        throw error; // 다른 종류의 에러는 그대로 전파
      }
      // 그룹에 속해있지 않으면 정상 진행
    }

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    // 이미 해당 그룹에 소속되어 있는지 확인
    if (group.memberUuid.includes(userUuid)) {
      throw new BadRequestException('이미 이 그룹에 소속되어 있습니다.');
    }

    // 그룹이 최대 인원에 도달했는지 확인
    if (group.memberUuid.length >= group.maxMember) {
      throw new BadRequestException('그룹이 최대 인원에 도달했습니다.');
    }

    // 비공개 그룹인 경우 비밀번호 확인
    if (!group.isAccessible) {
      if (!password) {
        throw new BadRequestException(
          '그룹 참여를 위한 비밀번호가 필요합니다.',
        );
      }

      if (group.password !== password) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }
    }

    // 멤버 목록에 사용자 추가
    group.memberUuid.push(userUuid);
    group.updatedAt = new Date();

    return this.groupRepository.save(group);
  }

  async getGroupRanking(groupId: number, year: number, quarter: number) {
    const result = await this.quarterlyRankingRepository.query(
      `
    SELECT *
    FROM (
      SELECT group_id, score,
             RANK() OVER (ORDER BY score DESC) AS rank
      FROM quarterly_ranking
      WHERE year = $1 AND quarter = $2
    ) ranked
    WHERE group_id = $3
    `,
      [year, quarter, groupId],
    );

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 그룹을 찾을 수 없습니다.');
    }

    // 그룹은 존재하지만 랭킹 테이블에 없을 수 있으므로 null 처리
    if (!result.length) {
      return {
        groupId,
        groupName: group.title,
        score: null,
        rank: null,
      };
    }

    return {
      groupId: result[0].group_id,
      groupName: group.title,
      score: result[0].score,
      rank: result[0].rank,
    };
  }
}
