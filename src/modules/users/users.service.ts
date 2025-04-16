import { Auth } from '@/entities/auth.entity';
import { User } from '@/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findOneBySocialId(socialId: string) {
    return this.userRepository.findOneBy({ socialId });
  }

  createUser(user, uuid): Promise<User> {
    const newUser = this.userRepository.create({
      userUuid: uuid,
      nickname: user.nickname,
      socialNickname: user.socialNickname,
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

  async logout(userUuid: string) {
    const userId = await this.getUserIdByUuid(userUuid);
    await this.authRepository.update(
      { userId },
      {
        refreshToken: null,
      },
    );

    return {
      ok: true,
      message: '로그아웃 성공',
    };
  }

  /*
  닉네임 변경
  */
  async updateNickname(userUuid: string, newNickname: string) {
    const user = await this.userRepository.findOneBy({ userUuid });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 닉네임 중복 체크
    const isDuplicate = await this.userRepository.findOneBy({
      nickname: newNickname,
    });
    if (isDuplicate && isDuplicate.userUuid !== userUuid) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다.');
    }

    user.nickname = newNickname;
    await this.userRepository.save(user);

    return { ok: true, nickname: newNickname, message: '닉네임 변경 성공' };
  }

  async checkUserExists(userUuid: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { userUuid } });
    return !!user;
  }

  /*
  소개글 변경
  */
  async updateIntroduction(userUuid: string, newIntroduction: string) {
    const user = await this.userRepository.findOneBy({ userUuid });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    user.introduction = newIntroduction;
    await this.userRepository.save(user);

    return { ok: true, message: '소개글 변경 성공!' };
  }

  async getUserByIds(idArray: string[]) {
    const users = await Promise.all(
      idArray.map(async (id) => {
        const user = await this.userRepository.findOneBy({ userUuid: id });
        return user;
      }),
    );

    return users.filter((user) => user !== null);
  }
}
