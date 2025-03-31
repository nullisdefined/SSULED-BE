import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.deorator';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiLogout } from '@/decorators/swagger.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiLogout()
  async logout(@UserUuid() userUuid: string) {
    return this.usersService.logout(userUuid);
  }
}
