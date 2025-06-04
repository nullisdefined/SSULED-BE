import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SocialProvider } from '@/types/social-provider.enum';
import { User } from '@/entities/user.entity';
import { Logger } from 'winston';
import { LoggerService } from '@/utils/logger.service';
import { UserStatusType } from '@/types/user-status.enum';
import { v4 as uuidv4 } from 'uuid';

export class UserSeeder implements Seeder {
  private readonly logger: Logger = LoggerService.getInstance().logger;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const profileImages: string[] = [
      'http://farm1.static.flickr.com/121/291259902_bafdee913b_o.jpg',
      'http://206.47.170.43/channels/images/miley_big_.jpg',
      'http://a.abcnews.com/images/GMA/ap_cyrus_080128_mn.jpg',
      'http://assets.gearlive.com/celebrities/blogimages/mileycyrus_nickjonas.jpg',
      'http://blog.beliefnet.com/moviemom/miley_cyrus3.jpg',
      'http://bp0.blogger.com/_wvoLtwni0kc/SBZeTnMGTLI/AAAAAAAAQow/UEFnOBKsJnQ/s400/miley-cyrus.jpg',
      'http://bp1.blogger.com/_DQk-PjsLD-A/SGfcURsb41I/AAAAAAAABbA/-eZrtSOSP90/s400/miley-cyrus-7-things-music-video.jpg',
      'http://bp2.blogger.com/_VEddI36Qnyw/SHzjEj3CS0I/AAAAAAAAALo/WwRKQSPH32E/s320/miley-cyrus-sings-blues.jpg',
      'http://buzzworthy.mtv.com/wp-content/uploads/2008/07/miley_1300dpi.jpg',
      'http://chicstories.com/wp-content/uploads/2008/06/mileycyrusfashiontips.jpg',
      'http://content6.flixster.com/photo/10/65/02/10650236_gal.jpg',
      'http://dev.actressarchives.com/imgdir/Miley_Cyrus_004.jpg',
      'http://evilbeetgossip.film.com/wp-content/uploads/2007/12/miley_cyrus2.jpg',
      'http://farm2.static.flickr.com/1359/1297499383_c29e491f8b.jpg',
      'http://farm3.static.flickr.com/2265/1966939345_03579d6bd9.jpg',
      'http://farm4.static.flickr.com/3091/2348205223_963017d8b2.jpg',
      'http://glambamm.com/images/miley-cyrus-simpsonize.jpg',
      'http://i152.photobucket.com/albums/s190/gabbybabble/2008-04/28/miley-cyrus-billionaire-pr.jpg',
      'http://i190.photobucket.com/albums/z218/lipstickbitches/Folder1/MileyCyrus-05.jpg',
      'http://i243.photobucket.com/albums/ff230/UsernamePassword_album/miley-cyrus.jpg',
      'http://i272.photobucket.com/albums/jj166/pink_sweetiie/miley-cyrus.jpg',
      'http://i317.photobucket.com/albums/mm395/brenda48_1960/miley-cyrus-ET-storyPhoto.jpg',
      'http://i97.photobucket.com/albums/l203/ritaiyo/BiRTHDAYS/miley_cyrus.jpg',
      'http://images.askmen.com/photos/miley-cyrus/23977.jpg',
      'http://images.fanpop.com/images/image_uploads/Miley-hannah-montana-509218_274_400.jpg',
      'http://images.fanpop.com/images/image_uploads/Miley-miley-cyrus-553466_500_375.jpg',
      'http://images.hollywoodgrind.com:9000/images/2007/10/miley-cyrus-new-teeth.jpg',
      'http://images.paraorkut.com/img/pics/images/m/miley_cyrus-5325.jpg',
      'http://images.quickblogcast.com/84275-73701/MileyCyrus.jpg',
      'http://images.starpulse.com/Photos/Previews/Miley-Cyrus-hm20.jpg',
      'http://img2.timeinc.net/people/i/2007/news/071126/miley_cyrus1180.jpg',
      'http://img2.timeinc.net/people/i/2008/database/mileycyrus/mileycyrus300b.jpg',
      'http://img.bazarek.pl/39572/6090/205382/587714509483d1b25af4d6.jpg',
      'http://img.buzznet.com/assets/imgx/3/2/3/4/6/9/1/orig-3234691.jpg',
      'http://img.dailymail.co.uk/i/pix/2008/03_02/063hannahmontana_468x622.jpg',
      'http://img.mediaspanonline.com/5850/2438426.jpg',
      'http://img.slate.com/media/1/123125/123050/2180573/2190361/080501_CB_CyrusEX.jpg',
      'http://img.thesun.co.uk/multimedia/archive/00477/Miley_Cyrus_477396a.jpg',
      'http://img.timeinc.net/time/daily/2006/0611/hannah_montana.jpg',
      'http://img.timeinc.net/time/2008/time_100_2008/miley_cyrus.jpg',
      'http://joyhog.com/wp-content/uploads/2008/03/miley.jpg',
      'http://latimesblogs.latimes.com/thedishrag/images/2008/06/22/miley1_k1ycodnc.jpg',
      'http://lh3.ggpht.com/_KzTId0dXUHk/SEs0oeeyeeI/AAAAAAAABTg/5NhGWP3I_O0/015.jpg',
      'http://lh3.ggpht.com/_DcuMtqebxV4/R79URVciqLI/AAAAAAAAAfM/FXuOdVMo3jU/9789-bigthumbnail.jpg',
      'http://lh3.ggpht.com/_ZZ-CqtHjAnk/SACl6kSwo8I/AAAAAAAAMq8/vAzrsyROUJ4/miley%2Bcyrus%2Bthe%2Bnew%2Bstar%2Bgossip.jpg',
      'http://lh4.ggpht.com/_NfqVUJQ7p6o/R_nC7QVFD3I/AAAAAAAABY4/_zAiY23J0UQ/miley%252520pic.jpg',
      'http://lh5.ggpht.com/_KzTId0dXUHk/SEs01DvhJ1I/AAAAAAAABT4/ADQDVGelbQw/018.jpg',
      'http://lh5.ggpht.com/_2lEM_YCRcuU/R_Iht0Qz-MI/AAAAAAAAH18/9yKZWlcQvnI/hannah_montana_times_square_gossip.jpg',
      'http://lh5.ggpht.com/_2lEM_YCRcuU/R_Iiv0Qz_FI/AAAAAAAAH9E/zNa0erussAc/large_hannah.jpg',
      'http://lh5.ggpht.com/_uwLejyNI-ZA/R74TvbDlbjI/AAAAAAAAAN8/UoYKQ4n4P-Y/miley%2Bpic.jpg',
      'http://media.bonnint.net/slc/432/43278/4327810.jpg',
      'http://media.canada.com/8c8b3290-2b08-4dc6-8e3e-2cc645fdfe05/042808_miley.jpg',
      'http://media.entertainment.sky.com/image/unscaled/2008/3/31/Miley-Cyrus-0308-12.jpg',
      'http://media.hollyscoop.com/BlogImages/55147842---miley.jpg',
      'http://media.justjared.com/headlines/2008/01/miley-ray-cyrus.jpg',
      'http://media.washingtonpost.com/wp-srv/liveonline/images/celebritology/08/miley.jpg',
      'http://mileyaddicts.com/wp-content/uploads/miley_clinton.jpg',
      'http://movies-music-games.com/wp-content/uploads/2008/05/miley-cyrus.jpg',
      'http://msnbcmedia3.msn.com/j/msnbc/Components/Video/080725/tdy_concert_cyrus2_080725.300w.jpg',
      'http://multimedia.heraldinteractive.com/images/3a7b2dc330_miley04252008.jpg',
      'http://photos-669.friendster.com/e1/photos/96/67/66527669/1_947706047l.jpg',
      'http://photos.upi.com/story/t/ae9af33d8098f499c353f2e0627d12fb/Miley_takes_over_Sirius_channel.jpg',
      'http://regent.blogs.com/photos/uncategorized/2008/02/04/miley.jpg',
      'http://snagwiremedia.com/wickedyouth/2007/12/28/miley_cyrus.jpg',
      'http://static.desktopnexus.com/wallpapers/9784-bigthumbnail.jpg',
      'http://static.oprah.com/images/tows/200711/20071121/20071121_101_350x263.jpg',
      'http://thebiz.fancast.com/Blog-Madonna-Miley.jpg',
      'http://thebosh.com/upload/2008/04/08/_brad_pitt_miley_cyrus_carrie_underwood_mariah_carey_give_back/Miley-Cyrus.jpg',
      'http://thomay.files.wordpress.com/2008/07/mileywax3.jpg',
      'http://totallylookslike.files.wordpress.com/2008/07/miley-cyrus2.jpg',
      'http://tv.popcrunch.com/wp-content/uploads/2008/01/miley_cyrus_darkhair.jpg',
      'http://us.i1.yimg.com/us.yimg.com/p/i/bcst/yahootv/1904/60068167.jpg',
      'http://vizu.typepad.com/vizuble/images/2007/08/13/miley_cyrus_hannah_montana.jpg',
      'http://weblogs.cw11.com/news/local/morningnews/blogs/miley_cyrus_new_smile.jpg',
      'http://www1.pictures.zimbio.com/img/6140/John/1388.cover.9875268936.jpg',
      'http://www2.scholastic.com/content/images/articles/sn/sn_starspot_082908_fixed1.jpg',
      'http://www3.pictures.zimbio.com/img/0bfa/TheZimbioTeam/16759.cover.8855440617.jpg',
      'http://www.aceshowbiz.com/images/events/ALO-003106.jpg',
      'http://www.allthetests.com/quiz23/picture/pic_1182872501_9.jpg',
      'http://www.aolcdn.com/red_galleries/hayden-versus-miley-400ds0816.jpg',
      'http://www.azcentral.com/i/sized/D/7/B/e298/j350/PHP489866BB3AB7D.jpg',
      'http://www.azstarnet.com/ss/2008/04/21/235372-1.jpg',
      'http://www.babble.com/CS/blogs/famecrawler/2008/07/23-End/miley5.jpg',
      'http://www.babble.com/CS/blogs/famecrawler/2008/03/01-07/miley-cyrus-likes-ryan-cabrera.jpg',
      'http://www.bestmusic.ro/bm/_MileyCyrus.jpg',
      'http://www.bestweekever.tv/bwe/images/2008/07/miley-cyrus_SATC.jpg',
      'http://www.blender.com/gallery_photos/summer_festivals/miley_cyrus.jpg',
      'http://www.blog-city.info/en/img8/8252_TI4U_u1174341752.jpg',
      'http://www.buddytv.com/usrimages/usr1053174/1053174_miley-cyrus-300a100606.jpg',
      'http://www.celebritybiographies.net/images/Miley-Cyrus.jpg',
      'http://www.celebrity-gossip.net/images/photos/miley-cyrus-urban-mandy.jpg',
      'http://www.celebritywonder.com/picture/Miley_Cyrus/ActressMiley_Granitz_15305387.jpg',
      'http://www.celebritywonder.com/picture/Billy_Ray_Cyrus/MileyCyrusan_Granitz_11493203.jpg',
      'http://www.celebritywonder.com/picture/Miley_Cyrus/MileyCyrusvi_Mazur_15924590.jpg',
      'http://www.celebritywonder.com/picture/Miley_Cyrus/SingerMileyC_Granitz_15481182.jpg',
      'http://www.chattahbox.com/images/Miley_Cyrus_book_deal.jpg',
      'http://www.chicagotribune.com/common/images/taxonomy/topics/tax-miley-cyrus_186x200.jpg',
      'http://www.chinadaily.com.cn/life/images/attachement/jpg/site1/20080829/000802ab80180a21f6f725.jpg',
      'http://www.cinemablend.com/images/sections/10137/10137.jpg',
      'http://www.clusterflock.org/hannah_montana.jpg',
      'http://www.cmt.com/sitewide/assets/img/events/2008/cmt_music_awards/pressroom/stephen_lovekin/cmt_awards_pressroom_10-x600.jpg',
      'http://www.cmt.com/sitewide/assets/img/artists/cyrus_miley/mileycyrus01-280x210.jpg',
      'http://www.contactmusic.com/pics/m/miley_cyrus_180108/miley_cyrus_1725587.jpg',
      'http://www.contactmusic.com/pics/m/miley_cyrus_180108/miley_cyrus_1725590.jpg',
      'http://www.contactmusic.com/pics/m/miley_cyrus_180108/miley_cyrus_1725602.jpg',
      'http://www.contactmusic.com/pics/m/miley_cyrus_wax_200308/miley_cyrus_5106277.jpg',
      'http://www.dallasnews.com/sharedcontent/dws/img/11-07/miley1.jpg',
      'http://www.davidnepo.com/wp-content/uploads/2008/04/hannah-montana-image-3.jpg',
      'http://www.eastvalleytribune.com/images/photos/2008/04/22/pen3k7iz.jpg',
      'http://www.entertainmentwise.com/photos/Image/MileyTeethCompare01.jpg',
      'http://www.fly92.com/includes/news_items/4/214/miley_cyrus.jpg',
      'http://www.foxnews.com/images/357006/0_61_032808_cyrus.jpg',
      'http://www.foxnews.com/images/367049/0_61_042808_cyrus.jpg',
      'http://www.freewebs.com/alwaysmileyx/00000.jpg',
      'http://www.freewebs.com/hawaiidolphin/cheese!.jpg',
      'http://www.freshnews.in/wp-content/uploads/2008/04/miley_cyrus.jpg',
      'http://www.geetune.com/geetune/uploadedFiles/Geetune_Community_Forum/miley_cyrus.jpg',
      'http://www.glamorati.com/celebrity/wp-content/uploads/2008/04/miley-cyrus-thumb.jpg',
      'http://www.gossipboulevard.com/wp-content/uploads/2008/02/02000000177.jpg',
    ];

