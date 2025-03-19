import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllPostsDto } from './dto/find-all-posts.dto';
import { Post } from '@/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  /**
   * 게시글 생성
   * @param createPostDto 게시글 생성 정보
   * @returns 생성된 게시글 정보
   */
  async createPost(createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
    });
    return this.postRepository.save(post);
  }

  /**
   * 게시글 목록 조회
   * @param findAllPostsDto 게시글 목록 조회 조건들
   * @returns 게시글 목록과 페이지네이션 메타데이터
   */
  async findAllPosts(findAllPostsDto: FindAllPostsDto) {
    const { page, limit, userUuid } = findAllPostsDto;

    const [posts, total] = await this.postRepository.findAndCount({
      where: { userUuid },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: posts,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * 게시글 상세 조회
   * @param id 게시글 ID
   * @returns 게시글 상세 정보
   */
  async findOnePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('해당 ID의 게시글을 찾을 수 없습니다.');
    }
    // TODO: 좋아요 추가
    // TODO: 댓글 추가
    // TODO: response type
    return post;
  }

  /**
   * 게시글 수정
   * @param id 게시글 ID
   * @param updatePostDto 게시글 수정 정보
   * @returns 수정된 게시글 정보
   */
  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOnePost(id);
    if (!post) {
      throw new NotFoundException('해당 ID의 게시글을 찾을 수 없습니다.');
    }
    // TODO: 게시글 수정 권한 체크
    this.postRepository.update(id, updatePostDto);
    return this.findOnePost(id);
  }

  /**
   * 게시글 삭제
   * @param id 게시글 ID
   * @returns 삭제된 게시글 정보
   */
  async removePost(id: number) {
    const post = await this.findOnePost(id);
    if (!post) {
      throw new NotFoundException('해당 ID의 게시글을 찾을 수 없습니다.');
    }
    // TODO: 게시글 삭제 권한 체크
    // TODO: response type
    this.postRepository.delete(id);
    return {
      message: '게시글이 성공적으로 삭제되었습니다.',
    };
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
