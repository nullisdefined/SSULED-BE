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
        title: '헬스장 첫 도전! 너무 뿌듯해요 💪',
        content:
          '드디어 용기내서 헬스장에 등록했어요! 오늘 첫날인데 가슴과 등 운동 배우면서 했는데 생각보다 재밌네요. 트레이너님이 친절하게 알려주셔서 다행이었어요. 내일 근육통 올 것 같지만... 꾸준히 다닐 수 있도록 응원해주세요!',
        userUuid: users[0].userUuid,
        imageUrl: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center',
        ],
        bodyPart: [BodyPartEnum.CHEST, BodyPartEnum.BACK],
        duration: 60,
        isPublic: true,
      },
      {
        title: '한강 러닝 메이트 찾아요! 🏃‍♀️',
        content:
          '매주 화, 목, 일요일 아침 7시에 한강공원에서 러닝하고 있어요! 혼자 뛰다보니 약간 심심하고... 페이스 맞춰서 같이 뛸 분 계시면 좋겠어요. 초보자도 환영이고 5-6km 정도 가볍게 뛰는 수준입니다. 운동 후에 커피 한잔도 좋고요 ☕',
        userUuid: users[1].userUuid,
        imageUrl: [
          'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=400&fit=crop&crop=center',
        ],
        bodyPart: [BodyPartEnum.LEGS],
        duration: 45,
        isPublic: true,
      },
      {
        title: '단백질 보충제 추천 부탁드려요!',
        content:
          '운동 시작한지 한 달 정도 됐는데, 이제 단백질 보충제를 먹어볼까 생각중이에요. 너무 종류가 많아서 뭘 선택해야 할지 모르겠네요... 맛도 중요하고 가성비도 고려하고 싶은데, 경험자분들 추천 부탁드려요! 바닐라맛이나 초콜릿맛으로 무난한 걸로요',
        userUuid: users[1].userUuid,
        imageUrl: [
          'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=500&h=400&fit=crop&crop=center',
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
        title: '3개월 다이어트 성공 후기! 🎉',
        content:
          '드디어 목표했던 15kg 감량 성공했어요!! 처음엔 정말 힘들었는데... 운동+식단조절 병행하니까 확실히 효과가 있더라고요. 특히 전신운동이랑 코어운동 꾸준히 한 게 도움됐던 것 같아요. 아직 목표 체중까지는 5kg 더 남았지만 이제 자신감 생겼어요! 포기하지 말고 꾸준히 하시길!',
        userUuid: users[2].userUuid,
        imageUrl: [
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=400&fit=crop&crop=center',
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
        title: '스쿼트 자세 체크 부탁드려요!',
        content:
          '하체운동 시작한지 얼마 안 됐는데, 스쿼트 자세가 맞는지 확신이 안 서네요. 유튜브 보면서 따라하는데 뭔가 어색하고... 혹시 자세 이상한 부분 있으면 조언 부탁드려요! 무릎이 발끝을 넘어가면 안 된다는 건 알겠는데, 다른 주의사항도 있을까요?',
        userUuid: users[3].userUuid,
        imageUrl: [
          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop&crop=center',
        ],
        bodyPart: [BodyPartEnum.LEGS, BodyPartEnum.OTHER],
        duration: 30,
        isPublic: true,
      },
    ];

    // 오운완 그룹 관련 게시글 (가슴, 등, 전신 운동)
    const orunwanTitles = [
      '오운완 인증! 오늘도 완주 🔥',
      '헬스장에서 빡세게 운동 완료!',
      '오운완 챌린지 성공적 👊',
      '땀범벅 운동 끝! 뿌듯해요',
      '오늘의 운동 미션 클리어!',
      '헬스 루틴 완성! 만족스러워요',
      '오운완 인증샷 📸',
      '운동 후 이 기분 최고야!',
      '오늘도 자신과의 약속 지켰어요',
      '헬린이 탈출 중... 화이팅!',
    ];

    const orunwanContents = [
      '오늘은 가슴과 등 위주로 운동했어요. 벤치프레스 개인기록 갱신! 조금씩 늘어가는 중량을 보니 뿌듯하네요',
      '전신운동으로 몸 전체를 자극했어요. 마지막 세트는 정말 힘들었지만 버텨냈어요. 내일 근육통 각오하고...',
      '상체 운동 집중했는데 생각보다 재밌었어요. 특히 풀업 연습하는데 조금씩 늘고 있는 것 같아요!',
      '가슴, 등, 어깨까지 다 때려줬어요. 운동 후 샤워하고 나니 개운함이 장난 아니네요',
      '오늘은 전신 서킷으로 진행했어요. 유산소+근력 조합이라 체지방도 쏙쏙 빠지는 느낌!',
      '백 운동 위주로 했는데 등 펌핑이 장난 아니에요. 광배근이 커지는 게 눈에 보여요',
      '가슴 운동 날! 인클라인, 디클라인까지 다양하게 했어요. 점점 탄탄해지는 가슴이 보여요',
      '오늘 운동량이 꽤 많았는데도 끝까지 해냈어요. 체력이 늘고 있다는 증거겠죠?',
      '전신을 골고루 자극하는 운동 완료! 균형잡힌 몸을 만들기 위해 꾸준히 노력중이에요',
      '상체 중심으로 운동했는데 팔뚝에 알이 배기기 시작했어요. 성취감 대박!',
    ];

    for (let i = 0; i < 10; i++) {
      const userIndex = i % 4;
      posts.push({
        title: orunwanTitles[i],
        content: orunwanContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-${1571019613454 + i}-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center`,
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

    // 홈트 마스터 그룹 관련 게시글
    const homeworkoutTitles = [
      '집에서도 충분히 운동 가능! 홈트 완료',
      '홈트레이닝의 매력을 알아버렸어요',
      '거실이 나만의 헬스장 💪',
      '홈트 30분, 효과 만점!',
      '집콕 운동도 이렇게 재미있을 줄이야',
      '홈트 장비 하나씩 늘려가는 재미',
    ];

    const homeworkoutContents = [
      '덤벨 세트로 상체 운동했어요. 집에서도 이 정도면 충분한 것 같아요. 헬스장 갈 시간 없을 때 정말 유용해요!',
      '맨몸으로 하체운동 집중! 스쿼트, 런지, 플랭크까지 풀코스로 했어요. 생각보다 강도 높더라고요',
      '요가매트 깔고 스트레칭 위주로 진행했어요. 몸이 많이 뻣뻣했는데 한결 부드러워진 느낌이에요',
      '홈트용 밴드 사용해서 상체 운동했어요. 작은 도구인데 운동 강도는 장난 아니네요!',
      '맨몸 운동으로 하체+코어 집중 공략! 집에서도 이렇게 힘든 운동이 가능하다니 놀라워요',
      '홈트도 꾸준히 하니까 확실히 효과가 보여요. 굳이 헬스장 안 가도 될 것 같은데요?',
    ];

    for (let i = 0; i < 6; i++) {
      const userIndex = 4 + (i % 3);
      posts.push({
        title: homeworkoutTitles[i],
        content: homeworkoutContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=500&h=400&fit=crop&crop=center`,
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

    // 요가 애호가 그룹 관련 게시글
    const yogaTitles = [
      '오늘의 요가 타임 🧘‍♀️ 마음이 평온해져요',
      '아쉬탕가 요가로 몸과 마음 정화',
      '하타요가 75분 완주! 집중력 UP',
      '요가 후 명상까지, 완벽한 하루',
      '유연성이 조금씩 늘고 있어요!',
    ];

    const yogaContents = [
      '아쉬탕가 요가 시퀀스 따라했는데 정말 시원해요. 특히 다운독에서 몸이 쭉 펴지는 느낌이 좋았어요',
      '하타요가로 천천히 몸을 이완시켰어요. 스트레스가 많았는데 요가 후에는 마음이 차분해지네요',
      '빈야사 플로우로 진행했는데 은근히 운동량이 많더라고요. 요가도 충분히 운동이 되는 것 같아요',
      '요가 마지막에 시바사나(시체자세)로 명상했어요. 10분 동안 완전히 비워내니까 개운해요',
      '백벤드 자세들을 연습했는데 유연성이 조금씩 늘고 있는 게 보여요. 꾸준함의 힘을 느껴요!',
    ];

    for (let i = 0; i < 5; i++) {
      const userIndex = 7 + (i % 2);
      posts.push({
        title: yogaTitles[i],
        content: yogaContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1506629905607-5b9e3e4d8d9f?w=500&h=400&fit=crop&crop=center`,
        ],
        bodyPart: [BodyPartEnum.CORE, BodyPartEnum.OTHER],
        duration: 40 + i * 5,
        isPublic: true,
      });
    }

    // 마라톤 러너 그룹 관련 게시글
    const runningTitles = [
      '한강 러닝 완주! 오늘 컨디션 굿 👍',
      '새벽 러닝의 매력에 빠졌어요',
      '개인 기록 갱신! 점점 빨라지고 있어요',
      '동네 한 바퀴 가볍게 뛰어왔어요',
      '러닝 후 스트레칭까지 완벽!',
      '오늘은 페이스 조절 연습했어요',
      '바람이 시원해서 러닝하기 딱 좋았어요',
      '러닝 메이트와 함께 완주!',
    ];

    const runningContents = [
      '한강공원 5km 코스 완주했어요! 오늘 컨디션이 좋아서 평소보다 페이스가 좋았어요. 날씨도 딱 좋고!',
      '동네 공원에서 3km 가볍게 뛰었어요. 아침 공기가 정말 맑아서 기분 좋은 러닝이었어요',
      '오늘은 7km 도전했는데 성공! 개인 기록도 경신했어요. 꾸준히 하니까 체력이 늘어나네요',
      '페이스 유지 연습하면서 4km 뛰었어요. 일정한 속도로 뛰는 게 생각보다 어렵더라고요',
      '한강에서 6km 완주 후 스트레칭까지! 러닝 후 정리운동이 정말 중요한 것 같아요',
      '오늘은 속도보다는 거리에 집중해서 8km 뛰었어요. 마라톤 완주가 목표라서 차근차근!',
      '바람이 시원해서 러닝하기 딱 좋은 날씨였어요. 5km인데도 힘들지 않게 뛸 수 있었어요',
      '러닝 친구와 함께 뛰니까 더 재미있네요. 서로 격려하면서 6km 완주했어요!',
    ];

    for (let i = 0; i < 8; i++) {
      const userIndex = 9 + (i % 4);
      posts.push({
        title: runningTitles[i],
        content: runningContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=400&fit=crop&crop=center`,
        ],
        bodyPart: [BodyPartEnum.LEGS, BodyPartEnum.CORE],
        duration: 20 + i * 5,
        isPublic: true,
      });
    }

    // 자전거 라이더 그룹 관련 게시글
    const cyclingTitles = [
      '한강 자전거길 라이딩 완주! 🚴‍♂️',
      '북한산 둘레길 라이딩 도전',
      '양재천 따라 여유로운 라이딩',
      '자전거로 출퇴근 시작했어요',
      '주말 라이딩으로 스트레스 해소!',
      '새 자전거와 첫 라이딩!',
    ];

    const cyclingContents = [
      '한강 자전거길 20km 완주했어요! 중간에 휴게소에서 잠깐 쉬면서 한강 뷰도 감상하고 좋았어요',
      '북한산 둘레길은 경사가 있어서 좀 힘들었지만 성취감이 대단해요. 다리 근육 제대로 썼네요',
      '양재천 자전거길 따라 천천히 라이딩했어요. 여유롭게 페달링하니까 힐링이 되더라고요',
      '요즘 자전거로 출퇴근하고 있어요. 대중교통보다 빠르고 운동도 되고 일석이조!',
      '스트레스 받을 때마다 자전거 타러 나가요. 바람 맞으며 페달 밟으니까 머리가 맑아져요',
      '새 로드바이크 구매 기념 라이딩! 기어 변속이 부드러워서 라이딩이 훨씬 편해졌어요',
    ];

    for (let i = 0; i < 6; i++) {
      const userIndex = 13 + (i % 3);
      posts.push({
        title: cyclingTitles[i],
        content: cyclingContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center`,
        ],
        bodyPart: [BodyPartEnum.LEGS],
        duration: 45 + i * 10,
        isPublic: true,
      });
    }

    // 수영 마니아 그룹 관련 게시글
    const swimmingTitles = [
      '수영장에서 자유형 연습! 🏊‍♀️',
      '평영으로 천천히 거리 늘려가는 중',
      '오늘은 접영 도전해봤어요',
      '수영 후 몸이 정말 개운해요',
      '새벽 수영의 매력에 빠졌어요!',
    ];

    const swimmingContents = [
      '자유형으로 1km 완영했어요! 호흡 타이밍 연습 많이 했는데 조금씩 늘고 있어요',
      '평영이 편해서 거리 위주로 수영했어요. 물 속에서 느끼는 저항감이 근력운동 같아요',
      '접영 10m도 힘든데 오늘은 25m 완주 성공! 코어 근육이 정말 많이 쓰이네요',
      '배영으로 여유롭게 수영했어요. 천장 보면서 수영하니까 명상하는 기분이에요',
      '새벽 수영 시작했는데 하루 컨디션이 확실히 달라요. 온몸 근육을 다 쓰는 느낌!',
    ];

    for (let i = 0; i < 5; i++) {
      const userIndex = 16 + (i % 3);
      posts.push({
        title: swimmingTitles[i],
        content: swimmingContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=400&fit=crop&crop=center`,
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

    // 클라이밍 챌린저 그룹 관련 게시글
    const climbingTitles = [
      '볼더링 4급 루트 클리어! 🧗‍♂️',
      '오늘은 5급 도전했다가 아쉽게...',
      '새 클라이밍화 신고 첫 등반!',
      '팔 근육 한계 테스트 완료',
      '클라이밍 후 스트레칭은 필수!',
    ];

    const climbingContents = [
      '드디어 4급 루트 클리어했어요! 한 달 동안 시도했던 루트인데 성공하니까 쾌감이 장난 아니네요',
      '5급 루트 도전했는데 마지막 홀드에서 떨어졌어요. 아쉽지만 다음에 다시 도전!',
      '새 클라이밍화가 발에 딱 맞아서 그립감이 훨씬 좋아졌어요. 발 놓임이 더 정확해진 느낌',
      '오늘은 오버행 루트 위주로 도전했어요. 팔 근육 한계까지 밀어붙였는데 정말 힘들더라고요',
      '클라이밍 후에는 어깨랑 팔 스트레칭이 정말 중요해요. 안 그러면 다음날 너무 아파요!',
    ];

    for (let i = 0; i < 5; i++) {
      const userIndex = 19 + (i % 2);
      posts.push({
        title: climbingTitles[i],
        content: climbingContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=400&fit=crop&crop=center`,
        ],
        bodyPart: [BodyPartEnum.SHOULDERS_ARMS, BodyPartEnum.BACK],
        duration: 60 + i * 5,
        isPublic: true,
      });
    }

    // 크로스핏 워리어 그룹 관련 게시글
    const crossfitTitles = [
      '오늘의 WOD 완주! 죽을 뻔 했어요 💀',
      '크로스핏 한 달 후기',
      '버피 100개... 지옥훈련 완료',
      'AMRAP 도전! 기록 경신했어요',
      '크로스핏 박스 첫 등장!',
    ];

    const crossfitContents = [
      '오늘 WOD는 프란(21-15-9 스러스터+풀업)이었어요. 15분 걸렸는데 마지막에 정말 죽을 뻔 했어요',
      '크로스핏 시작한지 한 달됐는데 체력이 확연히 늘었어요. 일상생활이 훨씬 가벼워진 느낌!',
      '버피 100개 도전했는데... 50개 넘어가니까 정말 지옥이더라고요. 그래도 완주했어요!',
      'AMRAP 15분 도전에서 개인 기록 경신! 라운드 수가 늘어가는 걸 보니까 성장이 보여요',
      '처음 크로스핏 박스 가서 기초 동작 배웠어요. 동작 하나하나가 다 어렵네요...',
    ];

    for (let i = 0; i < 5; i++) {
      const userIndex = 21 + (i % 3);
      posts.push({
        title: crossfitTitles[i],
        content: crossfitContents[i],
        userUuid: users[userIndex].userUuid,
        imageUrl: [
          `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop&crop=center`,
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
