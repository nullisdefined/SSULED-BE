import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { UserSeeder } from './user.seeder';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { AuthSeeder } from './auth.seeder';
import { GroupSeeder } from './group.seeder';
import { PostSeeder } from './_post.seeder';
import { LikeSeeder } from './like.seeder';
import { CommentSeeder } from './_comment.seeder';

export class MainSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    this.logger.info('🧀 데이터베이스 시딩 시작');

    try {
      this.logger.info('🧀 사용자 시더 실행 중');
      await runSeeder(dataSource, UserSeeder);
      this.logger.info('🧀 사용자 시더 실행 완료');

      this.logger.info('🧀 인증 정보 시더 실행 중');
      await runSeeder(dataSource, AuthSeeder);
      this.logger.info('🧀 인증 정보 시더 실행 완료');

      this.logger.info('🧀 그룹 시더 실행 중');
      await runSeeder(dataSource, GroupSeeder);
      this.logger.info('🧀 그룹 시더 실행 완료');

      this.logger.info('🧀 게시글 시더 실행 중');
      await runSeeder(dataSource, PostSeeder);
      this.logger.info('🧀 게시글 시더 실행 완료');

      this.logger.info('🧀 좋아요 시더 실행 중');
      await runSeeder(dataSource, LikeSeeder);
      this.logger.info('🧀 좋아요 시더 실행 완료');

      this.logger.info('🧀 댓글 시더 실행 중');
      await runSeeder(dataSource, CommentSeeder);
      this.logger.info('🧀 댓글 시더 실행 완료');

      this.logger.info('🧀 데이터베이스 시딩 완료');
    } catch (error) {
      this.logger.error('🧀 데이터베이스 시딩 중 오류 발생:', error);
      throw error;
    }
  }
}
