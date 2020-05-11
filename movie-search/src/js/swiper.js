import Swiper from '../../node_modules/swiper/js/swiper.min';

const swiper = new Swiper('.swiper-container', {
  loop: false,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  centerInsufficientSlides: true,
  slidesPerView: 1,
  breakpoints: {
    700: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1660: {
      slidesPerView: 4,
    },
  },
});

export default swiper;
