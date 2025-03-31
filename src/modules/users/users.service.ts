import { User } from '@/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOneBySocialId(socialId: string) {
    return this.userRepository.findOneBy({ socialId });
  }

  createUser(user, uuid): Promise<User> {
    const newUser = this.userRepository.create({
      userUuid: uuid,
      nickname: user.nickname,
      profileImage: user.profileImage,
      socialProvider: user.socialProvider,
      socialId: user.socialId,
    });
    return this.userRepository.save(newUser);
  }

  /**
   * userUuid로 userId 조회
   * @param userUuid 사용자 UUID
   * @returns 사용자 ID
   */
  async getUserIdByUuid(userUuid: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { userUuid },
      select: ['id'],
    });

    if (!user) {
      throw new NotFoundException(
        `UUID ${userUuid}에 해당하는 사용자를 찾을 수 없습니다.`,
      );
    }

    return user.id;
  }
}