    // 그룹별 자기소개 메시지 (헬스, 런닝, 요가, 수영, 홈트, 크로스핏, 사이클링, 필라테스, 클라이밍, 복싱, 직장인, 초보자)
    const introductions: string[] = [
      '헬스로 근육을 키우는 중입니다! 오운완 인증하고 있어요 💪',
      '매일 한강에서 러닝하며 건강을 지키고 있습니다 🏃‍♂️',
      '요가로 마음의 평화와 유연성을 찾고 있어요 🧘‍♀️',
      '수영으로 전신 운동하며 체력 향상 중입니다 🏊‍♂️',
      '집에서도 꾸준히 홈트레이닝으로 건강 관리해요 🏠',
      '크로스핏으로 한계를 뛰어넘는 도전을 하고 있습니다 🔥',
      '자전거로 전국 곳곳을 달리며 여행하고 있어요 🚴‍♀️',
      '필라테스로 코어 근육 강화와 체형 교정 중 🤸‍♀️',
      '클라이밍으로 벽을 정복하는 짜릿함을 느끼고 있어요 🧗‍♂️',
      '복싱으로 스트레스 해소하고 체력 단련 중입니다 👊',
      '바쁜 직장 생활 속에서도 새벽에 운동하며 건강 챙겨요 💼',
      '주말마다 친구들과 함께 운동하며 즐거운 시간 보내요 🌅',
      '운동 초보지만 열심히 배우며 성장하고 있습니다 🔰',
      '운동을 사랑하는 마니아로서 다양한 운동에 도전해요 🌟',
      '벤치프레스 100kg 목표로 열심히 웨이트 트레이닝 중 💪',
      '다이어트 성공을 위해 꾸준히 노력하고 있어요 ⚖️',
      '바디프로필 촬영을 목표로 몸 만들기에 집중하고 있습니다 📸',
      '테니스로 즐겁게 운동하며 실력 향상 중이에요 🎾',
      '배드민턴 동호회에서 활발하게 활동하고 있습니다 🏸',
      '새벽 러닝으로 하루를 상쾌하게 시작해요 🏃‍♀️',
    ];

    // 100명의 더미 유저 생성
    const users = [];
    const baseUuid = '123e4567-e89b-12d3-a456-426614170000';

    for (let i = 0; i < 100; i++) {
      // uuid 마지막 5자리를 1씩 증가
      const userUuid =
        baseUuid.slice(0, baseUuid.length - 5) +
        (parseInt(baseUuid.slice(-5)) + i).toString().padStart(5, '0');

      users.push({
        userUuid,
        socialNickname: `익명_${i + 1}`,
        nickname: `익명_${i + 1}`,
        profileImage: profileImages[i % profileImages.length],
        socialProvider:
          i % 3 === 0 ? SocialProvider.KAKAO : SocialProvider.NAVER,
        socialId: uuidv4(),
        introduction: introductions[i % introductions.length],
        status: UserStatusType.ACTIVE,
      });
    }

    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { nickname: userData.nickname },
      });

      if (existingUser) {
        this.logger.info(
          `사용자 ${userData.nickname}은(는) 이미 존재합니다. 건너뜁니다.`,
        );
        continue;
      }

      const user = userRepository.create(userData);
      await userRepository.save(user);

      this.logger.info(
        `사용자 ${userData.nickname} 생성 완료 (상태: ${userData.status})`,
      );
    }
  }
}
