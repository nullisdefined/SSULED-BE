import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('JWT-auth')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('logout')
  async logout(@UserUuid() userUuid: string) {
    return this.usersService.logout(userUuid);
  }

  @Post('nickname')
  async updateNickname(
    @Body('newNickname') newNickname: string,
    @UserUuid() UserUuid: string,
  ) {
    return this.usersService.updateNickname(UserUuid, newNickname);
  }

  @Post('introduction')
  @UseGuards(JwtAuthGuard)
  async updateIntroduction(
    @Body('newIntroduction') newIntroduction: string,
    @UserUuid() UserUuid: string,
  ) {
    return this.usersService.updateIntroduction(UserUuid, newIntroduction);
  }
}
