import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiGetUserInfo,
  ApiLogout,
  ApiUpdateIntroduction,
  ApiUpdateNickname,
} from '@/decorators/swagger.decorator';

@ApiTags('user')
@ApiBearerAuth('JWT-auth')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('logout')
  @ApiLogout()
  async logout(@UserUuid() userUuid: string) {
    return this.usersService.logout(userUuid);
  }

  @ApiUpdateNickname()
  @Post('nickname')
  async updateNickname(
    @Body('newNickname') newNickname: string,
    @UserUuid() UserUuid: string,
  ) {
    return this.usersService.updateNickname(UserUuid, newNickname);
  }

  @Post('introduction')
  @ApiUpdateIntroduction()
  async updateIntroduction(
    @Body('newIntroduction') newIntroduction: string,
    @UserUuid() UserUuid: string,
  ) {
    return this.usersService.updateIntroduction(UserUuid, newIntroduction);
  }

  // @Delete('member')
  // @UseGuards(JwtAuthGuard)
  // async deleteAccountn(@UserUuid() UserUuid: string) {
  //   return this.usersService.deleteUser(UserUuid);
  // }

  @Get('userInfo')
  @ApiGetUserInfo()
  async getUserInfo(@UserUuid() UserUuid: string) {
    return this.usersService.getUserInfo(UserUuid);
  }
}
