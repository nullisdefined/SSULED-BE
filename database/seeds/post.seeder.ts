/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { Group } from '@/entities/group.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';

export class PostSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);
    const groupRepository = dataSource.getRepository(Group);

    const users = await userRepository.find();
    const groups = await groupRepository.find();

    if (users.length === 0) {
      this.logger.warn('사용자가 없습니다. 게시글 생성을 건너뜁니다.');
      return;
    }

    // =========== 홈트 ===========
    const homeTrainingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://plus.unsplash.com/premium_photo-1671028547976-4b1e3300a350?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1734873477108-6837b02f2b9d?q=80&w=3468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664300607508-f8fce5d434b4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664476325264-f1dab37eaa7a?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const homeTrainingTitles: string[] = [
      '홈트레이닝 30일 도전 시작!',
      '오늘의 홈트 완료!',
      '집에서 하는 전신운동',
      '홈트로 체력 기르기',
      '홈트 인증샷 공유',
    ];
    const homeTrainingContents: string[] = [
      '홈트레이닝 30일 도전을 시작했습니다. 집에서도 충분히 좋은 운동이 가능하다는 걸 보여드릴게요!',
      '오늘 집에서 홈트로 땀을 쫙 뺐어요. 내일도 화이팅!',
      '간단한 동작으로도 충분히 운동 효과를 볼 수 있네요.',
      '홈트로 체력이 점점 좋아지는 게 느껴집니다.',
      '매일 꾸준히 홈트하는 습관을 들이고 있어요.',
    ];

    // =========== 웨이트 ===========
    const weightTrainingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&h=600&fit=crop',
    ];
    const weightTrainingTitles: string[] = [
      '처음 헬스장 등록했습니다 !',
      '웨이트 트레이닝 루틴 추천받아요',
      '랫풀다운 해보는데 운동자세 이거 맞아요?',
      'ㅇㅇㅇ',
      '오운완',
    ];
    const weightTrainingContents: string[] = [
      '새로 생긴 헬스장이라 그런지 깔꼼하네요 한 번 열심히 해보겠습니다. 🔥',
      '오늘은 하체 위주로 웨이트를 했습니다. 다들 어떤식으로 운동 루틴을 짜시나요?',
      '헬스 고수분들 도와주세요 ㅠㅠ',
      '그립 새로 샀는데 참 좋네요. 역시 운동은 장비빨!',
      '매일 턱걸이 하고 있는데 오늘따라 잘 안되네요.. 그래도 오늘 운동 인증했습니다.',
    ];

    // =========== 요가 ===========
    const yogaImageUrls: string[] = [
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=3667&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=3852&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const yogaTitles: string[] = [
      '드디어....!!!!!!!!!!',
      '하늘을 보자',
      '아침 요가 (feat.등산)',
      '자세 어떤가요?',
      '해수욕장에서 요가',
    ];
    const yogaContents: string[] = [
      '드디어 손과 발이 만났습니다. 레전드 기록 달성 축하좀요',
      '역시 사람은 하늘을 보고 살아야하나봐요. 오랜만에 야외에서 요가하니까 참 기분이가 좋네요.',
      '조금 위험해보이지만 저는 스릴을 즐겨요. 한 번씩 이렇게 정상에서 해보는 것도 좋은 것 같아요. 어때요?',
      '오늘 이 자세 했다가 뼈소리가 뚜두둑 났습니다. 기분 좋네요.',
      '파도소리 들으면서 힐링했어요 ㅎㅎ',
    ];

    // =========== 러닝 ===========
    const runningImageUrls: string[] = [
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1712634047253-e292abdff553?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const runningTitles: string[] = [
      '새벽 러닝 인증샷 🏃‍♂️',
      '러닝으로 상쾌한 하루',
    ];
    const runningContents: string[] = [
      '새벽 6시 한강 러닝 완료! 맑은 공기와 함께 하루를 상쾌하게 시작했어요. 🌅',
      '러닝으로 스트레스를 날려버렸습니다.',
    ];

    // =========== 크로스핏 ===========
    const crossfitImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1661576743827-7f4dc8713fd8?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=3850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664109999840-3f7e97489e53?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1639504031765-ca21aecb7252?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1632758243488-7e6f9173cfa1?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const crossfitTitles: string[] = [
      '크로스핏 첫 수업 후기',
      '크로스핏 WOD 도전',
      '크로스핏으로 전신운동',
      '크로스핏 박스 방문기',
      '크로스핏 팀워크 훈련',
    ];
    const crossfitContents: string[] = [
      '크로스핏 첫 수업을 들었는데 정말 힘들지만 전신 운동 효과가 대단하네요!',
      '오늘의 WOD(Workout of the Day)에 도전했습니다. 땀이 비 오듯!',
      '크로스핏으로 전신운동을 하니 몸이 개운해졌어요.',
      '새로운 크로스핏 박스를 방문해봤습니다. 분위기가 정말 좋네요.',
      '팀원들과 함께하는 크로스핏 훈련이 정말 재밌었습니다.',
    ];

    // =========== 배드민턴 ===========
    const badmintonImageUrls: string[] = [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664304753883-923c28de6b85?q=80&w=3601&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1720515226352-b0b1dec6813b?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1687597778602-624a9438fe0b?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664303134673-7a073bf3fb54?q=80&w=3691&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const badmintonTitles: string[] = [
      '배드민턴 대회 준비중',
      '배드민턴 연습 후기',
      '배드민턴 동호회 모임',
      '배드민턴 라켓 추천',
      '오늘의 배드민턴 경기',
    ];
    const badmintonContents: string[] = [
      '배드민턴 대회를 준비하며 매일 연습하고 있어요. 열심히 해서 좋은 결과 얻고 싶습니다!',
      '오늘 배드민턴 연습에서 스매시가 잘 들어갔어요.',
      '동호회 모임에서 다양한 사람들과 배드민턴을 쳤습니다.',
      '새로운 라켓을 샀는데 정말 가볍고 좋아요.',
      '오늘 경기에서 아쉽게 졌지만 다음엔 꼭 이기고 싶어요.',
    ];

    // =========== 테니스 ===========
    const tennisImageUrls: string[] = [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1545151414-8a948e1ea54f?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?q=80&w=3928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1530915534664-4ac6423816b7?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const tennisTitles: string[] = [
      '테니스 동호회 모임',
      '테니스 레슨 후기',
      '테니스 라켓 추천',
      '테니스 경기 관람기',
      '테니스 연습 일지',
    ];
    const tennisContents: string[] = [
      '테니스 동호회 정기 모임에 참석했습니다. 실력도 늘고 좋은 사람들도 만나고!',
      '오늘 테니스 레슨에서 백핸드를 배웠어요.',
      '새로 산 라켓이 정말 가볍고 좋아요.',
      '프로 테니스 경기를 직접 관람하고 왔습니다.',
      '매일 연습하며 실력이 조금씩 늘고 있습니다.',
    ];

    // =========== 다이어트 ===========
    const dietImageUrls: string[] = [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
      'https://plus.unsplash.com/premium_photo-1663852296872-51c74244d487?q=80&w=3963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1587996597484-04743eeb56b4?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1561320637-607b6b19f493?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const dietTitles: string[] = [
      '다이어트 식단 공유',
      '다이어트 레시피 추천',
      '다이어트 중 힘들 때',
      '식단 진짜 너무 어렵네요',
    ];
    const dietContents: string[] = [
      '다이어트 중인 분들을 위한 건강한 식단을 공유합니다. 맛있으면서도 영양가 높은 메뉴들이에요.',
      '다이어트에 좋은 레시피를 추천합니다.',
      '다이어트 중 힘들 때는 가벼운 산책이 도움이 돼요..',
      '입맛없을때가 제일 힘든거같아요..... 하',
    ];

    // =========== 운동복 코디 ===========
    const outfitImageUrls: string[] = [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593419528756-3cdfa1615b86?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1540254597053-3901b858d40f?q=80&w=3308&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const outfitTitles: string[] = [
      '운동복 코디 추천',
      '운동복 쇼핑 후기',
      '운동복 브랜드 비교',
    ];
    const outfitContents: string[] = [
      '운동할 때 입기 좋은 운동복 코디를 추천합니다. 기능성과 스타일을 모두 잡았어요!',
      '새로 산 운동복이 정말 편하고 예뻐요.',
      '어떤 브랜드가 좋나요? 저는 져지가 너무 편해서 이것만 입었는데.. 다른 것도 한번 사보려구요',
    ];

    // =========== 프로틴 ===========
    const proteinImageUrls: string[] = [
      'https://images.unsplash.com/photo-1693996045300-521e9d08cabc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://img.cjthemarket.com/images/file/product/490/20240411103339994.PNG?SF=webp&RS=550x550',
      'https://img.danawa.com/prod_img/500000/503/186/img/18186503_1.jpg?shrink=330:*&_v=20230706102541',
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyNAxs%2FbtsBfaNnLEe%2FZAb3MS80BTKHz4iEcGGfb0%2Fimg.png',
      'https://d1cnx04b8cgzcv.cloudfront.net/media/products/products/4c368457b8934a07a35c0989ce82b268.jpg?width=720&quality=95',
      'https://asset.m-gs.kr/prod/1020075140/1/550',
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/491/6efb08ef03644b5b9015e88622b98c20_res.jpeg',
    ];
    const proteinTitles: string[] = [
      '프로틴 맛 리뷰',
      '프로틴 추천 부탁해요',
      '프로틴 섭취 방법',
      '프로틴 효과 후기',
      '미친 코코밥 저당 나옴',
      '단백질바 이게 짱이에요',
      '편의점에서 파는 단백질 음료',
    ];
    const proteinContents: string[] = [
      '새로 산 프로틴의 맛을 리뷰해봅니다. 이 맛은 정말 추천하고 싶어요!',
      '여러분이 추천하는 프로틴이 궁금해요.',
      '프로틴을 효과적으로 섭취하는 방법을 공유합니다.',
      '프로틴을 꾸준히 먹으니 근육이 잘 붙는 것 같아요.',
      '코코밥 진짜 존맛인데 항상 당이 많아서 꺼렸는데 이번에 저당버전 나왔어요!! 다들 꼭 먹어보시길!',
      '닥터유꺼 이 단백질바가 24g이나 들어있고 진짜 맛있어요!!!',
      '더단백 초코맛이 진짜 초코음료처럼 완전 맛있어요!!',
    ];

    // =========== 수영 ===========
    const swimmingImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1701030722617-25087a8fe287?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://sitem.ssgcdn.com/98/07/12/item/1000575120798_i1_1200.jpg',
      'https://plus.unsplash.com/premium_photo-1701030722594-2b8d0e5e356f?q=80&w=3235&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://cdn.news.hidoc.co.kr/news/photo/201905/19279_45881_0658.jpg',
      'https://www.esongpa.or.kr/common/image/facility/facility1_1.jpg',
      'https://images.unsplash.com/photo-1678543792429-1d035ab8422b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const swimmingTitles: string[] = [
      '오수완',
      '드디어 오리발 시작..!',
      '오늘도 수영!!',
      '수영으로 다이어트 성공!',
      '송파구체육문화회관 수영장 추천',
      '멍멍이와 함께 수영~',
    ];
    const swimmingContents: string[] = [
      '오늘 수영 완료했습니다! 수영장까지 가는게 힘들지만 수영 끝나면 진짜 뿌듯ㅎㅎ',
      '이제 오리발 들어가서 오리발 하나 장만했습니다ㅎㅎ 수영은 할수록 재밌네요',
      '오늘부터 배영들어갔습니다. 저의 성장기 많이 봐주세요',
      '6달 동안 수영으로 운동하니 자연스럽게 8kg나 빠졌습니다. 다들 꾸준히 수영해보세요!!',
      '송파구 체육문화회관 수영장 좋네요. 가격도 저렴하니 다들 한 번 가보세요!',
      '오늘은 저희 집 멍멍이와 함께 수영을 해봤씁니다~ 같이 수영하니 더 재밌네요 ',
    ];

    // =========== 필라테스 ===========
    const pilatesImageUrls: string[] = [
      'https://images.unsplash.com/photo-1717500252573-d31d4bf5ddf1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1717500250901-9f4c8bd96a9d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://www.harpersbazaar.co.kr/resources_old/online/org_online_image/d237a7cc-2417-4540-8965-cd9d34f757a9.jpg',
      'https://plus.unsplash.com/premium_photo-1671028547976-4b1e3300a350?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1674675646706-8468e673b74a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const pilatesTitles: string[] = [
      '첫 필라테스 수업 후기',
      '오늘 운동 완료!',
      '남자한테도 필라테스는 진짜 좋으네요..',
      '소도구 필라테스',
      '오늘은 집에서 필라테스',
    ];
    const pilatesContents: string[] = [
      '오늘 처음 필라테스를 가봤습니다. 사실 볼때는 그렇게 안 힘들어보렸는데 저 동작하면서 팔이 후들후들 거려서… 죽는줄 알았어요..',
      '오늘 필라테스 새로운 동작 나갔는데 너무 힘들어서 쓰러질뻔했어요..그래도 하고나면 진짜 몸은 개운합니다 굳굳',
      '그룹 수업에 저만 남자이지만..그래도 다들 잘해주셔서 좋으네요..여기 선생님이 그룹이어도 한 명씩 꼼꼼하게 잘 봐주시네요!',
      '오늘은 색다르게 소도구를 이용한 수업을 해보았습니다! 작은거로 풀어주니까 더 시원한 느낌이네요',
      '오늘 필라테스에 갔어야했는데 시간을 놓쳐서,,집에서 영상 보면서 필라테스 해봅니당 그래도 확실히 가서해야 시원한 느낌이 있어요..',
    ];

    // =========== 바디프로필 ===========
    const bodyProfileImageUrls: string[] = [
      'https://m.asiailbo.co.kr/data/2023/21080200/20230808_131142_a6e3014.jpg',
      'https://plus.unsplash.com/premium_photo-1671632777292-7f28e9c97b47?q=80&w=3158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1637651684506-07e16fcf7b06?q=80&w=3974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1675964349915-4a915535060c?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664475922946-d01445240652?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const bodyProfileTitles: string[] = [
      '제 롤모델은 조유리입니다.',
      '바디프로필 준비 하고 있습니다.',
      '바디프로필 촬영 후기',
      '바디프로필 식단',
      '바디프로필 운동 루틴',
    ];
    const bodyProfileContents: string[] = [
      '조유리처럼 예쁜 몸매를 가지고 싶어요!',
      '바디프로필을 위해 식단과 운동을 병행 중입니다... 힘든 과정이겠지만 결과가 좋았으면 좋겠어요 🥹',
      '드디어 바디프로필 촬영을 마쳤습니다!',
      '바디프로필을 위한 식단을 공유합니다.',
      '바디프로필 준비를 위한 운동 루틴을 음 3분할로 생각하고 있는데 하루에 운동할 수 있는 시간은 한시간 정도에요. 어떻게 하는걸 추천하시나요 다들..??',
    ];

    // =========== 스트레칭 ===========
    const stretchingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1607914660217-754fdd90041d?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1682434735853-4c385a795f87?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661371807020-89384e58a49e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1597460605033-6b2302cd79d8?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const stretchingTitles: string[] = [
      '운동 전후 스트레칭',
      '나이가 좀 있으면 여전히 스트레칭은 필수에요',
      '아침 스트레칭',
      '다들 어떤 스트레칭 하시나요?',
    ];
    const stretchingContents: string[] = [
      '운동 전후 스트레칭을 꼭 해줘야해요! 부상 예방에 꼭 필요해요. 한 번 다쳐봐서... 그 이후로는 꾸준하게 하고 있어요 ㅎ',
      '다들 꼭 스트레칭 하고 삽시다. 특히 요즘 거북목과 라운드숄더 예방에 스트레칭은 필수랍니다',
      '아침에 스트레칭을 하면 하루가 상쾌해져요.',
      '저는 아직 그냥 맨몸 스트레칭만 하고 있는데 추천해주실만한 좋은 물건이 있을까요???',
    ];

    // =========== 라이딩 ===========
    const ridingImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1685207267343-1c8852b45575?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661964220280-d640498f9556?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1632050592122-6b730e1ac63f?q=80&w=1843&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683442814148-78aa260ac18e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598371391798-5a4a7e8b1393?q=80&w=3221&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const ridingTitles: string[] = [
      '한강 라이딩 코스 추천받아요',
      '라이딩 장비 리뷰',
      '라이딩 후기',
      '강아지 산책 꿀팁 공유',
      '라이딩 코스 탐방',
    ];
    const ridingContents: string[] = [
      '좋은 코스 있을까요?',
      '새로 산 라이딩 장비가 정말 마음에 들어요.',
      '라이딩 동호회 말고 오늘은 혼자서 라이딩 해봤어요.',
      '강아지 산책에는 역시 자전거가 제일 ㅋㅋ',
      '새로운 라이딩 코스를 탐방했습니다.',
    ];

    // =========== 클라이밍 ===========
    const climbingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1601224748193-d24f166b5c77?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1683009427041-d810728a7cb6?q=80&w=3623&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380296123-cc7b39d70827?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380297191-dcb78d5712ee?q=80&w=3930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1520156557489-31c63271fcd4?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const climbingTitles: string[] = [
      '클라이밍 첫 도전기',
      '클라이밍 실력 향상',
      '클라이밍 장비 리뷰',
      '오클완 ㅋㅋ',
      '실내 클라이밍장에 다녀왔어요',
    ];
    const climbingContents: string[] = [
      '클라이밍에 첫 도전했는데 생각보다 어렵네요. 하지만 정말 재미있고 성취감이 큽니다!',
      '클라이밍 실력이 점점 늘고 있어요.',
      '새로 산 클라이밍 장비가 정말 마음에 듭니다.',
      '오늘도 클라이밍 완료',
      '확실히 클라이밍하고 나면 온몸이 아파요.. 내일은 쉬어야겠습니다 ㅠ',
    ];

    // =========== 트레드밀 ===========
    const treadmilImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1683134587354-453eea03e1a5?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1638183395699-2c0db5b6afbb?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661595192663-71f7c5ae1b13?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1648995361141-30676a75fd27?q=80&w=3988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    const treadmilTitles: string[] = [
      '트레드밀 러닝 후기',
      '트레드밀 운동 루틴',
      '트레드밀 기록 갱신',
      '트레드밀 기록 개개개갱신',
    ];
    const treadmilContents: string[] = [
      '트레드밀에서 러닝을 하니 날씨에 상관없이 운동할 수 있어 좋아요.',
      '제가 하는 트레드밀 운동 루틴을 공유합니다.',
      '트레드밀에서 최고 속도 기록을 갱신했습니다!',
      '시속 14로 1시간 뛰었어요 ㅋㅋ',
    ];

    // =========== 모든 카테고리 통합 ===========
    const allCategories = [
      {
        images: homeTrainingImageUrls,
        titles: homeTrainingTitles,
        contents: homeTrainingContents,
      },
      {
        images: weightTrainingImageUrls,
        titles: weightTrainingTitles,
        contents: weightTrainingContents,
      },
      { images: yogaImageUrls, titles: yogaTitles, contents: yogaContents },
      {
        images: runningImageUrls,
        titles: runningTitles,
        contents: runningContents,
      },
      {
        images: crossfitImageUrls,
        titles: crossfitTitles,
        contents: crossfitContents,
      },
      {
        images: badmintonImageUrls,
        titles: badmintonTitles,
        contents: badmintonContents,
      },
      {
        images: tennisImageUrls,
        titles: tennisTitles,
        contents: tennisContents,
      },
      { images: dietImageUrls, titles: dietTitles, contents: dietContents },
      {
        images: outfitImageUrls,
        titles: outfitTitles,
        contents: outfitContents,
      },
      {
        images: proteinImageUrls,
        titles: proteinTitles,
        contents: proteinContents,
      },
      {
        images: swimmingImageUrls,
        titles: swimmingTitles,
        contents: swimmingContents,
      },
      {
        images: pilatesImageUrls,
        titles: pilatesTitles,
        contents: pilatesContents,
      },
      {
        images: bodyProfileImageUrls,
        titles: bodyProfileTitles,
        contents: bodyProfileContents,
      },
      {
        images: stretchingImageUrls,
        titles: stretchingTitles,
        contents: stretchingContents,
      },
      {
        images: ridingImageUrls,
        titles: ridingTitles,
        contents: ridingContents,
      },
      {
        images: climbingImageUrls,
        titles: climbingTitles,
        contents: climbingContents,
      },
      {
        images: treadmilImageUrls,
        titles: treadmilTitles,
        contents: treadmilContents,
      },
    ];

    // 그룹 제목과 카테고리 매핑
    const groupCategoryMapping = {
      '💪 오운완 인증단': [0, 1], // 홈트, 웨이트
      '🏠 홈트레이닝 마스터': [0], // 홈트
      '🔥 벤치프레스 100kg 클럽': [1], // 웨이트
      '🏃‍♂️ 한강 러닝 크루': [3], // 러닝
      '🚴‍♀️ 자전거 라이딩 동호회': [14], // 라이딩
      '🏃‍♀️ 새벽 러닝 모임': [3], // 러닝
      '🧘‍♀️ 요가 힐링 클래스': [2], // 요가
      '🤸‍♀️ 필라테스 코어 강화': [11], // 필라테스
      '🏊‍♂️ 수영 마스터즈': [10], // 수영
      '🧗‍♂️ 클라이밍 챌린저스': [15], // 클라이밍
      '🔥 크로스핏 워리어즈': [4], // 크로스핏
      '⚖️ 다이어트 성공 프로젝트': [7], // 다이어트
      '📸 바디프로필 도전단': [12], // 바디프로필
      '🎾 테니스 동호회': [6], // 테니스
      '🏸 배드민턴 클럽': [5], // 배드민턴
      '👊 복싱 트레이닝 클럽': [1], // 웨이트 (복싱은 웨이트 훈련과 유사)
      '💼 직장인 새벽 운동단': [0, 1, 3, 16], // 홈트, 웨이트, 러닝, 트레드밀
      '🌅 주말 운동 모임': [0, 1, 2, 3], // 홈트, 웨이트, 요가, 러닝
      '🔰 운동 초보자 도움반': [0, 1, 13], // 홈트, 웨이트, 스트레칭
      '🌟 운동 마니아 클럽': [1, 4, 8, 9], // 웨이트, 크로스핏, 운동복, 프로틴
    };

    // 그룹 title => group 객체 매핑
    const groupTitleMap: { [title: string]: Group } = {};
    groups.forEach((g) => {
      groupTitleMap[g.title] = g;
    });

    // 모든 카테고리의 모든 데이터를 사용하여 게시글 생성
    const posts = [];

    // 각 카테고리의 모든 데이터를 순회하며 게시글 생성
    allCategories.forEach((category, categoryIndex) => {
      // 이 카테고리를 담당하는 그룹들 찾기
      const relevantGroupTitles = Object.entries(groupCategoryMapping)
        .filter(([_, categoryIndices]) =>
          categoryIndices.includes(categoryIndex),
        )
        .map(([groupTitle]) => groupTitle);

      // 각 그룹별로
      relevantGroupTitles.forEach((groupTitle) => {
        const group = groupTitleMap[groupTitle];
        if (
          !group ||
          !Array.isArray(group.memberUuid) ||
          group.memberUuid.length === 0
        )
          return;

        // 그룹 내 첫 번째 멤버만 대표 작성자로 선택
        const memberUuid = group.memberUuid[0];

        // 각 게시글 데이터별로
        for (let i = 0; i < category.titles.length; i++) {
          // 생성 날짜를 최근 30일 내로 랜덤 설정
          const randomDate = new Date();
          randomDate.setDate(
            randomDate.getDate() - Math.floor(Math.random() * 30),
          );

          // 해당 카테고리에서 이미지 1-3개 선택
          const imageCount = Math.floor(Math.random() * 3) + 1;
          const selectedImages: string[] = [];
          const shuffledImages = [...category.images].sort(
            () => Math.random() - 0.5,
          );
          for (
            let j = 0;
            j < Math.min(imageCount, shuffledImages.length);
            j++
          ) {
            selectedImages.push(shuffledImages[j]);
          }

          posts.push({
            title: category.titles[i],
            userUuid: memberUuid,
            content: category.contents[i],
            imageUrl: selectedImages,
            isPublic: Math.random() > 0.1, // 90% 확률로 공개 글
            createdAt: randomDate,
            updatedAt: randomDate,
            groupTitle: groupTitle,
          });
        }
      });
    });

    // 날짜순으로 정렬 (최신순)
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    for (const postData of posts) {
      try {
        // 명시적으로 타입 캐스팅을 통해 Post 타입임을 알려줍니다
        const post = (await postRepository.save(
          postRepository.create(postData),
        )) as unknown as Post;
        // 저장된 후에는 post가 단일 객체이므로 속성에 안전하게 접근할 수 있습니다
        if (post) {
          this.logger.info(
            `게시글 '${post.title}' 생성 완료 (작성자: ${post.userUuid?.slice(-8) || 'unknown'}, 그룹: ${postData.groupTitle}, 이미지: ${Array.isArray(post.imageUrl) ? post.imageUrl.length : 0}개)`,
          );
        }
      } catch (error) {
        this.logger.error(`게시글 저장 중 오류 발생: ${error.message}`);
      }
    }

    this.logger.info(`총 ${posts.length}개의 게시글이 생성되었습니다.`);
  }
}
