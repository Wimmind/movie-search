import '@babel/polyfill';
import swiper from './js/swiper';
import languageСheck from './js/languageCheck';
import getMovieSlides from './js/fillSwiper';

const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');


const ruRe = new RegExp('(^[А-я0-9]+)(?!.*[A-z])$');

let currentPage = 1;

// bea3a778


swiper.on('slideChange', () => {
  const word = document.querySelector('.search-input').value;
  if (word === '') {
    return false;
  }
  if ((window.innerWidth <= 700) && (swiper.activeIndex === 9)) {
    currentPage += 1;
    getMovieSlides(word, currentPage);
  }
  if ((window.innerWidth > 700 && window.innerWidth <= 1200) && (swiper.activeIndex === 8)) {
    currentPage += 1;
    getMovieSlides(word, currentPage);
  }
  if ((window.innerWidth > 1200 && window.innerWidth <= 1600) && (swiper.activeIndex === 7)) {
    currentPage += 1;
    getMovieSlides(word, currentPage);
  }
  if ((window.innerWidth > 1600) && (swiper.activeIndex === 6)) {
    currentPage += 1;
    getMovieSlides(word, currentPage);
  }
  return false;
});


// на кнопку сеарч
buttonSearch.addEventListener('click', () => {
  currentPage = 1;
  const word = document.querySelector('.search-input').value;
  if (ruRe.test(word)) {
    languageСheck(word);
  } else {
    getMovieSlides(word);
  }
});

// на ентер
document.addEventListener('keydown', (event) => {
  currentPage = 1;
  if (event.key === 'Enter') {
    event.preventDefault();
    const word = document.querySelector('.search-input').value;
    if (ruRe.test(word)) {
      languageСheck(word);
    } else {
      getMovieSlides(word);
    }
  }
});

// очистка
buttonClear.addEventListener('click', () => {
  document.querySelector('.search-input').value = '';
});
