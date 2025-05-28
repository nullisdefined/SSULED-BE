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
      {
        title: '오운완',
        password: null,
        isAccessible: true,
        maxMember: 4,
        ownerUuid: users[0].userUuid,
        memberUuid: [
          users[0].userUuid,
          users[1].userUuid,
          users[2].userUuid,
          users[3].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 공개 그룹 - 헬스장 모임
      {
        title: '홈트 마스터',
        password: null,
        isAccessible: true,
        maxMember: 4,
        ownerUuid: users[4].userUuid,
        memberUuid: [users[4].userUuid, users[5].userUuid, users[6].userUuid],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 비공개 그룹 - 비밀번호가 있는 요가 모임
      {
        title: '요가 애호가',
        password: '1234',
        isAccessible: false,
        maxMember: 3,
        ownerUuid: users[7].userUuid,
        memberUuid: [users[7].userUuid, users[8].userUuid],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 공개 그룹 - 달리기 모임
      {
        title: '마라톤 러너',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[9].userUuid,
        memberUuid: [
          users[9].userUuid,
          users[10].userUuid,
          users[11].userUuid,
          users[12].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 비공개 그룹 - 자전거 모임
      {
        title: '자전거 라이더',
        password: '5678',
        isAccessible: false,
        maxMember: 4,
        ownerUuid: users[13].userUuid,
        memberUuid: [
          users[13].userUuid,
          users[14].userUuid,
          users[15].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 공개 그룹 - 수영 모임
      {
        title: '수영 마니아',
        password: null,
        isAccessible: true,
        maxMember: 4,
        ownerUuid: users[16].userUuid,
        memberUuid: [
          users[16].userUuid,
          users[17].userUuid,
          users[18].userUuid,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 비공개 그룹 - 클라이밍 모임
      {
        title: '클라이밍 챌린저',
        password: '9012',
        isAccessible: false,
        maxMember: 3,
        ownerUuid: users[19].userUuid,
        memberUuid: [users[19].userUuid, users[20].userUuid],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 공개 그룹 - 크로스핏 모임
      {
        title: '크로스핏 워리어',
        password: null,
        isAccessible: true,
        maxMember: 5,
        ownerUuid: users[21].userUuid,
        memberUuid: [
          users[21].userUuid,
          users[22].userUuid,
          users[23].userUuid,
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

      this.logger.info(`그룹 '${group.title}' 생성 완료`);
    }
  }
}
