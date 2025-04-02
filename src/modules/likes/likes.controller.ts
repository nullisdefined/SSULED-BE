import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import {
  ApiCreateLike,
  ApiDeleteLike,
  ApiCheckLikeStatus,
} from '@/decorators/swagger.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserUuid } from '@/decorators/user-uuid.decorator';

@ApiTags('like')
@ApiBearerAuth('JWT-auth')
@Controller('like')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  /**
   * 좋아요 추가
   * @param createLikeDto 좋아요 생성 정보
   * @returns 생성된 좋아요 정보와 좋아요 수
   */
  @Post()
  @ApiCreateLike()
  createLike(
    @Body() createLikeDto: CreateLikeDto,
    @UserUuid() userUuid: string,
  ) {
    return this.likesService.createLike(createLikeDto, userUuid);
  }

  /**
   * 사용자가 게시글에 좋아요했는지 확인
   * @param postId 게시글 ID
   * @param userUuid 사용자 UUID
   * @returns 좋아요 여부와 좋아요 ID
   */
  @Get('check/:postId/:userUuid')
  @ApiCheckLikeStatus()
  checkLikeStatus(
    @Param('postId') postId: string,
    @UserUuid() userUuid: string,
  ) {
    return this.likesService.checkLikeStatus(userUuid, +postId);
  }

  /**
   * 게시글 좋아요 삭제
   * @param postId 게시글 ID
   * @param userUuid 사용자 UUID
   * @returns 삭제 성공 메시지와 업데이트된 좋아요 수
   */
  @Delete('post/:postId/user/:userUuid')
  @ApiDeleteLike()
  removeLike(@Param('postId') postId: string, @UserUuid() userUuid: string) {
    return this.likesService.removeLike(+postId, userUuid);
  }
}
