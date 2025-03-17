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
        ownerId: users[0].id,
        memberId: [users[0].id, users[1].id, users[2].id, users[3].id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const groupData of groups) {
      const existingGroup = await groupRepository.findOne({
        where: {
          title: groupData.title,
          ownerId: groupData.ownerId,
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
