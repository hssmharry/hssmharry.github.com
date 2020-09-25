/**
 * Created by misol park
 */

$(() => {
  const MAX_PAGE = $('#content .page').length;
  const APPKEY = '5375ce90a3391fd48845519304e83309';
  const _ADRESS = '경기도 부천시 소사구 소사본동 65-7';
  let PAGE = 1;
  let x = 0;
  let y = 0;


  wedding = {
    ready() {
      this.init.all();
      this.event();
    },

    event() {
      $('#content').on('click', '.photo', $.proxy(wedding.click.photo, this));
      $('#content').on('click', '#selectedPhoto', $.proxy(wedding.click.selectedPhoto, this));
      $('#content').on('click', '.sns_icon img, .sns_icon', $.proxy(wedding.click.sns, this));
    },

    init: {
      all() {
        this.swiper();
        // this.naverMap();
        this.kakaotalk();
        this.kakaoMap();
        this.dDay();
        this.sakura();
      },

      sakura() {
        $('body').sakura();
      },

      dDay() {
        const today = new Date();
        const dDay = new Date(2020, 9, 17);
        var diff = parseInt((dDay - today) / (24*60*60*1000));

        $('#dDay').text(`D - ${diff}`);
      },

      kakaotalk() {
         Kakao.init(APPKEY);
      },

      kakaoMap() {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        	level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체

        this.adressSearch(map);
      },

      kakaoNavi() {
        Kakao.Navi.start({
            name: "MJ 컨벤션",
            x: Number(x),
            y: Number(y),
            coordType: 'wgs84',
        });
      },

      adressSearch(map) {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(_ADRESS, function(result, status) {

          // 정상적으로 검색이 완료됐으면
           if (status === kakao.maps.services.Status.OK) {

              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              x = result[0].x;
              y = result[0].y;

              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                  map: map,
                  position: coords
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              var infowindow = new kakao.maps.InfoWindow({
                  content: 'MJ 컨벤션 3층<br>다이너스티홀'
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
          }
      });
      },

      swiper() {
        const swiper = new Swiper('#content', {
          speed: 500,
          pagination: {
            el: '#footer',
            type: 'bullets',
            clickable: true
          },
          on: {
            slideChangeTransitionEnd: () => {
              const activePage = $('.page.swiper-slide-active').data('page');
              $(`.page_move_btn`).removeClass('on')
                                 .filter(`[data-page=${activePage}]`).addClass('on');
            }
          }
        });
      },
    },

    click: {
      photo(e) {
        const $target = e.target.tagName === 'IMG' ? $(e.target) : $(e.target).find('img');
        const imgSrc = $target.attr('src');
        $('#selectedPhoto').empty().append(`<img src=${imgSrc} />`).fadeIn(200).css({'display':'flex'});
        $('e.target').addClass('on');
      },

      selectedPhoto() {
        $('.photo').removeClass('on');
        $('#selectedPhoto').empty().fadeOut(100);
      },

      sns(e) {
        const telNum = $(e.target).parents('td').data('tel');
        const type = $(e.target).data('type');

        switch(type) {
          case 'kakaotalk':
            wedding.kakaotalk();
            break;
          case 'navi':
            wedding.kakaoNavi();
          break;
          case 'tel':
            location.href = `tel:${telNum}`;
            break;
          case 'sms':
            location.href = `sms:${telNum}`;
            break;
        }
      }
    },

    kakaotalk() {
      // Kakao.Link.sendCustom({
      //   templateId: ,
      //   templateArgs: {
      //     'title': '이태훈 & 김주연 결혼합니다',
      //     'description': '2018-11-10 (토) 12:30'
      //   }
      // });

      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '채혁주 & 이인혜 결혼합니다',
            description: '2020-10-17 (토) 18:00',
            imageUrl: 'https://hssmharry.github.io/invitation/inhye/image/index.jpg',
            link: {
              mobileWebUrl: 'https://hssmharry.github.io/invitation/inhye/index.html',
              webUrl: 'https://hssmharry.github.io/invitation/inhye/index.html'
            }
          },
          buttons: [
            {
              title: '청첩장 보러가기',
              link: {
                mobileWebUrl: 'https://hssmharry.github.io/invitation/inhye/index.html',
                webUrl: 'https://hssmharry.github.io/invitation/inhye/index.html'
              }
            }
          ]
        });
      // https://hssmharry.github.io/invitation/kjy/index.html
    }
  };

  wedding.ready();
});
