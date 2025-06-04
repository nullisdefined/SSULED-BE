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
        maxMember: 15,
        ownerUuid: users[0].userUuid,
        memberUuid: [
          users[0].userUuid,
          users[1].userUuid,
          users[2].userUuid,
          users[3].userUuid,
          users[4].userUuid,
          users[5].userUuid,
          users[6].userUuid,
          users[7].userUuid,
          users[8].userUuid,
          users[9].userUuid,
          users[10].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏠 홈트레이닝 마스터',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[11].userUuid,
        memberUuid: [
          users[11].userUuid,
          users[12].userUuid,
          users[13].userUuid,
          users[14].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🔥 벤치프레스 100kg 클럽',
        password: null,
        isAccessible: true,
        maxMember: 4,
        ownerUuid: users[15].userUuid,
        memberUuid: [
          users[15].userUuid,
          users[16].userUuid,
          users[17].userUuid,
          users[18].userUuid,
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
        ownerUuid: users[19].userUuid,
        memberUuid: [
          users[19].userUuid,
          users[20].userUuid,
          users[21].userUuid,
          users[22].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🚴‍♀️ 자전거 라이딩 동호회',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[23].userUuid,
        memberUuid: [
          users[23].userUuid,
          users[24].userUuid,
          users[25].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏃‍♀️ 새벽 러닝 모임',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[26].userUuid,
        memberUuid: [
          users[26].userUuid,
          users[27].userUuid,
          users[28].userUuid,
          users[29].userUuid,
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
        ownerUuid: users[30].userUuid,
        memberUuid: [
          users[30].userUuid,
          users[31].userUuid,
          users[32].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🤸‍♀️ 필라테스 코어 강화',
        password: null,
        isAccessible: true,
        maxMember: 6,
        ownerUuid: users[33].userUuid,
        memberUuid: [
          users[33].userUuid,
          users[34].userUuid,
          users[35].userUuid,
          users[36].userUuid,
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
        ownerUuid: users[37].userUuid,
        memberUuid: [
          users[37].userUuid,
          users[38].userUuid,
          users[39].userUuid,
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
        ownerUuid: users[40].userUuid,
        memberUuid: [
          users[40].userUuid,
          users[41].userUuid,
          users[42].userUuid,
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
        ownerUuid: users[43].userUuid,
        memberUuid: [
          users[43].userUuid,
          users[44].userUuid,
          users[45].userUuid,
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
        ownerUuid: users[46].userUuid,
        memberUuid: [
          users[46].userUuid,
          users[47].userUuid,
          users[48].userUuid,
          users[49].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '📸 바디프로필 도전단',
        password: '2024',
        isAccessible: false,
        maxMember: 5,
        ownerUuid: users[50].userUuid,
        memberUuid: [
          users[50].userUuid,
          users[51].userUuid,
          users[52].userUuid,
          users[53].userUuid,
          users[54].userUuid,
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
        ownerUuid: users[55].userUuid,
        memberUuid: [
          users[55].userUuid,
          users[56].userUuid,
          users[57].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🏸 배드민턴 클럽',
        password: null,
        isAccessible: true,
        maxMember: 8,
        ownerUuid: users[58].userUuid,
        memberUuid: [
          users[58].userUuid,
          users[59].userUuid,
          users[60].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 격투기 그룹들
      {
        title: '👊 복싱 트레이닝 클럽',
        password: null,
        isAccessible: true,
        maxMember: 4,
        ownerUuid: users[61].userUuid,
        memberUuid: [
          users[61].userUuid,
          users[62].userUuid,
          users[63].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // 직장인/시간대별 그룹들
      {
        title: '💼 직장인 새벽 운동단',
        password: null,
        isAccessible: true,
        maxMember: 11,
        ownerUuid: users[64].userUuid,
        memberUuid: [
          users[64].userUuid,
          users[65].userUuid,
          users[66].userUuid,
          users[67].userUuid,
          users[68].userUuid,
          users[69].userUuid,
          users[70].userUuid,
          users[71].userUuid,
          users[72].userUuid,
          users[73].userUuid,
          users[74].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🌅 주말 운동 모임',
        password: null,
        isAccessible: true,
        maxMember: 12,
        ownerUuid: users[75].userUuid,
        memberUuid: [
          users[75].userUuid,
          users[76].userUuid,
          users[77].userUuid,
          users[78].userUuid,
          users[79].userUuid,
          users[80].userUuid,
          users[81].userUuid,
          users[82].userUuid,
          users[83].userUuid,
          users[84].userUuid,
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
        ownerUuid: users[85].userUuid,
        memberUuid: [
          users[85].userUuid,
          users[86].userUuid,
          users[87].userUuid,
          users[88].userUuid,
          users[89].userUuid,
          users[90].userUuid,
          users[91].userUuid,
          users[92].userUuid,
          users[93].userUuid,
          users[94].userUuid,
          users[95].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '🌟 운동 마니아 클럽',
        password: 'pro2024',
        isAccessible: false,
        maxMember: 8,
        ownerUuid: users[96].userUuid,
        memberUuid: [
          users[96].userUuid,
          users[97].userUuid,
          users[98].userUuid,
          users[99].userUuid,
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
