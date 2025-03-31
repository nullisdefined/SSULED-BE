import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateGroup,
  ApiGetAllGroups,
  ApiGetGroup,
  ApiUpdateGroup,
  ApiDeleteGroup,
  ApiJoinGroup,
  ApiLeaveGroup,
  ApiGetUserGroup,
} from '@/decorators/swagger.decorator';
import { FindAllGroupsDto } from './dto/find-all-groups.dto';
import { JoinGroupDto } from './dto/join-group.dto';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * 사용자가 속한 그룹 조회
   * @param userUuid 사용자 UUID
   * @returns 사용자가 속한 그룹 정보 또는 null
   */
  @Get('user')
  @ApiGetUserGroup()
  getUserGroup(@Query('userUuid') userUuid: string) {
    return this.groupService.findUserCurrentGroup(userUuid);
  }

  /**
   * 그룹 생성
   * @param createGroupDto 그룹 생성 정보
   * @param ownerUuid 방장 UUID
   * @returns 생성된 그룹 정보
   */
  @Post()
  @ApiCreateGroup()
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @Query('ownerUuid') ownerUuid: string,
  ) {
    // TODO: user req
    return this.groupService.createGroup(createGroupDto, ownerUuid);
  }

  /**
   * 모든 공개 그룹 조회
   * @param findAllGroupsDto 그룹 목록 조회 조건들
   * @returns 모든 공개 그룹 정보
   */
  @Get()
  @ApiGetAllGroups()
  findAccessibleGroups(@Query() findAllGroupsDto: FindAllGroupsDto) {
    return this.groupService.findAccessibleGroups(findAllGroupsDto);
  }

  /**
   * 그룹 상세 조회
   * @param id 그룹 ID
   * @returns 그룹 상세 정보
   */
  @Get(':groupId')
  @ApiGetGroup()
  findOneGroup(@Param('groupId') groupId: string) {
    return this.groupService.findOneGroup(+groupId);
  }

  /**
   * 그룹 수정
   * @param groupId 그룹 ID
   * @param updateGroupDto 그룹 수정 정보
   * @param ownerUuid 방장 UUID
   * @returns 수정된 그룹 정보
   */
  @Patch(':groupId')
  @ApiUpdateGroup()
  updateGroup(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
    // TODO: user req
    @Query('ownerUuid') ownerUuid: string,
  ) {
    return this.groupService.updateGroup(+groupId, updateGroupDto, ownerUuid);
  }

  /**
   * 그룹 삭제
   * @param groupId 그룹 ID
   * @param ownerUuid 방장 UUID
   */
  @Delete(':groupId')
  @ApiDeleteGroup()
  removeGroup(
    @Param('groupId') groupId: string,
    @Query('ownerUuid') ownerUuid: string,
  ) {
    // TODO: user req
    return this.groupService.deleteGroup(+groupId, ownerUuid);
  }

  /**
   * 그룹 참여
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @returns 참여된 그룹 정보
   */
  @Post(':groupId/join')
  @ApiJoinGroup()
  joinGroup(
    @Param('groupId') groupId: string,
    @Query('userUuid') userUuid: string,
    @Body() joinGroupDto: JoinGroupDto,
  ) {
    // TODO: user req
    return this.groupService.joinGroup(
      +groupId,
      userUuid,
      joinGroupDto.password,
    );
  }

  /**
   * 그룹 탈퇴
   * @param groupId 그룹 ID
   * @param userUuid 사용자 UUID
   * @returns 탈퇴 메시지
   */
  @Delete(':groupId/leave')
  @ApiLeaveGroup()
  leaveGroup(
    @Param('groupId') groupId: string,
    @Query('userUuid') userUuid: string,
  ) {
    // TODO: user req
    return this.groupService.leaveGroup(+groupId, userUuid);
  }
}
