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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreatePost,
  ApiDeletePost,
  ApiGetAllPosts,
  ApiGetPostById,
  ApiUpdatePost,
} from '@/decorators/swagger.decorator';
import { FindAllPostsDto } from './dto/find-all-posts.dto';

@ApiTags('posts')
@Controller('posts')
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
  createPost(@Body() createPostDto: CreatePostDto) {
    // TODO: payload에서 userUuid 추출
    return this.postsService.createPost(createPostDto);
  }

  /**
   * 사용자 게시글 조회
   * @param findAllPostsDto 게시글 목록 조회 조건들
   * @returns 사용자 게시글 목록
   */
  @Get()
  @ApiGetAllPosts()
  findAllPosts(@Query() findAllPostsDto: FindAllPostsDto) {
    return this.postsService.findAllPosts(findAllPostsDto);
  }

  /**
   * 게시글 상세 조회
   * @param postId 게시글 ID
   * @returns 게시글 상세 정보
   */
  @Get(':postId')
  @ApiGetPostById()
  findOnePost(@Param('postId') postId: string) {
    return this.postsService.findOnePost(+postId);
  }

  /**
   * 게시글 수정
   * @param postId 게시글 ID
   * @param updatePostDto 게시글 수정 정보
   * @returns 수정된 게시글 정보
   */
  @Patch(':postId')
  @ApiUpdatePost()
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(+postId, updatePostDto);
  }

  /**
   * 게시글 삭제
   * @param postId 게시글 ID
   * @param userUuid 사용자 UUID
   * @returns 삭제된 게시글 정보
   */
  @Delete(':postId')
  @ApiDeletePost()
  removePost(@Param('postId') postId: string) {
    return this.postsService.removePost(+postId);
  }

  /* TODO
   * findPopularPosts - 인기 게시글 조회
   * @returns 좋아요, 댓글 순 인기 게시글 목록
   */

  /* TODO
   * findGroupPosts - 그룹 게시글 조회
   * @param groupId 그룹 ID
   * @returns 그룹원 게시글 목록
   */
}
