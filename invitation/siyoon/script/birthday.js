/**
 * Created by misol park
 */

$(() => {
  const APPKEY = {KAKAO:'5375ce90a3391fd48845519304e83309', SK:''};
  var xxx = 0;
  var yyy = 0;


  birthday = {
    ready() {
      this.init.all();
      this.event();
    },

    event() {
      $('#content').on('click', '.photo', $.proxy(birthday.click.photo, this));
      $('#content').on('click', '#selectedPhoto', $.proxy(birthday.click.selectedPhoto, this));
      $('#content').on('click', '.sns_icon img', $.proxy(birthday.click.sns, this));
    },

    init: {
      all() {
        this.kakaotalk();
        this.dDay();
        this.kakaoMap();
      },

      kakaotalk() {
         Kakao.init(APPKEY.KAKAO);
      },

      dDay() {
        const today = new Date();
        const dDay = new Date(2020, 8, 5);
        var diff = parseInt((dDay - today) / (24*60*60*1000));

        $('#dDay').text(`D - ${diff}`);
      },

      kakaoMap() {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
        	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        	level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체

        birthday.adressSearch(map);
      },
    },

    kakaoNavi() {
      Kakao.Navi.start({
          name: "연 그리다 뷔페하우스",
          x: Number(x),
          y: Number(y),
          coordType: 'wgs84',
      });
    },

    adressSearch(map) {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch('경기 부천시 부일로 223 투나빌딩 지하 1층', function(result, status) {

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
                  content: '연 그리다 뷔페하우스<br>수피아홀'
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
          }
      });
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
        const telNum = $(e.target).data('target') || $(e.target).parents('td').data('tel');
        const type = $(e.target).data('type');

        switch(type) {
          case 'kakaotalk':
            birthday.kakaotalk();
            break;
          case 'navi':
            birthday.kakaoNavi();
          break;
          case 'map':
            birthday.openKakaoMap();
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
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '김시윤 첫 생일잔치에 초대합니다.',
            description: '2020.09.05 18:30',
            imageUrl: 'https://hssmharry.github.io/invitation/siyoon/image/main.jpg',
            link: {
              mobileWebUrl: 'https://hssmharry.github.io/invitation/siyoon/index.html',
              webUrl: 'https://hssmharry.github.io/invitation/siyoon/index.html'
            }
          },
          buttons: [
            {
              title: '초대장 보러가기',
              link: {
                mobileWebUrl: 'https://hssmharry.github.io/invitation/siyoon/index.html',
                webUrl: 'https://hssmharry.github.io/invitation/siyoon/index.html'
              }
            }
          ]
        });
    },

    openKakaoMap() {
      location.href = `http://kko.to/Yip6DM-Y0`;
    }
  };

  birthday.ready();
});
