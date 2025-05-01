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
        profileImage:
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/5A30399A-CF2C-462B-99A1-0417FD73BB81.jpeg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '12345',
        introduction: '난 근육맨이다.',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174001',
        socialNickname: '포켓몬마스터',
        nickname: '익명_2',
        profileImage:
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/6A5196E3-65DB-4C2E-B502-F5B288F6BDD1_1_201_a.jpeg',
        socialProvider: SocialProvider.NAVER,
        socialId: '23456',
        introduction: '파로 때리기!',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174002',
        socialNickname: '말하는고구마',
        nickname: '익명_3',
        profileImage:
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/BB981EA2-B6A2-4270-B227-C8B26A89CBCF_1_201_a.jpeg',
        socialProvider: SocialProvider.NAVER,
        socialId: '34567',
        introduction: '나는 고구마...고구마..',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174003',
        socialNickname: '배졍',
        nickname: '익명_4',
        profileImage:
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/5BEF99BF-2EFF-4ECC-B7DC-584DA2A5B52D.jpeg',
        socialProvider: SocialProvider.KAKAO,
        socialId: '45678',
        introduction: '우하하하하',
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174004',
        socialNickname: '재굴TV',
        nickname: '익명_5',
        profileImage:
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/d11849a6-b1e1-4a61-91b5-2fc209fd23e1.jpeg',
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
