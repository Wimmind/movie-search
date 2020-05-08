import '@babel/polyfill';
import swiper from './js/swiper';

const ruRe = new RegExp('(^[А-я]+)(?!.*[A-z])$');
import showKeyboard from './js/keyboard';


import languageСheck from './js/languageCheck';
import getMovieSlides from './js/fillSwiper';

const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');


let currentPage = 1;

let newWord = false;
// bea3a778


swiper.on('slideChange', () => {
  newWord = false;
  const word = document.querySelector('.search-input').value;
  if (swiper.activeIndex >=(swiper.slides.length - 5)){
    currentPage += 1;
    getMovieSlides(word, currentPage,newWord);
  }
});


// на кнопку сеарч
buttonSearch.addEventListener('click', () => {
  newWord = true;
  currentPage = 1;
  const word = document.querySelector('.search-input').value;
  if (ruRe.test(word)) {
    languageСheck(word,currentPage,newWord);
  } else {
    getMovieSlides(word,currentPage,newWord);
  }
});

// на ентер
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    newWord = true;
    currentPage = 1;
    const word = document.querySelector('.search-input').value;
    if (ruRe.test(word)) {
      languageСheck(word,currentPage,newWord);
    } else {
      getMovieSlides(word,currentPage,newWord);
    }
  }
})

// очистка
buttonClear.addEventListener('click', () => {
  document.querySelector('.search-input').value = '';
  document.querySelector('.search-input').focus();
});

document.querySelector('.keyboard-button').addEventListener('click', () => {
  document.querySelector('.keyboard-wrapper').classList.toggle('keyboard-hidden');
  showKeyboard();
  document.querySelector('.search-input').focus();
});
