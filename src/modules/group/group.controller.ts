import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.decorator';

@ApiTags('group')
@ApiBearerAuth('JWT-auth')
@Controller('group')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * 사용자가 속한 그룹 조회
   * @param userUuid 인증된 사용자 UUID
   * @returns 사용자가 속한 그룹 정보 또는 null
   */
  @Get('user')
  @ApiGetUserGroup()
  getUserGroup(@UserUuid() userUuid: string) {
    return this.groupService.findUserCurrentGroup(userUuid);
  }

  /**
   * 그룹 생성
   * @param createGroupDto 그룹 생성 정보
   * @param req 요청 객체
   * @returns 생성된 그룹 정보
   */
  @Post()
  @ApiCreateGroup()
  create(@Body() createGroupDto: CreateGroupDto, @UserUuid() userUuid: string) {
    return this.groupService.createGroup(createGroupDto, userUuid);
  }

  /**
   * 모든 공개 그룹 조회
   * @param page 페이지 번호
   * @param limit 페이지당 그룹 수
   * @returns 모든 공개 그룹 정보
   */
  @Get()
  @ApiGetAllGroups()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.groupService.findAllGroups({ page, limit });
  }

  /**
   * 그룹 상세 조회
   * @param groupId 그룹 ID
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 그룹 상세 정보
   */
  @Get(':groupId')
  @ApiGetGroup()
  findOne(@Param('groupId') groupId: string, @UserUuid() userUuid: string) {
    return this.groupService.findOneGroup(+groupId, userUuid);
  }

  /**
   * 그룹 수정
   * @param groupId 그룹 ID
   * @param updateGroupDto 그룹 수정 정보
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 수정된 그룹 정보
   */
  @Patch(':groupId')
  @ApiUpdateGroup()
  update(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @UserUuid() userUuid: string,
  ) {
    return this.groupService.updateGroup(+groupId, updateGroupDto, userUuid);
  }

  /**
   * 그룹 삭제
   * @param groupId 그룹 ID
   * @param req 요청 객체
   */
  @Delete(':groupId')
  @ApiDeleteGroup()
  remove(@Param('groupId') groupId: string, @Request() req) {
    return this.groupService.deleteGroup(+groupId, req.user.userUuid);
  }

  /**
   * 그룹 참여
   * @param groupId 그룹 ID
   * @param password 그룹 참여 비밀번호
   * @param req 요청 객체
   * @returns 참여된 그룹 정보
   */
  @Post(':groupId/join')
  @ApiJoinGroup()
  joinGroup(
    @Param('groupId') groupId: string,
    @Body('password') password: string,
    @Request() req,
  ) {
    return this.groupService.joinGroup(+groupId, req.user.userUuid, password);
  }

  /**
   * 그룹 탈퇴
   * @param groupId 그룹 ID
   * @returns 탈퇴 메시지
   */
  @Delete(':groupId/leave')
  @ApiLeaveGroup()
  leaveGroup(@Param('groupId') groupId: string, @UserUuid() userUuid: string) {
    return this.groupService.leaveGroup(+groupId, userUuid);
  }
}
