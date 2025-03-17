import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuidv4 } from 'uuid';
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
        userUuid: uuidv4(),
        nickname: '숭실대벤치프레스',
        profileImage: 'https://example.com/admin.jpg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '12345',
      },
      {
        userUuid: uuidv4(),
        nickname: '포켓몬마스터',
        profileImage: 'https://example.com/user1.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '23456',
      },
      {
        userUuid: uuidv4(),
        nickname: '말하는고구마',
        profileImage: 'https://example.com/user2.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '34567',
      },
      {
        userUuid: uuidv4(),
        nickname: '배졍',
        profileImage: 'https://example.com/user3.jpg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '45678',
      },
      {
        userUuid: uuidv4(),
        nickname: '재굴TV',
        profileImage: 'https://example.com/user4.jpg',
        socialProvider: SocialProvider.NAVER,
        socialId: '56789',
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
