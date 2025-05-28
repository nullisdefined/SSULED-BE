/* eslint-disable @typescript-eslint/no-unused-vars */
import { Seeder } from 'typeorm-extension';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { Group } from '@/entities/group.entity';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { BodyPartEnum } from '@/types/body-part.enum';
import { WorkoutLog } from '@/entities/workout-log.entity';

export class PostSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);
    const groupRepository = dataSource.getRepository(Group);
    const workoutLogRepository = dataSource.getRepository(WorkoutLog);

    // 사용자 목록 가져오기
    const users = await userRepository.find();
    const groups = await groupRepository.find();

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
        imageUrl: [
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/f82efd61-9a18-4bb8-b256-7eedd16a248d.jpeg',
        ],
        bodyPart: [BodyPartEnum.CHEST, BodyPartEnum.BACK],
        duration: 60,
        isPublic: true,
      },
      {
        title: '러닝 메이트 구합니다',
        content:
          '오늘 한강에서 한 시간 동안 러닝했어요. 혼자 하니 좀 외롭네요. 주 3회 아침에 한강에서 러닝할 메이트를 찾고 있어요. 관심 있으신 분은 연락주세요.',
        userUuid: users[1].userUuid,
        imageUrl: [
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/3d832c41-7a2a-458c-b405-5da9e27927fe.jpeg',
        ],
        bodyPart: [BodyPartEnum.LEGS],
        duration: 45,
        isPublic: true,
      },
      {
        title: '단백질 보충제 추천해주세요',
        content:
          '오늘은 전신 운동을 했는데 운동 후 먹을 단백질 보충제가 필요해요. 운동 후 먹기 좋은 단백질 보충제 추천 부탁드립니다. 맛과 효과 모두 좋은 제품이면 좋겠어요.',
        userUuid: users[1].userUuid,
        imageUrl: [
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/bbb13b32-d745-42b9-ac29-4d604a58e080.jpg',
        ],
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
          '오늘도 전신과 코어 운동을 했어요. 3개월간 다이어트와 운동으로 15kg 감량에 성공!',
        userUuid: users[2].userUuid,
        imageUrl: [
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/0b8629d4-3b84-4640-8234-6074c69c851b.jpg',
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
        imageUrl: [
          'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/81afc14e-2eb1-4a94-8b3f-fbfc374b8f7a.jpg',
        ],
        bodyPart: [BodyPartEnum.LEGS, BodyPartEnum.OTHER],
        duration: 30,
        isPublic: true,
      },
    ];

    // 오운완 그룹 관련 게시글 (가슴, 등, 전신 운동)
    for (let i = 0; i < 10; i++) {
      const userIndex = i % 4; // 첫 4명의 사용자가 '오운완' 그룹에 있음
      posts.push({
        title: `오운완 인증 ${i + 1}일차`,
        content: `오늘도 열심히 운동했습니다! ${
          i % 2 === 0 ? '가슴과 등' : '전신'
        } 운동을 ${30 + i * 5}분 동안 진행했어요. 꾸준히 하는 것이 중요하죠!`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?gym,workout,${i}`,
        ],
        bodyPart:
          i % 2 === 0
            ? [BodyPartEnum.CHEST, BodyPartEnum.BACK]
            : [
                BodyPartEnum.CHEST,
                BodyPartEnum.BACK,
                BodyPartEnum.LEGS,
                BodyPartEnum.SHOULDERS_ARMS,
              ],
        duration: 30 + i * 5,
        isPublic: true,
      });
    }

    // 홈트 마스터 그룹 관련 게시글 (홈트레이닝)
    for (let i = 0; i < 6; i++) {
      const userIndex = 4 + (i % 3); // 5, 6, 7번 사용자가 '홈트 마스터' 그룹에 있음
      posts.push({
        title: `오늘의 홈트레이닝 ${i + 1}차`,
        content: `집에서 ${
          i % 3 === 0 ? '덤벨로 상체' : i % 3 === 1 ? '맨몸 하체' : '스트레칭'
        } 운동을 했어요. ${20 + i * 10}분 동안 진행했습니다. 홈트도 꾸준히 하면 효과가 있네요!`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?home,workout,${i}`,
        ],
        bodyPart:
          i % 3 === 0
            ? [
                BodyPartEnum.CHEST,
                BodyPartEnum.SHOULDERS_ARMS,
                BodyPartEnum.BACK,
              ]
            : i % 3 === 1
              ? [BodyPartEnum.LEGS, BodyPartEnum.CORE]
              : [BodyPartEnum.OTHER],
        duration: 20 + i * 10,
        isPublic: true,
      });
    }

    // 요가 애호가 그룹 관련 게시글 (요가)
    for (let i = 0; i < 5; i++) {
      const userIndex = 7 + (i % 2); // 8, 9번 사용자가 '요가 애호가' 그룹에 있음
      posts.push({
        title: `오늘의 요가 ${i + 1}차`,
        content: `오늘은 ${
          i % 2 === 0 ? '아쉬탕가' : '하타'
        } 요가를 ${40 + i * 5}분 동안 진행했어요. 마음이 정말 편안해졌습니다. 명상도 함께 했어요.`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [`https://source.unsplash.com/random/300x300?yoga,${i}`],
        bodyPart: [BodyPartEnum.CORE, BodyPartEnum.OTHER],
        duration: 40 + i * 5,
        isPublic: true,
      });
    }

    // 마라톤 러너 그룹 관련 게시글 (달리기)
    for (let i = 0; i < 8; i++) {
      const userIndex = 9 + (i % 4); // 10, 11, 12, 13번 사용자가 '마라톤 러너' 그룹에 있음
      posts.push({
        title: `오늘의 러닝 ${i + 1}차`,
        content: `오늘은 ${
          i % 2 === 0 ? '한강공원' : '동네 공원'
        }에서 ${3 + i * 0.5}km를 뛰었어요. 날씨가 정말 좋았고 페이스는 ${
          5 + i * 0.2
        }분/km 정도 나왔습니다.`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?running,marathon,${i}`,
        ],
        bodyPart: [BodyPartEnum.LEGS, BodyPartEnum.CORE],
        duration: 20 + i * 5,
        isPublic: true,
      });
    }

    // 자전거 라이더 그룹 관련 게시글 (자전거)
    for (let i = 0; i < 6; i++) {
      const userIndex = 13 + (i % 3); // 14, 15, 16번 사용자가 '자전거 라이더' 그룹에 있음
      posts.push({
        title: `자전거 라이딩 ${i + 1}차`,
        content: `오늘은 ${
          i % 3 === 0 ? '한강' : i % 3 === 1 ? '북한산' : '양재천'
        }에서 ${15 + i * 5}km 라이딩했어요. 평균 속도는 ${
          20 + i * 2
        }km/h 정도로 쾌적하게 달렸습니다.`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?cycling,bike,${i}`,
        ],
        bodyPart: [BodyPartEnum.LEGS],
        duration: 45 + i * 10,
        isPublic: true,
      });
    }

    // 수영 마니아 그룹 관련 게시글 (수영)
    for (let i = 0; i < 5; i++) {
      const userIndex = 16 + (i % 3); // 17, 18, 19번 사용자가 '수영 마니아' 그룹에 있음
      posts.push({
        title: `수영 인증 ${i + 1}일차`,
        content: `오늘은 ${
          i % 2 === 0 ? '자유형' : '평영'
        }으로 ${1 + i * 0.5}km를 수영했어요. 물살을 가르는 느낌이 정말 좋네요.`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?swimming,pool,${i}`,
        ],
        bodyPart: [
          BodyPartEnum.SHOULDERS_ARMS,
          BodyPartEnum.CHEST,
          BodyPartEnum.BACK,
        ],
        duration: 40 + i * 5,
        isPublic: true,
      });
    }

    // 클라이밍 챌린저 그룹 관련 게시글 (클라이밍)
    for (let i = 0; i < 5; i++) {
      const userIndex = 19 + (i % 2); // 20, 21번 사용자가 '클라이밍 챌린저' 그룹에 있음
      posts.push({
        title: `클라이밍 도전 ${i + 1}차`,
        content: `오늘은 볼더링장에서 ${(i % 3) + 3}급 난이도에 도전했어요. ${
          i % 2 === 0 ? '성공' : '거의 성공했으나 아쉽게 실패'
        }했습니다. 팔 근육이 많이 발달한 것 같아요.`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?climbing,boulder,${i}`,
        ],
        bodyPart: [BodyPartEnum.SHOULDERS_ARMS, BodyPartEnum.BACK],
        duration: 60 + i * 5,
        isPublic: true,
      });
    }

    // 크로스핏 워리어 그룹 관련 게시글 (크로스핏)
    for (let i = 0; i < 5; i++) {
      const userIndex = 21 + (i % 3); // 22, 23, 24번 사용자가 '크로스핏 워리어' 그룹에 있음
      posts.push({
        title: `오늘의 WOD ${i + 1}차`,
        content: `오늘의 크로스핏 WOD는 ${
          i % 2 === 0 ? '프란' : '매트'
        }이었어요. ${15 + i * 3}분 동안 전신을 불태웠습니다. 너무 힘들었지만 성취감이 대단해요!`,
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://source.unsplash.com/random/300x300?crossfit,wod,${i}`,
        ],
        bodyPart: [
          BodyPartEnum.CHEST,
          BodyPartEnum.BACK,
          BodyPartEnum.LEGS,
          BodyPartEnum.SHOULDERS_ARMS,
          BodyPartEnum.CORE,
        ],
        duration: 60,
        isPublic: true,
      });
    }

    for (const postData of posts) {
      const { bodyPart, duration, ...postFields } = postData;
      const post = postRepository.create(postFields);
      const savedPost = await postRepository.save(post);

      const workoutLog = workoutLogRepository.create({
        userUuid: postData.userUuid,
        bodyPart: bodyPart,
        duration: duration,
        postId: savedPost.id,
      });
      await workoutLogRepository.save(workoutLog);

      this.logger.info(
        `게시글 '${savedPost.title}' 생성 및 운동 로그 추가 완료`,
      );
    }
  }
}
