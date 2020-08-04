/**
 * Created by misol park
 */

$(() => {
  const APPKEY = '5375ce90a3391fd48845519304e83309';


  birthday = {
    ready() {
      this.init.all();
      this.event();
    },

    event() {
      $('#content').on('click', '.photo', $.proxy(birthday.click.photo, this));
      $('#content').on('click', '#selectedPhoto', $.proxy(birthday.click.selectedPhoto, this));
      $('#content').on('click', '.sns_icon img, .icon', $.proxy(birthday.click.sns, this));
    },

    init: {
      all() {
        this.kakaotalk();
        this.dDay();
        this.kakaoMap();
        // this.kakaoProfile();
      },

      kakaotalk() {
         Kakao.init(APPKEY);
      },

      dDay() {
        const today = new Date();
        const dDay = new Date(2020, 7, 15);
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

      kakaoProfile() {
        Kakao.API.request({
          headers: {
            Authorization: ''
          },
          url: '/v1/api/talk/profile',
          success: function(response) {
            console.log('1   :   ' + response);
          },
          fail: function(error) {
            console.log('2   :   ' + error);
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
        const telNum = $(e.target).data('target') || $(e.target).parents('td').data('tel');
        const type = $(e.target).data('type');

        switch(type) {
          case 'kakaotalk':
            birthday.kakaotalk();
            break;
          case 'navi':
            birthday.kakaoNavi();
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

  adressSearch(map) {
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch('경기 부천시 길주로 71 리파인빌 3층', function(result, status) {

      // 정상적으로 검색이 완료됐으면
       if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: '드마리스 부천점<br>베네홀'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      }
  });
  },

  kakaoNavi() {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch('경기 부천시 길주로 71 리파인빌 3층', function(result, status) {

        // 정상적으로 검색이 완료됐으면
         if (status === kakao.maps.services.Status.OK) {
            Kakao.Navi.start({
                name: "드마리스 부천점",
                x: result[0].x,
                y: result[0].y,
                coordType: 'wgs84'
            });
        }
    });
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
            title: '이하림 첫 생일잔치에 초대합니다.',
            description: '2020.09.05 18:30',
            imageUrl: 'https://hssmharry.github.io/invitation/harim/image/main.jpg',
            link: {
              mobileWebUrl: 'https://hssmharry.github.io/invitation/harim/index.html',
              webUrl: 'https://hssmharry.github.io/invitation/harim/index.html'
            }
          },
          buttons: [
            {
              title: '초대장 보러가기',
              link: {
                mobileWebUrl: 'https://hssmharry.github.io/invitation/harim/index.html',
                webUrl: 'https://hssmharry.github.io/invitation/harim/index.html'
              }
            }
          ]
        });
    }
  };

  birthday.ready();
});
