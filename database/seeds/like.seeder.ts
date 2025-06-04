import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Like } from '@/entities/like.entity';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';

export class LikeSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const likeRepository = dataSource.getRepository(Like);
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);

    const posts = await postRepository.find();
    const users = await userRepository.find();

    if (posts.length === 0) {
      this.logger.warn('게시글이 없습니다. 좋아요 생성을 건너뜁니다.');
      return;
    }

    if (users.length === 0) {
      this.logger.warn('사용자가 없습니다. 좋아요 생성을 건너뜁니다.');
      return;
    }

    // 사용자 UUID와 ID 매핑 생성
    const userMap = new Map<string, number>();
    users.forEach((user) => {
      if (user.userUuid && user.id) {
        userMap.set(user.userUuid, user.id);
      }
    });

    const likes = [];

    // 각 게시글에 대해 랜덤하게 좋아요 생성
    for (const post of posts) {
      if (!post.id) continue;

      // 게시글당 0~15개의 좋아요를 랜덤하게 생성
      const likeCount = Math.floor(Math.random() * 16); // 0~15

      // 중복 방지를 위해 Set 사용
      const likedUserUuids = new Set<string>();

      // 게시글 작성자는 자신의 글에 좋아요를 누르지 않도록 처리
      const postAuthorUuid = post.userUuid;

      for (let i = 0; i < likeCount; i++) {
        // 랜덤 사용자 선택
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // 작성자 본인이거나 이미 좋아요를 누른 사용자는 제외
        if (
          randomUser.userUuid === postAuthorUuid ||
          likedUserUuids.has(randomUser.userUuid)
        ) {
          continue;
        }

        likedUserUuids.add(randomUser.userUuid);

        const userId = userMap.get(randomUser.userUuid);
        if (!userId) continue;

        // 좋아요 생성 날짜를 게시글 작성일 이후로 설정
        const likeDate = new Date(post.createdAt);
        likeDate.setTime(
          likeDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000, // 게시글 작성 후 최대 7일 내
        );

        likes.push({
          userUuid: randomUser.userUuid,
          userId: userId,
          postId: post.id,
          createdAt: likeDate,
        });
      }
    }

    // 좋아요 데이터 저장
    for (const likeData of likes) {
      try {
        // 중복 체크
        const existingLike = await likeRepository.findOne({
          where: {
            userUuid: likeData.userUuid,
            postId: likeData.postId,
          },
        });

        if (existingLike) {
          continue; // 이미 존재하는 좋아요는 건너뛰기
        }

        const like = likeRepository.create(likeData);
        await likeRepository.save(like);

        this.logger.debug(
          `좋아요 생성 완료 (사용자: ${likeData.userUuid.slice(-8)}, 게시글 ID: ${likeData.postId})`,
        );
      } catch (error) {
        this.logger.error(`좋아요 저장 중 오류 발생: ${error.message}`);
      }
    }

    // 통계 정보 출력
    const totalLikes = await likeRepository.count();
    const postsWithLikes = await postRepository
      .createQueryBuilder('post')
      .leftJoin('like', 'like', 'like.post_id = post.id')
      .select('COUNT(DISTINCT post.id)', 'count')
      .where('like.id IS NOT NULL')
      .getRawOne();

    this.logger.info(`총 ${totalLikes}개의 좋아요가 생성되었습니다.`);
    this.logger.info(
      `${postsWithLikes.count}개의 게시글이 좋아요를 받았습니다.`,
    );

    // 가장 많은 좋아요를 받은 게시글 정보
    const mostLikedPost = await postRepository
      .createQueryBuilder('post')
      .leftJoin('like', 'like', 'like.post_id = post.id')
      .select(['post.id', 'post.title', 'COUNT(like.id) as like_count'])
      .groupBy('post.id, post.title')
      .orderBy('like_count', 'DESC')
      .limit(1)
      .getRawOne();

    if (mostLikedPost) {
      this.logger.info(
        `가장 인기 있는 게시글: "${mostLikedPost.post_title}" (좋아요 ${mostLikedPost.like_count}개)`,
      );
    }
  }
}
