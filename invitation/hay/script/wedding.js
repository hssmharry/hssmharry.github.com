/**
 * Created by misol park
 */

$(() => {
  const MAX_PAGE = $('#content .page').length;
  const APPKEY = '5375ce90a3391fd48845519304e83309';
  let PAGE = 1;
  var x = 0;
  var y = 0;


  wedding = {
    ready() {
      this.init.all();
      this.event();
    },

    event() {
      $('#content').on('click', '.photo', $.proxy(wedding.click.photo, this));
      $('#content').on('click', '#selectedPhoto', $.proxy(wedding.click.selectedPhoto, this));
      $('#content').on('click', '.sns_icon img, .sns_icon b, .sns_icon span', $.proxy(wedding.click.sns, this));
    },

    init: {
      all() {
        this.swiper();
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
        const dDay = new Date(2020, 9, 18);
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

      adressSearch(map) {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('서울 강남구 언주로 508 공무원연금공단', function(result, status) {

            // 정상적으로 검색이 완료됐으면
             if (status === kakao.maps.services.Status.OK) {

               // var imageSrc = 'https://hssmharry.github.io/invitation/hay/image/wedding.png', // 마커이미지의 주소입니다
               //      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
               //      imageOption = {offset: new kakao.maps.Point(27, 69)};
               //
               //   var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

                 var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                 x = result[0].x;
                 y = result[0].y;

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

               // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              var content = '<div class="customoverlay">' +
                 '  <a href="http://kko.to/UMmMVpxYM" target="_blank">' +
                 '    <span class="title">서울 상록아트홀 L층 그랜드볼룸</span>' +
                 '  </a>' +
                 '</div>';


                // 커스텀 오버레이를 생성합니다
                var customOverlay = new kakao.maps.CustomOverlay({
                    map: map,
                    position: coords,
                    content: content,
                    yAnchor: 1
                });

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
        const type = $(e.target).data('type') || $(e.target).parents('.sns_icon').data('type');

        switch(type) {
          case 'kakaoMap':
            location.href = `http://kko.to/Ivp8JpxYB`;
            break;
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

    kakaoNavi() {
      Kakao.Navi.start({
          name: "상록아트홀",
          x: Number(x),
          y: Number(y),
          coordType: 'wgs84',
      });
    },

    kakaotalk() {
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '김영진 & 한아영 결혼합니다',
            description: '2020-10-18 (일) 17:40',
            imageUrl: 'https://hssmharry.github.io/invitation/hay/image/index2.jpg',
            link: {
              mobileWebUrl: 'https://hssmharry.github.io/invitation/hay/index.html',
              webUrl: 'https://hssmharry.github.io/invitation/hay/index.html'
            }
          },
          buttons: [
            {
              title: '청첩장 보러가기',
              link: {
                mobileWebUrl: 'https://hssmharry.github.io/invitation/hay/index.html',
                webUrl: 'https://hssmharry.github.io/invitation/hay/index.html'
              }
            }
          ]
        });
      // https://hssmharry.github.io/invitation/kjy/index.html
    }
  };

  wedding.ready();
});
