import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Group } from '@/entities/group.entity';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';

export class GroupSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const groupRepository = dataSource.getRepository(Group);
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find();

    if (users.length === 0) {
      this.logger.warn('사용자가 없습니다. 그룹 생성을 건너뜁니다.');
      return;
    }

    const groups = [
      // 헬스/웨이트 트레이닝 그룹들
      {
        title: '💪 오운완 인증단',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[0].userUuid,
        memberUuid: [
          users[0].userUuid,
          users[1].userUuid,
          users[2].userUuid,
          users[3].userUuid,
          users[9].userUuid, // 근육돼지
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏠 홈트레이닝 마스터',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[4].userUuid, // 홈트마스터
        memberUuid: [
          users[4].userUuid,
          users[5].userUuid,
          users[6].userUuid,
          users[16].userUuid, // 헬스초보
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🔥 벤치프레스 100kg 클럽',
        password: '1004',
        isAccessible: false,
        maxMember: 4,
        ownerUuid: users[0].userUuid, // 헬창러버
        memberUuid: [
          users[0].userUuid,
          users[9].userUuid, // 근육돼지
          users[25].userUuid, // 근력운동러버
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 유산소 운동 그룹들
      {
        title: '🏃‍♂️ 한강 러닝 크루',
        password: null,
        isAccessible: true,
        maxMember: 8,
        ownerUuid: users[1].userUuid, // 러닝맨김종국
        memberUuid: [
          users[1].userUuid,
          users[11].userUuid, // 마라톤러너
          users[17].userUuid, // 런닝스타터
          users[27].userUuid, // 마라톤지망생
          users[31].userUuid, // 마라톤완주자
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🚴‍♀️ 자전거 라이딩 동호회',
        password: '5678',
        isAccessible: false,
        maxMember: 6,
        ownerUuid: users[6].userUuid, // 사이클링퀸
        memberUuid: [
          users[6].userUuid,
          users[21].userUuid, // 사이클링시작
          users[26].userUuid, // 사이클링프로
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏃‍♀️ 새벽 러닝 모임',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[11].userUuid, // 마라톤러너
        memberUuid: [
          users[11].userUuid,
          users[1].userUuid, // 러닝맨김종국
          users[17].userUuid, // 런닝스타터
          users[39].userUuid, // 주말운동러
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 요가/필라테스 그룹들
      {
        title: '🧘‍♀️ 요가 힐링 클래스',
        password: '1234',
        isAccessible: false,
        maxMember: 4,
        ownerUuid: users[2].userUuid, // 요가여신
        memberUuid: [
          users[2].userUuid,
          users[10].userUuid, // 필라테스스타
          users[18].userUuid, // 요가초심자
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🤸‍♀️ 필라테스 코어 강화',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[10].userUuid, // 필라테스스타
        memberUuid: [
          users[10].userUuid,
          users[2].userUuid, // 요가여신
          users[24].userUuid, // 필라테스러버
          users[29].userUuid, // 필라테스마스터
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 수영 그룹들
      {
        title: '🏊‍♂️ 수영 마스터즈',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[3].userUuid, // 수영고수
        memberUuid: [
          users[3].userUuid,
          users[19].userUuid, // 수영새내기
          users[23].userUuid, // 수영선수
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 클라이밍 그룹들
      {
        title: '🧗‍♂️ 클라이밍 챌린저스',
        password: '9012',
        isAccessible: false,
        maxMember: 4,
        ownerUuid: users[5].userUuid, // 클라이밍킹
        memberUuid: [
          users[5].userUuid,
          users[20].userUuid, // 클라이밍루키
          users[25].userUuid, // 클라이밍마스터
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 크로스핏 그룹들
      {
        title: '🔥 크로스핏 워리어즈',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[7].userUuid, // 크로스핏워리어
        memberUuid: [
          users[7].userUuid,
          users[22].userUuid, // 크로스핏입문
          users[27].userUuid, // 크로스핏고수
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 다이어트/바디프로필 그룹들
      {
        title: '⚖️ 다이어트 성공 프로젝트',
        password: null,
        isAccessible: true,
        maxMember: 8,
        ownerUuid: users[8].userUuid, // 다이어트성공
        memberUuid: [
          users[8].userUuid,
          users[23].userUuid, // 다이어터
          users[28].userUuid, // 다이어트성공자
          users[35].userUuid, // 웰니스추구자
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '📸 바디프로필 도전단',
        password: '2024',
        isAccessible: false,
        maxMember: 5,
        ownerUuid: users[8].userUuid, // 다이어트성공
        memberUuid: [
          users[8].userUuid,
          users[0].userUuid, // 헬창러버
          users[28].userUuid, // 다이어트성공자
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 구기 종목 그룹들
      {
        title: '🎾 테니스 동호회',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[12].userUuid, // 테니스매니아
        memberUuid: [
          users[12].userUuid,
          users[32].userUuid, // 테니스고수
          users[28].userUuid, // 테니스입문자
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏸 배드민턴 클럽',
        password: null,
        isAccessible: true,
        maxMember: 8,
        ownerUuid: users[13].userUuid, // 배드민턴고수
        memberUuid: [
          users[13].userUuid,
          users[29].userUuid, // 배드민턴초보
          users[33].userUuid, // 배드민턴달인
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 격투기 그룹들
      {
        title: '👊 복싱 트레이닝 클럽',
        password: '3721',
        isAccessible: false,
        maxMember: 4,
        ownerUuid: users[14].userUuid, // 복싱챔피언
        memberUuid: [
          users[14].userUuid,
          users[30].userUuid, // 복싱입문
          users[34].userUuid, // 복싱마스터
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 직장인/시간대별 그룹들
      {
        title: '💼 직장인 새벽 운동단',
        password: null,
        isAccessible: true,
        maxMember: 10,
        ownerUuid: users[38].userUuid, // 운동하는직장인
        memberUuid: [
          users[38].userUuid,
          users[1].userUuid, // 러닝맨김종국 (새벽러닝)
          users[11].userUuid, // 마라톤러너
          users[35].userUuid, // 웰니스추구자
          users[36].userUuid, // 건강한삶
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🌅 주말 운동 모임',
        password: null,
        isAccessible: true,
        maxMember: 12,
        ownerUuid: users[39].userUuid, // 주말운동러
        memberUuid: [
          users[39].userUuid,
          users[6].userUuid, // 사이클링퀸
          users[12].userUuid, // 테니스매니아
          users[13].userUuid, // 배드민턴고수
          users[35].userUuid, // 액티브라이프
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 초보자/커뮤니티 그룹들
      {
        title: '🔰 운동 초보자 도움반',
        password: null,
        isAccessible: true,
        maxMember: 15,
        ownerUuid: users[16].userUuid, // 헬스초보
        memberUuid: [
          users[16].userUuid, // 헬스초보
          users[17].userUuid, // 런닝스타터
          users[18].userUuid, // 요가초심자
          users[19].userUuid, // 수영새내기
          users[20].userUuid, // 홈트빈이
          users[21].userUuid, // 클라이밍루키
          users[22].userUuid, // 사이클링시작
          users[23].userUuid, // 크로스핏입문
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🌟 운동 마니아 클럽',
        password: 'pro2024',
        isAccessible: false,
        maxMember: 8,
        ownerUuid: users[37].userUuid, // 운동중독자
        memberUuid: [
          users[37].userUuid, // 운동중독자
          users[0].userUuid, // 헬창러버
          users[7].userUuid, // 크로스핏워리어
          users[5].userUuid, // 클라이밍킹
          users[14].userUuid, // 복싱챔피언
          users[36].userUuid, // 스포츠마니아
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const groupData of groups) {
      const existingGroup = await groupRepository.findOne({
        where: {
          title: groupData.title,
          ownerUuid: groupData.ownerUuid,
        },
      });

      if (existingGroup) {
        this.logger.info(
          `그룹 '${groupData.title}'은(는) 이미 존재합니다. 건너뜁니다.`,
        );
        continue;
      }

      const group = groupRepository.create(groupData);
      await groupRepository.save(group);

      this.logger.info(
        `그룹 '${group.title}' 생성 완료 (멤버 수: ${group.memberUuid.length}/${group.maxMember})`,
      );
    }
  }
}
