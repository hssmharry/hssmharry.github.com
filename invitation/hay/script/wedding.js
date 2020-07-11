/**
 * Created by misol park
 */

$(() => {
  const MAX_PAGE = $('#content .page').length;
  const APPKEY = '5375ce90a3391fd48845519304e83309';
  let PAGE = 1;


  wedding = {
    ready() {
      this.init.all();
      this.event();
    },

    event() {
      $('#content').on('click', '.photo', $.proxy(wedding.click.photo, this));
      $('#content').on('click', '#selectedPhoto', $.proxy(wedding.click.selectedPhoto, this));
      $('#content').on('click', '.sns_icon img, .sns_icon b', $.proxy(wedding.click.sns, this));
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
        const dDay = new Date(2020, 7, 29);
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
        geocoder.addressSearch('경기도 부천시 소사구 소사본동 65-7', function(result, status) {

            // 정상적으로 검색이 완료됐으면
             if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                var markerImage = new kakao.maps.MarkerImage(
                    'image/logo.png',
                    new kakao.maps.Size(31, 35), new kakao.maps.Point(13, 34));

                // marker.setImage(markerImage);
                marker.setTitle(`[MJ 컨벤션] 5층 파티오홀`);
                marker.setVisible(true);

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({});
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
      },

      naverMap() {
        const map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10
        });
        const myaddress = '경기도 부천시 소사구 소사본동 65-7';

        naver.maps.Service.geocode({address: myaddress}, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
              return;
                return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
            }
            var result = response.result;
            // 검색 결과 갯수: result.total
            // 첫번째 결과 결과 주소: result.items[0].address
            // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
            var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
            map.setCenter(myaddr); // 검색된 좌표로 지도 이동
            // 마커 표시
            var marker = new naver.maps.Marker({
              position: myaddr,
              map: map
            });
            // 마커 클릭 이벤트 처리
            naver.maps.Event.addListener(marker, "click", function(e) {
              if (infowindow.getMap()) {
                  infowindow.close();
              } else {
                  infowindow.open(map, marker);
              }
            });
            // 마크 클릭시 인포윈도우 오픈
            var infowindow = new naver.maps.InfoWindow({
                content: '<h4> [MJ 컨벤션 5층 파티오홀] </h4><a href="http://mjcon.co.kr/?module=Html&action=SiteComp&sSubNo=2" target="_blank"><img src="image/logo.png"></a>'
            });
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
            title: '이태훈 & 김주연 결혼합니다',
            description: '2018-11-10 (토) 12:30',
            imageUrl: 'image/1.jpg',
            link: {
              mobileWebUrl: 'https://hssmharry.github.io/invitation/kjy/index.html',
              webUrl: 'https://hssmharry.github.io/invitation/kjy/index.html'
            }
          },
          buttons: [
            {
              title: '청첩장 보러가기',
              link: {
                mobileWebUrl: 'https://hssmharry.github.io/invitation/kjy/index.html',
                webUrl: 'https://hssmharry.github.io/invitation/kjy/index.html'
              }
            }
          ]
        });
      // https://hssmharry.github.io/invitation/kjy/index.html
    }
  };

  wedding.ready();
});
