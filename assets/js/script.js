// Navbar Toggle and Close
(function () {
  function toggleNav() {
    const navMenu = document.getElementById("nav");
    navMenu.classList.toggle("active");
  }

  function closeNav() {
    const navMenu = document.getElementById("nav");
    navMenu.classList.remove("active");
  }

  // Close navbar on scroll
  window.addEventListener("scroll", () => {
    const navMenu = document.getElementById("nav");
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  });

  // Export toggleNav and closeNav if needed elsewhere
  window.toggleNav = toggleNav;
  window.closeNav = closeNav;
})();

// Sticky Header using Intersection Observer
(function () {
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");
  const navHeight = nav.getBoundingClientRect().height;

  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
  });

  headerObserver.observe(header);
})();

// Hero Slider Functionality
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    let currentSlide = 0;
    let autoSlideInterval;

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove("active", "prev");
        if (index === currentSlide) {
          slide.classList.add("active");
        } else if (
          index ===
          (currentSlide - 1 + slides.length) % slides.length
        ) {
          slide.classList.add("prev");
        }
      });
    }

    function goToNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }

    function goToPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(goToNextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    nextButton.addEventListener("click", () => {
      goToNextSlide();
      resetAutoSlide();
    });

    prevButton.addEventListener("click", () => {
      goToPrevSlide();
      resetAutoSlide();
    });

    updateSlides();
    startAutoSlide();
  });
})();

// Introduction Section Slider
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const introSlides = document.querySelectorAll(".intro-slide");
    const introPrevButton = document.querySelector(".slider-btn-before");
    const introNextButton = document.querySelector(".slider-btn-after");
    let currentIndex = 0;

    function updateIntroSlides() {
      introSlides.forEach((slide, index) => {
        slide.classList.remove("activate");
        if (index === currentIndex) {
          slide.classList.add("activate");
        }
      });
    }

    function showNextIntroSlide() {
      currentIndex = (currentIndex + 1) % introSlides.length;
      updateIntroSlides();
    }

    function showPrevIntroSlide() {
      currentIndex =
        (currentIndex - 1 + introSlides.length) % introSlides.length;
      updateIntroSlides();
    }

    introNextButton.addEventListener("click", showNextIntroSlide);
    introPrevButton.addEventListener("click", showPrevIntroSlide);

    setInterval(showNextIntroSlide, 5000);
  });
})();

// Image Carousel (Multiple Slides)
(function () {
  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    const carousel = document.getElementById("carousel");
    const slidesToShow = 3;
    const slideWidth = 27;
    const totalSlides = carousel.children.length;

    if (index > totalSlides - slidesToShow) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - slidesToShow;
    } else {
      currentIndex = index;
    }

    const offset = -currentIndex * slideWidth;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
    startAutoSlide();
  });

  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
})();

// Testimonial Section Slider
(function () {
  const slider = function () {
    const slides = document.querySelectorAll(".slide__2");
    const btnRight = document.querySelector(".slider__btn--right");
    const btnleft = document.querySelector(".slider__btn--left");
    const dotContainer = document.querySelector(".dots");

    let curSlide = 0;
    let maxSlide = slides.length;

    const createDots = function () {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };

    const activateDot = function (slide) {
      document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };

    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }

      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }

      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const init = function () {
      goToSlide(0);
      createDots();
      activateDot(0);
    };

    init();

    btnRight.addEventListener("click", nextSlide);
    btnleft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };

  slider();
})();

// Section Reveal/Scroll-In with Intersection Observer
(function () {
  const allSections = document.querySelectorAll(".section");

  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
})();

// Statistics Counting
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const increment = target / 100;

      const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 50);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    });
  });
})();
