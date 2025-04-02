import { Seeder } from 'typeorm-extension';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { BodyPartEnum } from '@/types/body-part.enum';

export class PostSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);

    // 사용자 목록 가져오기
    const users = await userRepository.find();

    if (users.length === 0) {
      this.logger.warn('사용자가 없습니다. 게시글 생성을 건너뜁니다.');
      return;
    }

    const posts = [
      {
        title: '오늘 처음 헬스장 갔어요',
        content:
          '오늘 처음으로 헬스장에 가서 가슴과 등 운동을 했어요! 앞으로 꾸준히 다닐 예정입니다~',
        userUuid: users[0].userUuid,
        imageUrl: ['https://example.com/image1.jpg'],
        bodyPart: [BodyPartEnum.CHEST, BodyPartEnum.BACK],
        duration: 60,
        isPublic: true,
      },
      {
        title: '러닝 메이트 구합니다',
        content:
          '오늘 한강에서 한 시간 동안 러닝했어요. 혼자 하니 좀 외롭네요. 주 3회 아침에 한강에서 러닝할 메이트를 찾고 있어요. 관심 있으신 분은 연락주세요.',
        userUuid: users[1].userUuid,
        imageUrl: ['https://example.com/image2.jpg'],
        bodyPart: [BodyPartEnum.LEGS],
        duration: 45,
        isPublic: true,
      },
      {
        title: '단백질 보충제 추천해주세요',
        content:
          '오늘은 전신 운동을 했는데 운동 후 먹을 단백질 보충제가 필요해요. 운동 후 먹기 좋은 단백질 보충제 추천 부탁드립니다. 맛과 효과 모두 좋은 제품이면 좋겠어요.',
        userUuid: users[1].userUuid,
        imageUrl: ['https://example.com/image3.jpg'],
        bodyPart: [
          BodyPartEnum.CHEST,
          BodyPartEnum.BACK,
          BodyPartEnum.LEGS,
          BodyPartEnum.CORE,
        ],
        duration: 0,
        isPublic: true,
      },
      {
        title: '3개월 다이어트 성공 후기',
        content:
          '오늘도 전신과 코어 운동을 했어요. 이렇게 3개월간 다이어트와 운동으로 15kg 감량에 성공했습니다. 제 경험이 도움이 되었으면 좋겠어요.',
        userUuid: users[2].userUuid,
        imageUrl: [
          'https://example.com/image4.jpg',
          'https://example.com/image5.jpg',
        ],
        bodyPart: [
          BodyPartEnum.CHEST,
          BodyPartEnum.BACK,
          BodyPartEnum.LEGS,
          BodyPartEnum.CORE,
        ],
        duration: 90,
        isPublic: true,
      },
      {
        title: '운동 자세 체크해주세요',
        content:
          '오늘 30분 동안 하체와 엉덩이 운동을 했어요. 특히 스쿼트 자세가 맞는지 확인 부탁드립니다. 사진 첨부했으니 조언 부탁드려요.',
        userUuid: users[3].userUuid,
        imageUrl: ['https://example.com/image6.jpg'],
        bodyPart: [BodyPartEnum.LEGS, BodyPartEnum.OTHER],
        duration: 30,
        isPublic: true,
      },
    ];

    for (const postData of posts) {
      // 새 게시글 생성
      const post = postRepository.create(postData);
      await postRepository.save(post);

      this.logger.info(`게시글 '${post.title}' 생성 완료`);
    }
  }
}
