import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SocialProvider } from '@/types/social-provider.enum';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { UserStatusType } from '@/types/user-status.enum';
import { v4 as uuidv4 } from 'uuid';

export class UserSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // 프로필 이미지는 한 가지 이미지만 사용
    const profileImage: string =
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCXLP7%2FbtrQuNirLbt%2FN30EKpk07InXpbReKWzde1%2Fimg.png';

    // 그룹별 자기소개 메시지 (헬스, 런닝, 요가, 수영, 홈트, 크로스핏, 사이클링, 필라테스, 클라이밍, 복싱, 직장인, 초보자)
    const introductions: string[] = [
      '헬스로 근육을 키우는 중입니다! 오운완 인증하고 있어요 💪',
      '매일 한강에서 러닝하며 건강을 지키고 있습니다 🏃‍♂️',
      '요가로 마음의 평화와 유연성을 찾고 있어요 🧘‍♀️',
      '수영으로 전신 운동하며 체력 향상 중입니다 🏊‍♂️',
      '집에서도 꾸준히 홈트레이닝으로 건강 관리해요 🏠',
      '크로스핏으로 한계를 뛰어넘는 도전을 하고 있습니다 🔥',
      '자전거로 전국 곳곳을 달리며 여행하고 있어요 🚴‍♀️',
      '필라테스로 코어 근육 강화와 체형 교정 중 🤸‍♀️',
      '클라이밍으로 벽을 정복하는 짜릿함을 느끼고 있어요 🧗‍♂️',
      '복싱으로 스트레스 해소하고 체력 단련 중입니다 👊',
      '바쁜 직장 생활 속에서도 새벽에 운동하며 건강 챙겨요 💼',
      '주말마다 친구들과 함께 운동하며 즐거운 시간 보내요 🌅',
      '운동 초보지만 열심히 배우며 성장하고 있습니다 🔰',
      '운동을 사랑하는 마니아로서 다양한 운동에 도전해요 🌟',
      '벤치프레스 100kg 목표로 열심히 웨이트 트레이닝 중 💪',
      '다이어트 성공을 위해 꾸준히 노력하고 있어요 ⚖️',
      '바디프로필 촬영을 목표로 몸 만들기에 집중하고 있습니다 📸',
      '테니스로 즐겁게 운동하며 실력 향상 중이에요 🎾',
      '배드민턴 동호회에서 활발하게 활동하고 있습니다 🏸',
      '새벽 러닝으로 하루를 상쾌하게 시작해요 🏃‍♀️',
    ];

    // 100명의 더미 유저 생성
    const users = [];
    const baseUuid = '123e4567-e89b-12d3-a456-426614170000';

    for (let i = 0; i < 100; i++) {
      // uuid 마지막 5자리를 1씩 증가
      const userUuid =
        baseUuid.slice(0, baseUuid.length - 5) +
        (parseInt(baseUuid.slice(-5)) + i).toString().padStart(5, '0');

      users.push({
        userUuid,
        socialNickname: `익명_${i + 1}`,
        nickname: `익명_${i + 1}`,
        profileImage: profileImage, // 한 가지 이미지만 사용
        socialProvider:
          i % 3 === 0 ? SocialProvider.KAKAO : SocialProvider.NAVER,
        socialId: uuidv4(),
        introduction: introductions[i % introductions.length],
        status: UserStatusType.ACTIVE,
      });
    }

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

      this.logger.info(
        `사용자 ${userData.nickname} 생성 완료 (상태: ${userData.status})`,
      );
    }
  }
}
