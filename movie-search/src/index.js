import '@babel/polyfill';


import Swiper from '../node_modules/swiper/js/swiper.min';

const fetch = require('node-fetch');

const swiper = new Swiper('.swiper-container', {
  loop: false,
  spaceBetween: 80,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
    },
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


const buttonSearch = document.querySelector('.search-button');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const buttonClear = document.querySelector('.clear-button');

const clearSwiper = (swiperSlides) => {
  while (swiperSlides.firstChild) {
    swiperSlides.removeChild(swiperSlides.firstChild);
  }
};
async function getRating(imdbiD) {
  const url = `https://www.omdbapi.com/?i=${imdbiD}&apikey=49ee8599`;
  const res = await fetch(url);
  const data = await res.json();
  return data.imdbRating;
}

async function getMovieTitle(word) {
  document.querySelector('.info').innerText = '';
  const url = `https://www.omdbapi.com/?s=${word}&apikey=49ee8599`;
  const res = await fetch(url);
  const data = await res.json(); // объект фильмов
  if (data.Response === 'True') {
    clearSwiper(swiperWrapper);
    data.Search.forEach(async (item) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('swiper-slide');

      const cardLink = document.createElement('a');
      cardLink.href = `https://www.imdb.com/title/${item.imdbID}/videogallery`;
      cardLink.target = '_blank';
      cardLink.innerText = item.Title;
      cardLink.classList.add('card-header');

      const cardImage = document.createElement('img');
      cardImage.classList.add('card-body');
      cardImage.alt = 'poster';
      cardImage.src = item.Poster === 'N/A' ? '../assets/image/no-poster.jpg' : item.Poster;
      const cardFooter = document.createElement('div');
      cardFooter.classList.add('card-footer');
      cardFooter.innerText = item.Year;

      const cardRating = document.createElement('p');
      cardRating.innerText = await getRating(item.imdbID);
      cardFooter.append(cardRating);

      card.append(cardLink);
      card.append(cardImage);
      card.append(cardFooter);

      swiper.appendSlide(card);
    // swiper.update();
    });
    document.querySelector('.info').innerText = `Showing results for "${word}"`;
  } else {
    if (data.Error === 'Movie not found!') {
      document.querySelector('.info').innerText = `No results for "${word}"`;
    }
    if (data.Error === 'Too many results.') {
      document.querySelector('.info').innerText = `There are too many results to "${word}" search`;
    }
    if (data.Error === 'Something went wrong.') {
      document.querySelector('.info').innerText = 'You did not enter a search query';
    }
  }
}
getMovieTitle('rock');

// проверка языка
async function languageСheck(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T075924Z.16bef609e3b7f7e4.bb4d2ed3596546da694c76a845f50ad6c2ef19e1&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  getMovieTitle(data.text.join());
  document.querySelector('.info').innerText = `Showing results for "${data.text.join()}"`;
}

// на кнопку сеарч
buttonSearch.addEventListener('click', () => {
  const word = document.querySelector('.search-input').value;
  if (word.length>0){
    if ((word[0].charCodeAt() > 1040) && (word[0].charCodeAt() < 1103)) {
      languageСheck(word);
    } else {
      getMovieTitle(word);
    }
  }
});

// на ентер
document.addEventListener('keydown', (event) => {
  const buttonKeyboard = event.key;
  if (buttonKeyboard === 'Enter') {
    event.preventDefault();
    const word = document.querySelector('.search-input').value;
    if (word.length>0){
      if ((word[0].charCodeAt() > 1040) && (word[0].charCodeAt() < 1103)) {
        languageСheck(word);
      } else {
        getMovieTitle(word);
      }
    }
  }
});

// очистка
buttonClear.addEventListener('click', () => {
  document.querySelector('.search-input').value = '';
});
