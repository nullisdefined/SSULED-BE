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
import { Between, In, Repository } from 'typeorm';
import { FindAllPostsDto } from './dto/find-all-posts.dto';
import { Post } from '@/entities/post.entity';
import { WorkoutLog } from '@/entities/workout-log.entity';
import { LikesService } from '@/modules/likes/likes.service';
import { CommentsService } from '../comments/comments.service';
import { GroupService } from '../group/group.service';
import { FindPopularPostsDto } from './dto/find-popular-posts.dto';
import { FindGroupPostsDto } from './dto/find-group-posts.dto';
import { User } from '@/entities/user.entity';
import { UsersService } from '../users/users.service';
import { QuarterlyStatistics } from '@/entities/quarterly-statistics.entity';
import { QuarterlyRanking } from '@/entities/quarterly-ranking.entity';
import { RankingType } from '@/types/ranking.enum';
import { DailyGroupActivity } from '@/entities/daily_group_activiry.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(WorkoutLog)
    private workoutLogRepository: Repository<WorkoutLog>,
    @InjectRepository(QuarterlyStatistics)
    private quarterlyStatisticsRepository: Repository<QuarterlyStatistics>,
    @InjectRepository(QuarterlyRanking)
    private quarterlyRankingRepository: Repository<QuarterlyRanking>,
    @InjectRepository(DailyGroupActivity)
    private dailyGroupActivityRepository: Repository<DailyGroupActivity>,
    private likesService: LikesService,
    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService,
    @Inject(forwardRef(() => GroupService))
    private groupService: GroupService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UsersService,
  ) {}

  /**
   * 게시글 생성
   * @param createPostDto 게시글 생성 정보
   * @returns 생성된 게시글 정보
   */
  async createPost(createPostDto: CreatePostDto, userUuid: string) {
    const { title, content, imageUrl, isPublic, bodyPart, duration } =
      createPostDto;

    // 오늘 작성한 글 있는지 확인
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const now = new Date();
    const year = now.getFullYear();
    const quarter = Math.floor(now.getMonth() / 3) + 1;

    const alreadyPostedToday = await this.postRepository.exists({
      where: {
        userUuid,
        createdAt: Between(todayStart, todayEnd),
      },
    });

    const post = this.postRepository.create({
      title,
      content,
      imageUrl,
      isPublic,
      userUuid,
    });
    const savedPost = await this.postRepository.save(post);

    // kst 시간대 구분 함수
    function getCurrentKSTTimeZoneLabel():
      | 'dawn'
      | 'morning'
      | 'afternoon'
      | 'night' {
      const utcNow = new Date();
      const kstNow = new Date(utcNow.getTime() + 9 * 60 * 60 * 1000); // + 9시간 보정
      const hour = kstNow.getUTCHours(); // 보정된 시간 기준으로 getUTCHours()

      if (hour < 6) return 'dawn';
      if (hour < 12) return 'morning';
      if (hour < 18) return 'afternoon';
      return 'night';
    }
    const timeZoneLabel = getCurrentKSTTimeZoneLabel();

    // 오늘 올린 post가 없다면 그룹 통계에 집계
    if (!alreadyPostedToday) {
      const isGroup = await this.groupService.findUserGroup(userUuid);
      if (isGroup) {
        const groupId = isGroup.id;

        const group = await this.groupService.findOneGroup(groupId);
        const currentMembers = group.memberUuid.length;
        const score = (1 / currentMembers) * 100;

        let ranking = await this.quarterlyRankingRepository.findOne({
          where: { groupId, year, quarter },
        });

        if (!ranking) {
          ranking = this.quarterlyRankingRepository.create({
            type: RankingType.GROUP,
            groupId,
            year,
            quarter,
            score,
            isFinal: false,
          });
        } else {
          ranking.score += score;
        }
        await this.quarterlyRankingRepository.save(ranking);

        // DailyGroupActiviry 업데이트
        const todayStr = new Date().toISOString().slice(0, 10); //YYYY-MM-DD
        let dailyActivity = await this.dailyGroupActivityRepository.findOne({
          where: {
            groupId: groupId,
            date: todayStr,
          },
        });

        if (!dailyActivity) {
          dailyActivity = this.dailyGroupActivityRepository.create({
            groupId,
            date: todayStr,
            value: 1,
          });
        } else {
          dailyActivity.value += 1;
        }

        await this.dailyGroupActivityRepository.save(dailyActivity);
      } else {
        throw new NotFoundException(
          '해당 사용자는 그룹에 소속되어 있지 않습니다.',
        );
      }
    }

    // 개인 통계 집계
    let stat = await this.quarterlyStatisticsRepository.findOne({
      where: { userUuid, year, quarter },
    });

    if (!stat) {
      // 처음이면 통계 엔트리 생성
      const initialBodyPart = {};
      for (const part of bodyPart) {
        initialBodyPart[part] = 1;
      }
      const initalTimeZone = { dawn: 0, morning: 0, afternoon: 0, night: 0 };
      initalTimeZone[timeZoneLabel] = 1;

      stat = this.quarterlyStatisticsRepository.create({
        userUuid,
        year,
        quarter,
        timeZone: initalTimeZone,
        bodyPart: initialBodyPart,
        currentStreak: alreadyPostedToday ? 0 : 1,
        longestStreak: alreadyPostedToday ? 0 : 1,
      });
    } else {
      for (const part of bodyPart) {
        stat.bodyPart[part] = (stat.bodyPart[part] || 0) + 1;
      }

      stat.timeZone[timeZoneLabel] = (stat.timeZone[timeZoneLabel] || 0) + 1;

      if (!alreadyPostedToday) {
        stat.currentStreak += 1;
        if (stat.currentStreak > stat.longestStreak) {
          stat.longestStreak = stat.currentStreak;
        }
      }
    }

    await this.quarterlyStatisticsRepository.save(stat);

    if (duration && bodyPart?.length > 0) {
      for (const part of bodyPart) {
        const log = this.workoutLogRepository.create({
          userUuid,
          bodyPart: [part],
          duration: Math.round(duration / bodyPart.length),
          postId: savedPost.id,
        });
        await this.workoutLogRepository.save(log);
      }
    }

    return savedPost;
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

    // 사용자 정보 조회
    const userId = await this.userService.getUserIdByUuid(userUuid);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'nickname', 'profileImage'],
    });

    // 좋아요 수, 댓글 수 추가
    const postsWithLikeAndCommentCounts = posts.map((post) => {
      return {
        ...post,
        likeCount: likeCounts.get(post.id) || 0,
        commentCount: commentCounts.get(post.id) || 0,
        user: user
          ? {
              nickname: user.nickname,
              profileImage: user.profileImage,
            }
          : null,
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

    // 사용자 정보 조회
    const userId = await this.userService.getUserIdByUuid(post.userUuid);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'nickname', 'profileImage'],
    });

    // 운동 로그 정보 조회
    const workoutLogs = await this.workoutLogRepository.find({
      where: { postId: id },
    });

    // 운동 정보 집계
    const bodyPart = [...new Set(workoutLogs.flatMap((log) => log.bodyPart))];
    const duration = workoutLogs.reduce((sum, log) => sum + log.duration, 0);

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
      bodyPart,
      duration,
      likeCount,
      commentCount,
      userLiked: likeStatus?.liked ?? false,
      comments,
      isMine: userUuid ? post.userUuid === userUuid : false,
      user: user
        ? {
            nickname: user.nickname,
            profileImage: user.profileImage,
          }
        : null,
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

    if (post.userUuid !== userUuid) {
      throw new UnauthorizedException('게시글을 수정할 권한이 없습니다.');
    }

    const updateData = { ...updatePostDto };
    await this.postRepository.update(id, updateData);

    if (updatePostDto.bodyPart && updatePostDto.duration) {
      await this.workoutLogRepository.delete({ postId: id });

      for (const part of updatePostDto.bodyPart) {
        const log = this.workoutLogRepository.create({
          userUuid,
          bodyPart: [part],
          duration: Math.round(
            updatePostDto.duration / updatePostDto.bodyPart.length,
          ),
          postId: id,
        });
        await this.workoutLogRepository.save(log);
      }
    }

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

    await this.workoutLogRepository.delete({ postId: id });
    await this.postRepository.delete(id);
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

    // 게시글 작성자들의 UUID를 가져옴
    const postUserUuids = [...new Set(posts.map((post) => post.userUuid))];

    // 모든 작성자 정보를 한 번에 조회
    const userIds = await Promise.all(
      postUserUuids.map((uuid) => this.userService.getUserIdByUuid(uuid)),
    );

    const users = await this.userRepository.find({
      where: { id: In(userIds.filter((id) => id !== null)) },
      select: ['id', 'userUuid', 'nickname', 'profileImage'],
    });

    // UUID로 사용자 정보를 매핑하는 Map 생성
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(user.userUuid, {
        nickname: user.nickname,
        profileImage: user.profileImage,
      });
    });

    const postsWithLikeAndCommentCounts = posts.map((post) => {
      return {
        ...post,
        likeCount: likeCounts.get(post.id) || 0,
        commentCount: commentCounts.get(post.id) || 0,
        isMine: post.userUuid === userUuid,
        user: userMap.get(post.userUuid) || null,
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

    // 게시글 작성자들의 UUID를 가져옴
    const postUserUuids = [...new Set(posts.map((post) => post.userUuid))];

    // 모든 작성자 정보를 한 번에 조회
    const userIds = await Promise.all(
      postUserUuids.map((uuid) => this.userService.getUserIdByUuid(uuid)),
    );

    const users = await this.userRepository.find({
      where: { id: In(userIds.filter((id) => id !== null)) },
      select: ['id', 'userUuid', 'nickname', 'profileImage'],
    });

    // UUID로 사용자 정보를 매핑하는 Map 생성
    const userMap = new Map();
    users.forEach((user) => {
      userMap.set(user.userUuid, {
        nickname: user.nickname,
        profileImage: user.profileImage,
      });
    });

    const postsWithCounts = posts.map((post) => ({
      ...post,
      likeCount: likeCounts.get(post.id) || 0,
      commentCount: commentCounts.get(post.id) || 0,
      isMine: post.userUuid === userUuid,
      user: userMap.get(post.userUuid) || null,
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
