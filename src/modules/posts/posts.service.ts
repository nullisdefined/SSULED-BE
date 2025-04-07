import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FindAllPostsDto } from './dto/find-all-posts.dto';
import { Post } from '@/entities/post.entity';
import { LikesService } from '@/modules/likes/likes.service';
import { CommentsService } from '../comments/comments.service';
import { GroupService } from '../group/group.service';
import { FindPopularPostsDto } from './dto/find-popular-posts.dto';
import { FindGroupPostsDto } from './dto/find-group-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private likesService: LikesService,
    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
  ) {}

  /**
   * 게시글 생성
   * @param createPostDto 게시글 생성 정보
   * @returns 생성된 게시글 정보
   */
  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    const post = this.postRepository.create({
      ...createPostDto,
      userUuid,
    });
    return this.postRepository.save(post);
  }

  /**
   * 게시글 목록 조회
   * @param findAllPostsDto 게시글 목록 조회 조건들
   * @returns 게시글 목록과 페이지네이션 메타데이터
   */
  async findAllPosts(findAllPostsDto: FindAllPostsDto, userUuid: string) {
    const { page, limit } = findAllPostsDto;

    const [posts, total] = await this.postRepository.findAndCount({
      where: { userUuid },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    // 모든 게시글 ID 수집
    const postIds = posts.map((post) => post.id);

    // 좋아요 수 조회
    const likeCounts = await this.likesService.getLikeCountsByPostIds(postIds);

    // 댓글 수 조회
    const commentCounts =
      await this.commentsService.getCommentCountsByPostIds(postIds);

    // 좋아요 수, 댓글 수 추가
    const postsWithLikeAndCommentCounts = posts.map((post) => {
      return {
        ...post,
        likeCount: likeCounts.get(post.id) || 0,
        commentCount: commentCounts.get(post.id) || 0,
      };
    });

    return {
      data: postsWithLikeAndCommentCounts,
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
   * @param userUuid 조회하는 사용자 UUID (옵션)
   * @returns 게시글 상세 정보
   */
  async findOnePost(id: number, userUuid?: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post)
      throw new NotFoundException('해당 ID의 게시글을 찾을 수 없습니다.');

    // 비공개 게시글이라면 그룹 멤버인지 체크
    if (!post.isPublic && userUuid) {
      const group = await this.groupService.findUserCurrentGroup(userUuid);
      if (!group || !group.memberUuid.includes(post.userUuid)) {
        throw new UnauthorizedException('이 게시글을 조회할 권한이 없습니다.');
      }
    }

    const likeCount = await this.likesService.getLikeCountByPostId(id);
    const comments = await this.commentsService.getCommentsByPostId(
      id,
      userUuid,
    );
    const commentCount = comments.length;
    const likeStatus = userUuid
      ? await this.likesService.checkLikeStatus(userUuid, id)
      : null;

    return {
      ...post,
      likeCount,
      commentCount,
      userLiked: likeStatus?.liked ?? false,
      comments,
      isMine: userUuid ? post.userUuid === userUuid : false,
    };
  }

  /**
   * 게시글 수정
   * @param id 게시글 ID
   * @param updatePostDto 게시글 수정 정보
   * @returns 수정된 게시글 정보
   */
  async updatePost(id: number, updatePostDto: UpdatePostDto, userUuid: string) {
    const post = await this.findOnePost(id);

    // 게시글 수정 권한 체크
    if (post.userUuid !== userUuid) {
      throw new UnauthorizedException('게시글을 수정할 권한이 없습니다.');
    }

    // userUuid는 변경하지 않도록 제외
    const updateData = { ...updatePostDto };
    await this.postRepository.update(id, updateData);
    return this.findOnePost(id, userUuid);
  }

  /**
   * 게시글 삭제
   * @param id 게시글 ID
   * @param userUuid 삭제 요청하는 사용자 UUID
   * @returns 삭제된 게시글 정보
   */
  async removePost(id: number, userUuid: string) {
    const post = await this.findOnePost(id);

    // 게시글 삭제 권한 체크
    if (post.userUuid !== userUuid) {
      throw new UnauthorizedException('게시글을 삭제할 권한이 없습니다.');
    }

    this.postRepository.delete(id);
    return {
      message: '게시글이 성공적으로 삭제되었습니다.',
    };
  }

  /**
   * 그룹 게시글 조회
   * @param groupId 그룹 ID
   * @param options 조회 옵션 (페이지, 한 페이지당 항목 수)
   * @returns 그룹원들의 게시글 목록
   */
  async findGroupPosts(
    groupId: number,
    findGroupPostsDto: FindGroupPostsDto,
    userUuid: string,
  ) {
    const group = await this.groupService.findOneGroup(groupId);

    if (!group) {
      throw new NotFoundException('해당 ID의 그룹을 찾을 수 없습니다.');
    }

    const memberUuids = group.memberUuid;
    const isMember = memberUuids.includes(userUuid);
    const { page, limit } = findGroupPostsDto;

    // 그룹 멤버 여부에 따라 where 조건 다르게 구성
    const whereCondition = isMember
      ? [{ isPublic: true }, { userUuid: In(memberUuids), isPublic: false }]
      : [{ isPublic: true }];

    const [posts, total] = await this.postRepository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    if (!posts.length) {
      return {
        data: [],
        meta: {
          totalItems: 0,
          itemsPerPage: limit,
          totalPages: 0,
          currentPage: page,
        },
      };
    }

    const postIds = posts.map((post) => post.id);
    const likeCounts = await this.likesService.getLikeCountsByPostIds(postIds);
    const commentCounts =
      await this.commentsService.getCommentCountsByPostIds(postIds);

    const postsWithLikeAndCommentCounts = posts.map((post) => {
      return {
        ...post,
        likeCount: likeCounts.get(post.id) || 0,
        commentCount: commentCounts.get(post.id) || 0,
        isMine: post.userUuid === userUuid,
      };
    });

    return {
      data: postsWithLikeAndCommentCounts,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  /**
   * 인기 게시글 조회
   * @param options 조회 옵션 (페이지, 한 페이지당 항목 수)
   * @returns 좋아요, 댓글 순 인기 게시글 목록
   */
  async findPopularPosts(
    findPopularPostsDto: FindPopularPostsDto,
    userUuid: string,
  ) {
    const { page = 1, limit = 10 } = findPopularPostsDto;

    // 기본적으로 공개 게시글은 모두 볼 수 있음
    const whereCondition: any[] = [{ isPublic: true }];

    // 사용자가 그룹에 속해 있는 경우, 해당 그룹의 비공개 게시글도 볼 수 있음
    if (userUuid) {
      const group = await this.groupService.findUserCurrentGroup(userUuid);
      if (group) {
        // 그룹에 속한 사용자라면 그룹원들의 비공개 게시글도 조회 가능
        whereCondition.push({
          userUuid: In(group.memberUuid),
          isPublic: false,
        });
      }
    }

    const [posts, total] = await this.postRepository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit * 2, // 인기 게시글은 더 많이 가져와야 점수 매기기 쉬움
      order: { createdAt: 'DESC' },
    });

    if (!posts.length) {
      return {
        data: [],
        meta: {
          totalItems: 0,
          itemsPerPage: limit,
          totalPages: 0,
          currentPage: page,
        },
      };
    }

    const postIds = posts.map((post) => post.id);
    const likeCounts = await this.likesService.getLikeCountsByPostIds(postIds);
    const commentCounts =
      await this.commentsService.getCommentCountsByPostIds(postIds);

    const postsWithCounts = posts.map((post) => ({
      ...post,
      likeCount: likeCounts.get(post.id) || 0,
      commentCount: commentCounts.get(post.id) || 0,
      isMine: post.userUuid === userUuid,
    }));

    const sortedPosts = postsWithCounts.sort((a, b) => {
      const scoreA = a.likeCount + a.commentCount * 2;
      const scoreB = b.likeCount + b.commentCount * 2;
      return scoreB - scoreA;
    });

    const popularPosts = sortedPosts.slice(0, limit);

    return {
      data: popularPosts,
      meta: {
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
