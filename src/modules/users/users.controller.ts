import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.deorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiLogout } from '@/decorators/swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiLogout()
  async logout(@UserUuid() userUuid: string) {
    return this.usersService.logout(userUuid);
  }

  @Post('nickname')
  @UseGuards(JwtAuthGuard)
  async updateNickname(
    @Body('newNickname') newNickname: string,
    @UserUuid() UserUuid: string,
  ) {
    return this.usersService.updateNickname(UserUuid, newNickname);
  }
}
