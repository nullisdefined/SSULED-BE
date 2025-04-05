import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SocialProvider } from '@/types/social-provider.enum';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';

export class UserSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const users = [
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174000',
        socialNickname: '숭실대벤치프레스',
        nickname: '익명_1',
        profileImage: 'https://example.com/admin.jpg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '12345',
        introduction: '난 근육맨이다.',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174001',
        socialNickname: '포켓몬마스터',
        nickname: '익명_2',
        profileImage: 'https://example.com/user1.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '23456',
        introduction: '파로 때리기!',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174002',
        socialNickname: '말하는고구마',
        nickname: '익명_3',
        profileImage: 'https://example.com/user2.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '34567',
        introduction: '나는 고구마...고구마..',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174003',
        socialNickname: '배졍',
        nickname: '익명_4',
        profileImage: 'https://example.com/user3.jpg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '45678',
        introduction: '우하하하하',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174004',
        socialNickname: '재굴TV',
        nickname: '익명_5',
        profileImage: 'https://example.com/user4.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '56789',
        introduction: '재굴재굴',
      },
    ];

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { nickname: userData.nickname },
      });

      if (existingUser) {
        this.logger.info(
          `사용자 ${userData.nickname}은(는) 이미 존재합니다. 건너뜁니다.`,
        );
        continue;
      }

      const user = userRepository.create(userData);
      await userRepository.save(user);

      this.logger.info(`사용자 ${user.nickname} 생성 완료`);
    }
  }
}
