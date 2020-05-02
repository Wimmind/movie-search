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
const buttonClear = document.querySelector('.clear-button');


async function getRating(imdbiD) {
  const url = `https://www.omdbapi.com/?i=${imdbiD}&apikey=bea3a778`;
  const res = await fetch(url);
  const data = await res.json();
  return data.imdbRating;
}

const spinner = document.querySelector('#spinner');



let toSlide = async (film)=> {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('swiper-slide');

  const cardLink = document.createElement('a');
  cardLink.href = `https://www.imdb.com/title/${film.imdbID}/videogallery`;
  cardLink.target = '_blank';
  cardLink.innerText = film.Title;
  cardLink.classList.add('card-header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-body');
  cardImage.alt = 'poster';
  cardImage.src = film.Poster === 'N/A' ? '../assets/image/no-poster.jpg' : film.Poster;
  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer');
  cardFooter.innerText = film.Year;

  const cardRating = document.createElement('p');
  cardRating.innerText = await getRating(film.imdbID);
  cardFooter.append(cardRating);

  card.append(cardLink);
  card.append(cardImage);
  card.append(cardFooter);
  return card;
}

async function getMovieSlides(word) {

  spinner.style.display = 'block';

  document.querySelector('.info').innerText = '';
  const url = `https://www.omdbapi.com/?s=${word}&apikey=bea3a778`;
  const res = await fetch(url);
  const data = await res.json(); // объект фильмов
  if (data.Response === 'True') {
    const card = data.Search.map((item)=> toSlide(item));
    
    await Promise.all(card);
    //swiper.removeAllSlides();
    card.forEach(item => item.then(result => swiper.appendSlide(result)))
    document.querySelector('.info').innerText = `Showing results for "${word}"`;
    swiper.slideTo(0);
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
  spinner.style.display = 'none';
}

getMovieSlides('love');
//49ee8599

// проверка языка
async function languageСheck(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T075924Z.16bef609e3b7f7e4.bb4d2ed3596546da694c76a845f50ad6c2ef19e1&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  getMovieSlides(data.text.join());
}

// на кнопку сеарч
buttonSearch.addEventListener('click', () => {
  const word = document.querySelector('.search-input').value;
  if (word.length>0){
    if ((word[0].charCodeAt() > 1040) && (word[0].charCodeAt() < 1103)) {
      languageСheck(word);
    } else {
      getMovieSlides(word);
    }
  }
});

// на ентер
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const word = document.querySelector('.search-input').value;
    if (word.length>0){
      if ((word[0].charCodeAt() > 1040) && (word[0].charCodeAt() < 1103)) {
        languageСheck(word);
      } else {
        getMovieSlides(word);
      }
    }
  }
});

// очистка
buttonClear.addEventListener('click', () => {
  document.querySelector('.search-input').value = '';
});
