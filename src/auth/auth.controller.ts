import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import {
  ApiKakaoLogin,
  ApiNaverLogin,
  ApiRefreshToken,
} from '@/decorators/swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

export interface SocialRequest {
  user: {
    socialId: string;
    nickname: string;
    profileImage: string;
    socialProvider: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiKakaoLogin()
  @Post('kakao')
  async kakaoAuthCallback(@Body('code') code: string, @Res() res: Response) {
    return this.authService.kakaoLogin(code, res);
  }

  @ApiNaverLogin()
  @Post('naver')
  async naverAuthCallback(@Body('code') code: string, @Res() res: Response) {
    return this.authService.naverLogin(code, res);
  }

  // refreshToken으로 accessToken 재발급
  @ApiRefreshToken()
  @Post('refresh')
  async Refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.RefreshToken(req, res);
  }
}
