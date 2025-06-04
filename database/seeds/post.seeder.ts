/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Post } from '@/entities/post.entity';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';

export class PostSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find();

    if (users.length === 0) {
      this.logger.warn('사용자가 없습니다. 게시글 생성을 건너뜁니다.');
      return;
    }

    // 홈트
    const homeTrainingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'https://plus.unsplash.com/premium_photo-1671028547976-4b1e3300a350?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1734873477108-6837b02f2b9d?q=80&w=3468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664300607508-f8fce5d434b4?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664476325264-f1dab37eaa7a?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1663047360391-a1d202166c35?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1663047396241-457fb012f844?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664300784151-403f14bd7855?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1682094610040-bae7f6b4d4d9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1717500252780-036bfd89f810?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 웨이트
    const weightTrainingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 요가
    const yogaImageUrls: string[] = [
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    ];

    // 러닝
    const runningImageUrls: string[] = [
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600&fit=crop',
    ];

    // 크로스핏
    const crossfitImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1661576743827-7f4dc8713fd8?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=3850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1639511205270-2b1ce5b112c6?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664109999840-3f7e97489e53?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1639504031765-ca21aecb7252?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1632758243488-7e6f9173cfa1?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1639511205228-3ade2b48ae8a?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664109999449-82f58d6f7cf1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 배드민턴
    const badmintonImageUrls: string[] = [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664304753883-923c28de6b85?q=80&w=3601&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 테니스
    const tennisImageUrls: string[] = [
      // 테니스 관련 이미지 없음
    ];

    // 다이어트
    const dietImageUrls: string[] = [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    ];

    // 운동복 코디
    const outfitImageUrls: string[] = [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&h=600&fit=crop',
    ];

    // 프로틴
    const proteinImageUrls: string[] = [
      'https://images.unsplash.com/photo-1693996045300-521e9d08cabc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://img.cjthemarket.com/images/file/product/490/20240411103339994.PNG?SF=webp&RS=550x550',
      'https://img.danawa.com/prod_img/500000/503/186/img/18186503_1.jpg?shrink=330:*&_v=20230706102541',
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyNAxs%2FbtsBfaNnLEe%2FZAb3MS80BTKHz4iEcGGfb0%2Fimg.png',
    ];

    // 수영
    const swimmingImageUrls: string[] = [
      // 수영 관련 이미지 없음
    ];

    // 필라테스
    const pilatesImageUrls: string[] = [
      // 필라테스 관련 이미지 없음
    ];

    // 바디프로필
    const bodyProfileImageUrls: string[] = [
      'https://m.asiailbo.co.kr/data/2023/21080200/20230808_131142_a6e3014.jpg',
    ];

    // 스트레칭
    const stretchingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1607914660217-754fdd90041d?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1682434735853-4c385a795f87?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1682434735853-4c385a795f87?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661371807020-89384e58a49e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661371807020-89384e58a49e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1597460605033-6b2302cd79d8?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1599447292180-45fd84092ef0?q=80&w=3690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1599447292180-45fd84092ef0?q=80&w=3690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 라이딩
    const ridingImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1685207267343-1c8852b45575?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1685207267343-1c8852b45575?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661964220280-d640498f9556?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1632050592122-6b730e1ac63f?q=80&w=1843&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683442814148-78aa260ac18e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1598371391798-5a4a7e8b1393?q=80&w=3221&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 클라이밍
    const climbingImageUrls: string[] = [
      'https://images.unsplash.com/photo-1601224748193-d24f166b5c77?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1683009427041-d810728a7cb6?q=80&w=3623&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380296653-56dd1cec32da?q=80&w=3928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380296123-cc7b39d70827?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380297191-dcb78d5712ee?q=80&w=3930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1520156557489-31c63271fcd4?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683380297110-a8d0ab72f79e?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1605548109944-9040d0972bf5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1601025678763-e8f5835995db?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1684315354193-1bdd8a54c81f?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 트레드밀
    const treadmilImageUrls: string[] = [
      'https://plus.unsplash.com/premium_photo-1683134587354-453eea03e1a5?w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1638183395699-2c0db5b6afbb?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1661595192663-71f7c5ae1b13?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1648995361141-30676a75fd27?q=80&w=3988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664300908936-c29cf9c0b293?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1638183810745-5c1a7983afa1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1714181878725-91509e2d02de?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1683121008092-7c4e5c75f2ce?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1664476716175-5d67624d334a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1719474814907-7fb947f865aa?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    // 모든 카테고리 이미지 URL 합치기
    const allImageUrls: string[] = [
      ...homeTrainingImageUrls,
      ...weightTrainingImageUrls,
      ...yogaImageUrls,
      ...runningImageUrls,
      ...crossfitImageUrls,
      ...badmintonImageUrls,
      ...(tennisImageUrls || []),
      ...dietImageUrls,
      ...outfitImageUrls,
      ...proteinImageUrls,
      ...(swimmingImageUrls || []),
      ...(pilatesImageUrls || []),
      ...bodyProfileImageUrls,
      ...stretchingImageUrls,
      ...ridingImageUrls,
      ...climbingImageUrls,
      ...treadmilImageUrls,
    ];

    // 운동 관련 게시글 제목들
    const postTitles: string[] = [
      '오늘의 운동 완료! 💪',
      '새벽 러닝 인증샷 🏃‍♂️',
      '홈트레이닝 30일 도전 시작!',
      '요가로 하루를 시작해요 🧘‍♀️',
      '수영장에서 만난 새로운 친구들',
      '벤치프레스 개인 기록 갱신! 🔥',
      '필라테스 수업 후기',
      '클라이밍 첫 도전기',
      '한강 라이딩 코스 추천',
      '복싱으로 스트레스 해소',
      '크로스핏 첫 수업 후기',
      '테니스 동호회 모임',
      '배드민턴 대회 준비중',
      '다이어트 식단 공유',
      '바디프로필 촬영 D-30',
      '운동복 코디 추천',
      '프로틴 맛 리뷰',
      '운동 전후 스트레칭',
      '새로운 헬스장 탐방기',
      '운동화 추천해주세요!',
    ];

    // 운동 관련 게시글 내용들
    const postContents: string[] = [
      '오늘도 열심히 운동했습니다! 땀 흘린 만큼 성취감이 크네요. 내일도 화이팅! 💪',
      '새벽 6시 한강 러닝 완료! 맑은 공기와 함께 하루를 상쾌하게 시작했어요. 🌅',
      '홈트레이닝 30일 도전을 시작했습니다. 집에서도 충분히 좋은 운동이 가능하다는 걸 보여드릴게요!',
      '요가 수업을 들으며 몸과 마음의 균형을 찾고 있어요. 스트레스가 확실히 줄어드는 것 같습니다.',
      '수영장에서 만난 새로운 동호회 멤버들과 함께 즐거운 시간을 보냈어요. 운동은 역시 함께할 때 더 재밌네요!',
      '드디어 벤치프레스 개인 기록을 갱신했습니다! 꾸준히 노력한 결과가 나타나니 정말 뿌듯해요.',
      '필라테스 수업 후기를 남깁니다. 코어 근육 강화에 정말 효과적인 것 같아요. 추천합니다!',
      '클라이밍에 첫 도전했는데 생각보다 어렵네요. 하지만 정말 재미있고 성취감이 큽니다!',
      '한강 라이딩 코스를 소개합니다. 경치도 좋고 바람도 시원해서 최고의 코스예요!',
      '복싱으로 하루 종일 쌓인 스트레스를 날려버렸습니다. 운동만큼 좋은 스트레스 해소법은 없는 것 같아요.',
      '크로스핏 첫 수업을 들었는데 정말 힘들지만 전신 운동 효과가 대단하네요!',
      '테니스 동호회 정기 모임에 참석했습니다. 실력도 늘고 좋은 사람들도 만나고!',
      '배드민턴 대회를 준비하며 매일 연습하고 있어요. 열심히 해서 좋은 결과 얻고 싶습니다!',
      '다이어트 중인 분들을 위한 건강한 식단을 공유합니다. 맛있으면서도 영양가 높은 메뉴들이에요.',
      '바디프로필 촬영까지 한 달 남았습니다. 마지막 스퍼트를 위해 더욱 열심히 운동하겠어요!',
      '운동할 때 입기 좋은 운동복 코디를 추천합니다. 기능성과 스타일을 모두 잡았어요!',
      '새로 산 프로틴의 맛을 리뷰해봅니다. 이 맛은 정말 추천하고 싶어요!',
      '운동 전후 스트레칭의 중요성에 대해 이야기해보겠습니다. 부상 예방에 꼭 필요해요.',
      '새로 오픈한 헬스장에 다녀왔습니다. 시설도 좋고 분위기도 훌륭하네요!',
      '러닝용 운동화를 새로 사려고 하는데 추천해주실 수 있나요? 발이 편한 게 최우선이에요.',
    ];

    // 150개의 게시글 생성 (사용자당 평균 1.5개)
    const posts = [];

    for (let i = 0; i < 150; i++) {
      // 랜덤하게 사용자 선택
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // 랜덤하게 이미지 1-3개 선택
      const imageCount = Math.floor(Math.random() * 3) + 1;
      const selectedImages: string[] = [];
      for (let j = 0; j < imageCount; j++) {
        const randomImage =
          allImageUrls[Math.floor(Math.random() * allImageUrls.length)];
        if (!selectedImages.includes(randomImage)) {
          selectedImages.push(randomImage);
        }
      }

      // 랜덤하게 제목과 내용 선택
      const randomTitle =
        postTitles[Math.floor(Math.random() * postTitles.length)];
      const randomContent =
        postContents[Math.floor(Math.random() * postContents.length)];

      // 생성 날짜를 최근 30일 내로 랜덤 설정
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

      posts.push({
        title: randomTitle,
        userUuid: randomUser.userUuid,
        content: randomContent,
        imageUrl: selectedImages,
        isPublic: Math.random() > 0.1, // 90% 확률로 공개 글
        createdAt: randomDate,
        updatedAt: randomDate,
      });
    }

    // 날짜순으로 정렬 (최신순)
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    for (const postData of posts) {
      const post = postRepository.create(postData);
      await postRepository.save(post);

      this.logger.info(
        `게시글 '${postData.title}' 생성 완료 (작성자: ${postData.userUuid.slice(-8)}, 이미지: ${postData.imageUrl.length}개)`,
      );
    }

    this.logger.info(`총 ${posts.length}개의 게시글이 생성되었습니다.`);
  }
}
