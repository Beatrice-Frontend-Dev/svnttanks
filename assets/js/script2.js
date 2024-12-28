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
