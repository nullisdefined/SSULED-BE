import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SocialProvider } from '@/types/social-provider.enum';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { UserStatusType } from '@/types/user-status.enum';

export class UserSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const users = [
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174000',
        socialNickname: '헬창러버',
        nickname: '익명_1',
        profileImage:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '12345',
        introduction: '벤치프레스 100kg 목표로 열심히 운동 중입니다! 💪',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174001',
        socialNickname: '러닝맨김종국',
        nickname: '익명_2',
        profileImage:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '23456',
        introduction: '매일 5km 달리기가 목표예요! 한강에서 자주 뛰어요 🏃‍♂️',
        status: UserStatusType.DELETE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174002',
        socialNickname: '요가여신',
        nickname: '익명_3',
        profileImage:
          'https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '34567',
        introduction:
          '요가로 몸과 마음을 치유하고 있어요. 유연성 기르는 중! 🧘‍♀️',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174003',
        socialNickname: '수영고수',
        nickname: '익명_4',
        profileImage:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '45678',
        introduction: '자유형 마스터를 꿈꾸는 수영 애호가입니다 🏊‍♂️',
        status: UserStatusType.DELETE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174004',
        socialNickname: '홈트마스터',
        nickname: '익명_5',
        profileImage:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '56789',
        introduction: '집에서도 충분히 운동할 수 있어요! 홈트 전도사 🏠💪',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174005',
        socialNickname: '클라이밍킹',
        nickname: '익명_6',
        profileImage:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '67890',
        introduction: '볼더링 3급 목표! 벽을 정복하는 그날까지 🧗‍♂️',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174006',
        socialNickname: '사이클링퀸',
        nickname: '익명_7',
        profileImage:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '78901',
        introduction: '자전거로 전국 일주가 꿈이에요! 🚴‍♀️',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174007',
        socialNickname: '크로스핏워리어',
        nickname: '익명_8',
        profileImage:
          'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '89012',
        introduction: 'WOD 완주가 하루의 목표입니다! 🔥',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174008',
        socialNickname: '다이어트성공',
        nickname: '익명_9',
        profileImage:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '90123',
        introduction: '20kg 감량 성공! 이제 몸매 관리 중이에요 ✨',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174009',
        socialNickname: '근육돼지',
        nickname: '익명_10',
        profileImage:
          'https://images.unsplash.com/photo-1558203728-00f45181dd84?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '01234',
        introduction: '벌크업이 인생! 단백질 섭취량 하루 150g 🥩',
        status: UserStatusType.DELETE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174010',
        socialNickname: '필라테스스타',
        nickname: '익명_11',
        profileImage:
          'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '12340',
        introduction: '필라테스로 바른 자세 만들어가는 중이에요 🤸‍♀️',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174011',
        socialNickname: '마라톤러너',
        nickname: '익명_12',
        profileImage:
          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '23401',
        introduction: '풀마라톤 완주가 올해 목표입니다! 🏃‍♀️',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174012',
        socialNickname: '테니스매니아',
        nickname: '익명_13',
        profileImage:
          'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '34012',
        introduction: '테니스 동호회 활동 중! 라켓 휘두르는 쾌감 최고 🎾',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174013',
        socialNickname: '배드민턴고수',
        nickname: '익명_14',
        profileImage:
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.KAKAO,
        socialId: '40123',
        introduction: '스매시 한 방이면 스트레스 해소! 🏸',
        status: UserStatusType.ACTIVE,
      },
      {
        userUuid: '123e4567-e89b-12d3-a456-426614174014',
        socialNickname: '복싱챔피언',
        nickname: '익명_15',
        profileImage:
          'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop&crop=face',
        socialProvider: SocialProvider.NAVER,
        socialId: '01235',
        introduction: '복싱으로 체력과 정신력 단련 중! 👊',
        status: UserStatusType.ACTIVE,
      },
    ];

    // 추가 사용자들 (16번부터 55번까지)
    const additionalUserNames = [
      '헬스초보',
      '런닝스타터',
      '요가초심자',
      '수영새내기',
      '홈트빈이',
      '클라이밍루키',
      '사이클링시작',
      '크로스핏입문',
      '다이어터',
      '근력운동러버',
      '필라테스러버',
      '마라톤지망생',
      '테니스입문자',
      '배드민턴초보',
      '복싱입문',
      '헬스고수',
      '런닝마니아',
      '요가달인',
      '수영선수',
      '홈트고수',
      '클라이밍마스터',
      '사이클링프로',
      '크로스핏고수',
      '다이어트성공자',
      '근육질',
      '필라테스마스터',
      '마라톤완주자',
      '테니스고수',
      '배드민턴달인',
      '복싱마스터',
      '피트니스러버',
      '건강관리왕',
      '운동중독자',
      '체력왕',
      '스포츠마니아',
      '액티브라이프',
      '웰니스추구자',
      '건강한삶',
      '운동하는직장인',
      '주말운동러',
    ];

    const additionalIntros = [
      '운동 시작한지 얼마 안 됐어요! 열심히 배우는 중 🔥',
      '꾸준히 운동하며 건강한 라이프스타일 추구해요 💪',
      '운동으로 스트레스 해소하고 있어요! 같이 운동해요 😊',
      '매일 조금씩이라도 몸을 움직이려고 노력해요 🏃‍♂️',
      '운동이 취미가 된 사람입니다! 운동 얘기 환영 🤗',
      '체력 기르고 건강 챙기며 살고 있어요 ✨',
      '운동으로 하루를 시작하는 게 습관이에요 ☀️',
      '몸과 마음 모두 건강하게! 운동은 최고의 약 💊',
      '운동하는 삶의 즐거움을 알아가는 중이에요 🎯',
      '건강한 몸 만들기 프로젝트 진행 중! 📈',
    ];

    for (let i = 16; i <= 55; i++) {
      const uuid = `123e4567-e89b-12d3-a456-42661417${4000 + i}`;

      // 50명 중 추가로 3명을 DELETE 상태로 설정 (총 5명이 DELETE)
      const status =
        i === 20 || i === 30 || i === 45
          ? UserStatusType.DELETE
          : UserStatusType.ACTIVE;

      // 프로필 이미지 다양화를 위한 카테고리별 이미지
      const imageCategories = [
        'photo-1507003211169-0a1dd7228f2d', // man
        'photo-1494790108755-2616b612b1e1', // woman
        'photo-1472099645785-5658abf4ff4e', // man
        'photo-1438761681033-6461ffad8d80', // woman
        'photo-1500648767791-00dcc994a43e', // man
        'photo-1544005313-94ddf0286df2', // woman
        'photo-1463453091185-61582044d556', // man
        'photo-1517841905240-472988babdf9', // woman
        'photo-1558203728-00f45181dd84', // man
        'photo-1489424731084-a5d8b219a5bb', // woman
      ];

      const imageIndex = (i - 16) % imageCategories.length;
      const profileImage = `https://images.unsplash.com/${imageCategories[imageIndex]}?w=300&h=300&fit=crop&crop=face`;

      users.push({
        userUuid: uuid,
        socialNickname: additionalUserNames[i - 16] || `운동러버${i}`,
        nickname: `익명_${i}`,
        profileImage: profileImage,
        socialProvider:
          i % 2 === 0 ? SocialProvider.KAKAO : SocialProvider.NAVER,
        socialId: `${60000 + i}`,
        introduction: additionalIntros[(i - 16) % additionalIntros.length],
        status: status,
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
        `사용자 ${user.nickname} 생성 완료 (상태: ${user.status})`,
      );
    }
  }
}
