import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateComment,
  ApiGetAllComments,
  ApiGetComment,
  ApiUpdateComment,
} from '@/decorators/swagger.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { FindAllCommentsDto } from './dto/find-all-comments.dto';
import { ApiDeleteComment } from '@/decorators/swagger.decorator';

@ApiTags('comment')
@Controller('comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * 댓글 생성
   * @param createCommentDto 댓글 생성 정보
   * @returns 생성된 댓글 정보
   */
  @Post()
  @ApiCreateComment()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    // TODO: JWT에서 userUuid 추출
    return this.commentsService.createComment(createCommentDto);
  }

  /**
   * 게시글의 모든 댓글 조회
   * @param postId 게시글 ID
   * @param findAllCommentsDto 댓글 목록 조회 조건들
   * @returns 댓글 목록과 페이지네이션 메타데이터
   */
  @Get('post/:postId')
  @ApiGetAllComments()
  findAllComments(
    @Param('postId') postId: string,
    @Query() findAllCommentsDto: FindAllCommentsDto,
  ) {
    return this.commentsService.findAllComments(+postId, findAllCommentsDto);
  }

  /**
   * 댓글 상세 조회
   * @param commentId 댓글 ID
   * @returns 댓글 상세 정보
   */
  @Get(':commentId')
  @ApiGetComment()
  findOneComment(@Param('commentId') commentId: string) {
    return this.commentsService.findOneComment(+commentId);
  }

  /**
   * 댓글 수정
   * @param commentId 댓글 ID
   * @param updateCommentDto 댓글 수정 정보
   * @returns 수정된 댓글 정보
   */
  @Patch(':commentId')
  @ApiUpdateComment()
  updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    // TODO: JWT에서 userUuid 추출하여 권한 체크
    return this.commentsService.updateComment(+commentId, updateCommentDto);
  }

  /**
   * 댓글 삭제
   * @param commentId 댓글 ID
   * @returns 삭제 성공 메시지
   */
  @Delete(':commentId')
  @ApiDeleteComment()
  removeComment(@Param('commentId') commentId: string) {
    // TODO: JWT에서 userUuid 추출하여 권한 체크
    return this.commentsService.removeComment(+commentId);
  }
}
