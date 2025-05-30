/* 헤더 불러오기 */
fetch('header.html')
  .then(function (res) {
    //응답을 텍스트로 변환
    return res.text();
  })
  .then(function (data) {
    //변환된 텍스트html코드를 #header요소 안에 삽입
    document.getElementById('header').innerHTML = data;

    /* ##########헤더 영역########## */

    /* 메뉴 드롭 */
    let gnb = document.querySelector('.gnb');
    let subMenu = document.querySelector('.sub_wrap');
    let headerWrap = document.querySelector('header');
    let headerTopHeight = document.querySelector('.header_top').offsetHeight;
    let headerBottomHeight = gnb.offsetHeight;
    let headerHeight = headerTopHeight + headerBottomHeight;
    let mainHeight = document.getElementById('hero').offsetHeight;


    window.onscroll = function () {
      let windowTop = window.scrollY;
      if (windowTop > headerHeight) {
        document.getElementById('header').style.position = 'relative'
        gnb.classList.add('drop');
        subMenu.classList.add('drop');
      }
      else {
        document.getElementById('header').style.position = 'fixed'
        gnb.classList.remove('drop');
        subMenu.classList.remove('drop');
      }

      if (windowTop > mainHeight) {
        gnb.classList.add('dropsub');
        subMenu.classList.add('dropsub');
      }
      else {
        gnb.classList.remove('dropsub');
        subMenu.classList.remove('dropsub');
      }
    };

    /* 메인메뉴 */
    let menuItems = document.querySelectorAll(".menu_item");
    let subMenus = document.querySelectorAll(".sub_menu");

    headerWrap.addEventListener('mouseenter', function () { headerWrap.style.background = 'var(--black)'; });
    headerWrap.addEventListener('mouseleave', function () {
      headerWrap.style.background = 'transparent';
      if (gnb.classList.contains('drop')) { gnb.classList.remove('active') };
    });

    menuItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        if (gnb.classList.contains('drop')) { gnb.classList.add('active') };
        headerWrap.style.background = 'var(--black)';
        subMenus.forEach(function (sub) {
          sub.style.height = '0';
          sub.style.opacity = '0';
        })
        let target = document.getElementById(item.dataset.target);
        if (target) {
          // target.style.display = 'flex'
          target.style.height = '50px';
          target.style.opacity = '1';
        }
      });
    });

    subMenus.forEach(function (sub) {
      sub.addEventListener('mouseenter', function () {
        // sub.style.display = 'flex'
        sub.style.height = '50px';
        sub.style.opacity = '1';
      });
      sub.addEventListener('mouseleave', function () {
        if (gnb.classList.contains('drop')) { gnb.classList.remove('active') };
        headerWrap.style.background = 'transparent';
        sub.style.height = '0';
        sub.style.opacity = '0';
      });
    });

    document.querySelector('.main_menu').addEventListener('mouseleave', function () {
      subMenus.forEach(function (sub) {
        sub.style.height = '0';
        sub.style.opacity = '0';
      });
    });

    /* 메가네비 */
    let trigger = document.querySelector(".trigger");
    let meganav = document.getElementById("trigger");
    let meganavWrap = document.querySelector('.mega_nav');

    trigger.addEventListener('mouseenter', function () {
      if (gnb.classList.contains('drop')) { gnb.classList.add('active') };
      headerWrap.style.background = 'var(--black)';
      // meganav.style.display = 'block'
      meganav.style.height = '400px';
      meganav.style.opacity = '1';
    });

    meganavWrap.addEventListener('mouseenter', function () {
      if (gnb.classList.contains('drop')) { gnb.classList.add('active') };
      // meganav.style.display = 'block'
      meganav.style.height = '400px';
      meganav.style.opacity = '1';
    });

    meganavWrap.addEventListener('mouseleave', function () {
      if (gnb.classList.contains('drop')) { gnb.classList.remove('active') };
      headerWrap.style.background = 'transparent';
      meganav.style.height = '0';
      meganav.style.opacity = '0';
    });

    document.querySelector('.trigger').addEventListener('mouseleave', function () {
      if (gnb.classList.contains('drop')) { gnb.classList.remove('active') };
      meganav.style.height = '0';
      meganav.style.opacity = '0';
    });

    //최상단에서 추가됐던 클래스 모두 삭제
    document.addEventListener('scroll', function () {
      let scrollPosition = document.documentElement.scrollTop;
      if (scrollPosition <= 100) {
        gnb.classList.remove('drop');
        gnb.classList.remove('active');
      };
    });

    /********** 반응형 헤더 **********/
    //헤더
    let mobileMenuWrap = document.querySelector('.mega_nav_mobile');
    //트리거
    let mobileOpen = document.querySelector('.header_trigger_mobile');
    //닫기
    let mobileClose = document.querySelector('.header_close_mobile');
    //타이틀
    let mobileMenuTitle = document.querySelectorAll('.mega_nav_title');
    mobileMenuTitle.forEach(item => {
      item.addEventListener('click', () => {
        item.nextElementSibling.style.height = 'max-content';
      });
    });

    mobileOpen.addEventListener('click', function () {
      if (mobileMenuWrap.style.display === 'block') {
        mobileMenuWrap.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else {
        mobileMenuWrap.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
    mobileClose.addEventListener('click', function () {
      if (mobileMenuWrap.style.display === 'none') {
        mobileMenuWrap.style.display = 'block';
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenuWrap.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    /********** 로그인 모달 **********/
    let loginModal = document.getElementById('login_modal');

    document.querySelector('.btn_login').addEventListener('click', function () {
      loginModal.style.display = "block";
      document.body.style.overflow = 'hidden';
    });
    document.querySelector('.btn_login_mobile').addEventListener('click', function () {
      loginModal.style.display = "block";
      document.body.style.overflow = 'hidden';
    });
    document.querySelector('.close_btn').addEventListener('click', function () {
      loginModal.style.display = "none";
      document.body.style.overflow = 'auto';
    });
    document.getElementById('login_submit').addEventListener('click', function () {
      let userId = document.getElementById('id_input').value;
      let userPw = document.getElementById('pw_input').value;
      if (userId && userPw) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      else { alert('아이디 혹은 비밀번호를 입력하세요.') };
    });

  });
/* 푸터 불러오기 */
fetch('footer.html')
  .then(function (res) {
    return res.text();
  })
  .then(function (data) {
    document.getElementById('footer').innerHTML = data;
  });


/********** hero**********/

/* main visual slide */

/* secondary visual */
let rankingData = {
  전북: {
    순위: '1',
    팀: '전북',
    경기: '16',
    승점: '32',
    승: '9',
    무: '5',
    패: '2',
    득점: '24',
    실점: '11',
    득실차: '13'
  },

  대전: {
    순위: '2',
    팀: '대전',
    경기: '17',
    승점: '31',
    승: '9',
    무: '4',
    패: '4',
    득점: '24',
    실점: '20',
    득실차: '4'
  },

  울산: {
    순위: '3',
    팀: '울산',
    경기: '17',
    승점: '28',
    승: '8',
    무: '4',
    패: '5',
    득점: '21',
    실점: '15',
    득실차: '6'
  },

  포항: {
    순위: '4',
    팀: '포항',
    경기: '16',
    승점: '25',
    승: '7',
    무: '4',
    패: '5',
    득점: '20',
    실점: '18',
    득실차: '2'
  },

  김천상무: {
    순위: '5',
    팀: '김천상무',
    경기: '15',
    승점: '24',
    승: '7',
    무: '3',
    패: '5',
    득점: '23',
    실점: '16',
    득실차: '7'
  },

  광주: {
    순위: '6',
    팀: '광주',
    경기: '15',
    승점: '22',
    승: '6',
    무: '4',
    패: '5',
    득점: '14',
    실점: '15',
    득실차: '-1'
  },

  강원: {
    순위: '7',
    팀: '강원',
    경기: '15',
    승점: '21',
    승: '6',
    무: '3',
    패: '6',
    득점: '12',
    실점: '14',
    득실차: '-2'
  },

  FC서울: {
    순위: '8',
    팀: 'FC서울',
    경기: '15',
    승점: '19',
    승: '4',
    무: '7',
    패: '4',
    득점: '12',
    실점: '13',
    득실차: '-1'
  },

  안양: {
    순위: '9',
    팀: '안양',
    경기: '16',
    승점: '17',
    승: '5',
    무: '2',
    패: '9',
    득점: '17',
    실점: '22',
    득실차: '-5'
  },

  제주: {
    순위: '10',
    팀: '제주',
    경기: '16',
    승점: '16',
    승: '4',
    무: '4',
    패: '8',
    득점: '14',
    실점: '21',
    득실차: '-7'
  },

  수원: {
    순위: '11',
    팀: '수원',
    경기: '16',
    승점: '15',
    승: '3',
    무: '6',
    패: '7',
    득점: '14',
    실점: '19',
    득실차: '-5'
  },

  대구: {
    순위: '12',
    팀: '대구',
    경기: '16',
    승점: '11',
    승: '3',
    무: '2',
    패: '11',
    득점: '17',
    실점: '28',
    득실차: '-11'
  },
};

let tbody = document.getElementById('ranking');

for (let team in rankingData) {
  let data = rankingData[team];

  let tr = document.createElement('tr');

  // 각 열 생성 및 삽입
  let keys = ['순위', '팀', '경기', '승점', '승', '무', '패', '득점', '실점', '득실차'];
  keys.forEach(key => {
    let td = document.createElement('td');
    td.textContent = data[key];
    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

document.addEventListener('DOMContentLoaded', function () {
  const apiButton = document.querySelector('.secondary_visual_wrap_api');
  apiButton.addEventListener('click', openMapModal);
});

function openMapModal() {
  const modal = document.getElementById('mapModal');
  modal.style.display = 'flex';

  setTimeout(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.5683, 126.8974),
      zoom: 15
    };

    const map = new naver.maps.Map('map', mapOptions);

    new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5683, 126.8974),
      map: map
    });
  }, 200);
}

function closeMapModal() {
  document.getElementById('mapModal').style.display = 'none';
}