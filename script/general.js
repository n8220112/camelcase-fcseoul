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
      } else { mobileMenuWrap.style.display = 'block'; }
    });
    mobileClose.addEventListener('click', function () {
      if (mobileMenuWrap.style.display === 'none') {
        mobileMenuWrap.style.display = 'block';
      } else { mobileMenuWrap.style.display = 'none'; }
    });

    /********** 로그인 모달 **********/
    
    document.querySelector('.btn_login').addEventListener('click', function () {
      document.getElementById('login_modal').style.display = "block";
    });
    document.querySelector('.btn_login_mobile').addEventListener('click', function () {
      document.getElementById('login_modal').style.display = "block";
    });
    document.querySelector('.close_btn').addEventListener('click', function () {
      document.getElementById('login_modal').style.display = "none";
    });
    document.getElementById('login_submit').addEventListener('click', function () {
      document.getElementById('login_modal').style.display = "none";
    });


/* ##########푸터 영역########## */