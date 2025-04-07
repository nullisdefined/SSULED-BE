import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiCreatePost,
  ApiDeletePost,
  ApiGetAllPosts,
  ApiGetPostById,
  ApiUpdatePost,
  ApiGetGroupPosts,
  ApiGetPopularPosts,
} from '@/decorators/swagger.decorator';
import { FindAllPostsDto } from './dto/find-all-posts.dto';
import { FindGroupPostsDto } from './dto/find-group-posts.dto';
import { FindPopularPostsDto } from './dto/find-popular-posts.dto';
import { UserUuid } from '@/decorators/user-uuid.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('post')
@ApiBearerAuth('JWT-auth')
@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 사용자 게시글 생성
   * @param createPostDto 게시글 생성 정보
   * @param userUuid 사용자 UUID
   * @returns 생성된 게시글 정보
   */
  @Post()
  @ApiCreatePost()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @UserUuid() userUuid: string,
  ) {
    return this.postsService.createPost(createPostDto, userUuid);
  }

  /**
   * 사용자 게시글 조회
   * @param findAllPostsDto 게시글 목록 조회 조건들
   * @param userUuid 사용자 UUID
   * @returns 사용자 게시글 목록
   */
  @Get()
  @ApiGetAllPosts()
  findAllPosts(
    @Query() findAllPostsDto: FindAllPostsDto,
    @UserUuid() userUuid: string,
  ) {
    return this.postsService.findAllPosts(findAllPostsDto, userUuid);
  }

  /**
   * 인기 게시글 조회
   * @param findPopularPostsDto 조회 옵션
   * @param userUuid 사용자 UUID
   * @returns 좋아요, 댓글 순 인기 게시글 목록
   */
  @Get('popular')
  @ApiGetPopularPosts()
  findPopularPosts(
    @Query() findPopularPostsDto: FindPopularPostsDto,
    @UserUuid() userUuid: string,
  ) {
    return this.postsService.findPopularPosts(findPopularPostsDto, userUuid);
  }

  /**
   * 게시글 상세 조회
   * @param postId 게시글 ID
   * @param userUuid 사용자 UUID
   * @returns 게시글 상세 정보
   */
  @Get(':postId')
  @ApiGetPostById()
  findOnePost(@Param('postId') postId: string, @UserUuid() userUuid: string) {
    return this.postsService.findOnePost(+postId, userUuid);
  }

  /**
   * 게시글 수정
   * @param postId 게시글 ID
   * @param updatePostDto 게시글 수정 정보
   * @param userUuid 사용자 UUID
   * @returns 수정된 게시글 정보
   */
  @Patch(':postId')
  @ApiUpdatePost()
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserUuid() userUuid: string,
  ) {
    return this.postsService.updatePost(+postId, updatePostDto, userUuid);
  }

  /**
   * 게시글 삭제
   * @param postId 게시글 ID
   * @param userUuid 사용자 UUID
   * @returns 삭제된 게시글 정보
   */
  @Delete(':postId')
  @ApiDeletePost()
  removePost(@Param('postId') postId: string, @UserUuid() userUuid: string) {
    return this.postsService.removePost(+postId, userUuid);
  }

  /**
   * 그룹 게시글 조회
   * @param groupId 그룹 ID
   * @param findGroupPostsDto 조회 옵션
   * @param userUuid 사용자 UUID
   * @returns 그룹원들의 게시글 목록
   */
  @Get('group/:groupId')
  @ApiGetGroupPosts()
  findGroupPosts(
    @Param('groupId') groupId: string,
    @Query() findGroupPostsDto: FindGroupPostsDto,
    @UserUuid() userUuid: string,
  ) {
    return this.postsService.findGroupPosts(
      +groupId,
      findGroupPostsDto,
      userUuid,
    );
  }
}
