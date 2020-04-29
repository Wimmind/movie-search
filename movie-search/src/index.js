import Swiper from '../node_modules/swiper/js/swiper';

const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  grabCursor: true,
  breakpoints: {
    50: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1660: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

