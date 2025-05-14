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
   * @param id 그룹 ID
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 그룹 상세 정보
   */
  @Get(':id')
  @ApiGetGroup()
  findOne(@Param('id') id: string, @UserUuid() userUuid: string) {
    return this.groupService.findOneGroup(+id, userUuid);
  }

  /**
   * 그룹 수정
   * @param id 그룹 ID
   * @param updateGroupDto 그룹 수정 정보
   * @param userUuid 현재 로그인한 사용자의 UUID
   * @returns 수정된 그룹 정보
   */
  @Patch(':id')
  @ApiUpdateGroup()
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @UserUuid() userUuid: string,
  ) {
    return this.groupService.updateGroup(+id, updateGroupDto, userUuid);
  }

  /**
   * 그룹 삭제
   * @param id 그룹 ID
   * @param req 요청 객체
   */
  @Delete(':id')
  @ApiDeleteGroup()
  remove(@Param('id') id: string, @Request() req) {
    return this.groupService.deleteGroup(+id, req.user.userUuid);
  }

  /**
   * 그룹 참여
   * @param id 그룹 ID
   * @param password 그룹 참여 비밀번호
   * @param req 요청 객체
   * @returns 참여된 그룹 정보
   */
  @Post(':id/join')
  @ApiJoinGroup()
  joinGroup(
    @Param('id') id: string,
    @Body('password') password: string,
    @Request() req,
  ) {
    return this.groupService.joinGroup(+id, req.user.userUuid, password);
  }

  /**
   * 그룹 탈퇴
   * @param id 그룹 ID
   * @returns 탈퇴 메시지
   */
  @Delete(':id/leave')
  @ApiLeaveGroup()
  leaveGroup(@Param('id') id: string, @UserUuid() userUuid: string) {
    return this.groupService.leaveGroup(+id, userUuid);
  }
}
