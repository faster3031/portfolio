window.onload = function () {
  AOS.init();

  // 스크롤 기능
  // 스크롤바의 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector(".header");
  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
  });
  header.addEventListener("mouseleave", function () {
    if (scy < scActive) {
      header.classList.remove("header-active");
    }
  });
  // 새로고침시
  if (scy > scActive) {
    header.classList.add("header-active");
  }
  window.addEventListener("scroll", function () {
    scy = window.document.documentElement.scrollTop;
    // console.log("스크롤:" + scy);
    if (scy > scActive) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }
  });
  // 클릭스크롤
  const navbar = document.querySelectorAll(".header-right > div");
  const goPortfolio = document.querySelector(".vmw");
  navbar.forEach((navbarItem) =>
    navbarItem.addEventListener("click", (e) => {
      link = e.currentTarget.dataset.link;
      scrollIntoView(link);
    })
  );
  goPortfolio.addEventListener("click", () => {
    scrollIntoView(goPortfolio.dataset.link);
  });
  //스킬 툴 스크롤 감지
  const SNT = document.querySelector(".snt-box");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedProgressSpans = document.querySelectorAll(
          ".animated-progress span"
        );
        animatedProgressSpans.forEach(function (span) {
          const dataProgress = span.getAttribute("data-progress");
          span.style.width = dataProgress + "%";
          span.textContent = dataProgress + "%";
          const duration = 1000;
          const start = performance.now();
          const end = start + duration;
          function animate() {
            const now = performance.now();
            const timeFraction = (now - start) / duration;
            if (timeFraction > 1) {
              span.style.width = dataProgress + "%";
              return;
            }
            const progress = timeFraction;
            span.style.width = progress * dataProgress + "%";
            requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      }
    });
  });
  observer.observe(SNT);
  //   console.log(SNT);
  // // 스크롤 이동 함수
  function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
  // 위로가기 스크롤바 구현
  const gotop = document.querySelector(".gotop");
  gotop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
      header.classList.add("active");
      mbt.classList.add("active");
    } else {
      const state = navMb.classList.contains("active");
      if (state) {
        // 만약에 모바일 메뉴가 펼쳐진 상태라면
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        // 그렇지 않다면 원래대로 처리하고..
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    }
  });
  // 모바일 메뉴 클릭 처리
  const mbt = document.querySelector(".mbt");
  const htmlRoot = document.querySelector("html");
  const navMb = document.querySelector(".nav-mb");
  mbt.addEventListener("click", function () {
    // 현재 ani클래스가 있는지 없는지 파악
    const state = this.classList.contains("ani");
    if (state) {
      this.classList.remove("ani");
      // 윈도우에 스크롤바가 나타납니다.
      htmlRoot.classList.remove("active");
      // 모바일 메뉴 숨기기
      navMb.classList.remove("active");
      if (scy > 0) {
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    } else {
      this.classList.add("ani");
      htmlRoot.classList.add("active");
      navMb.classList.add("active");
      header.classList.add("active");
      mbt.classList.add("active");
    }
  });
  // 반응형 처리
  let winW = window.innerWidth;
  window.addEventListener("resize", function () {
    // 웹브라우저 안쪽 너비
    winW = window.innerWidth;
    // mobile ===> pc 전환
    if (winW > 1024) {
      mbt.classList.remove("ani");
      htmlRoot.classList.remove("active");
      navMb.classList.remove("active");

      if (scy > 0) {
        // 스크롤이 된 상태에서 화면 리사이징..
        header.classList.add("active");
        mbt.classList.add("active");
      } else {
        // 스크롤 안됨. 화면 리사이징..
        header.classList.remove("active");
        mbt.classList.remove("active");
      }
    }
  });
  // gotop
  let waypoint_footer = new Waypoint({
    element: document.querySelector(".footer"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active-footer");
      } else {
        gotop.classList.remove("active-footer");
      }
    },
    offset: "95%",
  });

  let waypoint_service = new Waypoint({
    element: document.querySelector(".visual"),
    handler: function (direction) {
      // console.log(direction);
      if (direction === "down") {
        gotop.classList.add("active");
      } else {
        gotop.classList.remove("active");
      }
    },
    offset: "80%",
  });
  // // json파일 로드 및 데이터 출력
  // fetch("data.json")
  // .then((response) => response.json())
  //   .then((data) => {
  //     const portfolioItems = data.portfolioItems; //json에서 포트폴리오 항목 데이터를 가져옴
  //     const dataVisual = document.getElementById("data-visual");
  //     portfolioItems.forEach((item) => {
  //       const slide = document.createElement("div");
  //       slide.className = "swiper-slide";
  //       slide.innerHTML = `
  //        <div class="project">
  //          <div class="pj-img">
  //              <img src="${item.src}" class"stx-gif"/>
  //          </div>
  //          <div class="study-project">
  //              <h2 class="pp">${item.h}</h2>
  //              <h1>${item.title}</h1>
  //              <p>${item.date}</p>
  //              <span>
  //                  제작 인원: ${item.contributors} <br />
  //                  사용 프로그램: ${item.technologies}
  //              </span>
  //              <div class="swiper-btn">
  //              <a href="${
  //                item.link.work || item.link.Notion
  //              }" target="_blank">${item.link.workLabel}</a>
  //              <a href="${
  //                item.link.github || item.link.GitHub
  //              }" target="_blank">${item.link.githubLabel}</a>
  //              <a href="${
  //                item.link.origin || item.link.Figma
  //              }" target="_blank">${item.link.originLabel}</a>
  //              </div>
  //          </div>
  //        </div>
  //        `;
  //       dataVisual.appendChild(slide);
  //     });
  //     // Swiper 슬라이더 초기화 코드 추가
  //     new Swiper(".swVisual", {
  //       slidesPerView: 1,
  //       spaceBetween: 10,
  //       navigation: {
  //         prevEl: ".swiper-button-prev",
  //         nextEl: ".swiper-button-next",
  //       },
  //       // 추가적인 Swiper 설정을 여기에 추가할 수 있습니다.
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("JSON 파일 로드 중 오류 발생:", error);
  //   });
    // 모든 클래스가 myLink를 가진 요소들을 선택
    var links = document.querySelectorAll('.myLink');

    // 각 링크에 대해 이벤트 리스너를 추가
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 동작을 막음
            var target = this.parentElement.getAttribute('data-link'); // data-link 속성 값 가져옴
        });
    });
    document.addEventListener("DOMContentLoaded", function() {
      var links = document.querySelectorAll('[data-link]');
    
      links.forEach(function(link) {
        link.addEventListener('click', function(event) {
          event.preventDefault();
    
          // data-link 속성 값을 가져옵니다.
          var targetClass = this.getAttribute('data-link');
    
          // 클래스 이름으로 해당 섹션들을 선택합니다.
          var targetSections = document.querySelectorAll('.' + targetClass);
          
          // 선택한 모든 섹션에 대해 스크롤링합니다.
          targetSections.forEach(function(section) {
            section.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
    });
};