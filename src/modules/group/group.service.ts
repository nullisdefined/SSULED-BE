import { Group } from '@/entities/group.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  /**
   * 사용자가 소속된 그룹 찾기
   * @param userUuid 사용자 UUID
   * @returns 사용자가 소속된 그룹 또는 null
   */
  async findUserGroup(userUuid: string): Promise<Group | null> {
    // memberUuid 배열에 사용자 UUID가 포함된 그룹 찾기
    const groups = await this.groupRepository.find({
      where: {},
    });

    // TypeORM에서 배열 필드 검색이 제대로 작동하지 않을 수 있으므로 메모리에서 필터링
    return groups.find((group) => group.memberUuid.includes(userUuid)) || null;
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
  ): Promise<Group> {
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

    return this.groupRepository.save(group);
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

    return {
      data: groups,
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
   * @returns 공개 그룹 정보
   */
  async findAccessibleGroups(options: { page: number; limit: number }) {
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

    return {
      data: groups,
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
   * @returns 그룹 목록 정보
   */
  async searchGroupsByTitle(options: {
    page: number;
    limit: number;
    title: string;
  }) {
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

    // 현재 멤버 수 계산
    const groupsWithMemberCount = groups.map((group) => ({
      ...group,
      currentMembers: group.memberUuid.length,
    }));

    return {
      data: groupsWithMemberCount,
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
   * @returns 그룹 상세 정보
   */
  async findOneGroup(groupId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    return group;
  }

  /**
   * 사용자가 속한 그룹 조회
   * @param userUuid 사용자 UUID
   * @returns 사용자가 속한 그룹 정보 또는 null
   */
  async findUserCurrentGroup(userUuid: string): Promise<Group | null> {
    return this.findUserGroup(userUuid);
  }

  /**
   * 그룹 탈퇴
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @returns 탈퇴 메시지
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
        '방장은 그룹을 탈퇴할 수 없습니다. 그룹을 삭제하세요.',
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
   * 그룹 참여
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @param password 비밀번호 (선택적)
   * @returns 참여된 그룹 정보
   */
  async joinGroup(
    groupId: number,
    userUuid: string,
    password?: string,
  ): Promise<Group> {
    // 이미 다른 그룹에 소속되어 있는지 확인
    const existingGroup = await this.findUserGroup(userUuid);
    if (existingGroup) {
      throw new BadRequestException(
        '이미 다른 그룹에 소속되어 있습니다. 계정당 하나의 그룹만 가입할 수 있습니다.',
      );
    }

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    // 이미 그룹에 속해 있는지 확인 (중복 체크)
    if (group.memberUuid.includes(userUuid)) {
      throw new BadRequestException('이미 그룹에 가입되어 있습니다.');
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
}
