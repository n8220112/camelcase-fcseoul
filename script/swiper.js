const progressLines = document.querySelectorAll(".progress-line");

const swiperMain = new Swiper(".mainVisual", {
  rewind: true,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(swiper, time, progress) {
      progressLines.forEach((line, index) => {
        const bar = line.querySelector("::before");
        const before = line.querySelector(".bar");
        if (!before) return;
        
        let slideNumber = document.querySelectorAll('.slide_info p')
        let slideTitle = document.querySelectorAll('.slide_info_title')
        if (index === swiper.realIndex) {
          before.style.width = `${(1 - progress) * 100}%`;
          before.style.transition = `width ${time}ms linear`;
          progressLines[index].classList.add('active');
          slideNumber[index].classList.add('active');
          slideTitle[index].classList.add('active');
        } else {
          before.style.width = `0%`;
          before.style.transition = `none`;
          progressLines[index].classList.remove('active');
          slideNumber[index].classList.remove('active');
          slideTitle[index].classList.remove('active');
        }
      });
    },
  },
});

progressLines.forEach(line => {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.position = "absolute";
  bar.style.left = 0;
  bar.style.top = 0;
  bar.style.height = "100%";
  bar.style.width = "0%";
  bar.style.backgroundColor = "var(--redpoint)";
  bar.style.transition = "width 0s linear";
  line.appendChild(bar);
});


/********** 타이머 ***********/
function startCountdown(durationInSeconds) {
  //durationInSeconds 전체타이머시간 (초)
  let timer = durationInSeconds;
  //선택
  let date = document.getElementById('countdown_date');
  let hour = document.getElementById('countdown_hour');
  let minute = document.getElementById('countdown_minute');
  let second = document.getElementById('countdown_second');
  let interval = setInterval(() => {
    /* 일 */
    //1일 = 86400초 -> 전체시간을 86400로 나눠서 소수점 버리면 일
    let dates = Math.floor(timer / 86400);
    /* 시간 */
    //1시간 = 3600초 -> 하루를 3600으로 나누면 시
    let hours = Math.floor((timer % 86400) / 3600);
    /* 분 */
    //1시간을 다시 60으로 나누면 분
    let minutes = Math.floor((timer % 3600) / 60);
    /* 초 */
    //타이머 자체를 60으로 나누면 초
    let seconds = timer % 60;
    /* 각 값을 문자열로 변환하고 두자리로 맞춤 */
    let d = String(dates).padStart(2, '0');
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    /* 문서의 제자리에 쑤셔넣기 */
    date.textContent = d;
    hour.textContent = h;
    minute.textContent = m;
    second.textContent = s;
    /* 여기 밑에 하단부는 바로 선택해서 넣기 */
    document.getElementById('countdown_date02').textContent = d;
    document.getElementById('countdown_hour02').textContent = h;
    document.getElementById('countdown_minute02').textContent = m;
    document.getElementById('countdown_second02').textContent = s;
    if (timer > 0) { timer-- } else { clearInterval(interval) };
  }, 1000)
};
startCountdown(965463);


/********** MEMBERS **********/
var swiper = new Swiper(".memberSwiper", {
  // slidesPerView: 2.85,
  slidesPerView: 'auto', // 자동 너비 사용
  spaceBetween: 37,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let members_buttons = document.querySelectorAll(".members_header_inner_position button");
let swipers = document.querySelectorAll(".memberSwiper");

members_buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    reset(index);
  })
})

/* 초기화 */
reset(0);
function reset(index) {
  for (sw of swipers) {
    sw.style.display = "none";
  }
  for (mb of members_buttons) {
    mb.classList.remove("active");
  }
  swipers[index].style.display = "block";
  members_buttons[index].classList.add("active");
}

/********** SNS **********/
var swiper = new Swiper(".snsSwiper", {
  slidesPerView: 2,
  spaceBetween: 5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 9,
      spaceBetween: 10,
    },
  },
});

/* 인스스 */
const images = Array.from(document.querySelectorAll(".swiper-slide img"));
const modal = document.getElementById("storyModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal .close");

let currentIndex = 0;
let intervalId = null;

// 모달 열기
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showModalImage(currentIndex);
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    resetInterval(); // 자동 넘김 시작 및 타이머 초기화
  });
});

// 이미지 변경 함수
function showModalImage(index) {
  modalImg.style.opacity = 0;
  setTimeout(() => {
    modalImg.src = images[index].src;
    modalImg.style.opacity = 1;
  }, 200);
}

// 모달 닫기
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = 'auto';
  clearInterval(intervalId);
}


function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showModalImage(currentIndex);
  }, 3000);
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showModalImage(currentIndex);
  resetInterval();  // ← 타이머 재시작
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showModalImage(currentIndex);
  resetInterval();  // ← 타이머 재시작
});



/* 재생중지 */
let isPlaying = true; // 자동 재생 상태 추적

const togglePlayBtn = document.getElementById("togglePlay");

function startInterval() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showModalImage(currentIndex);
  }, 3000);
}

function stopInterval() {
  clearInterval(intervalId);
}

togglePlayBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopInterval();
    togglePlayBtn.textContent = "▶️";
  } else {
    startInterval();
    togglePlayBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});
