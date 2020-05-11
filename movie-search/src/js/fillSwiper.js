import swiper from './swiper';
import doSlide from './doSlide';
import state from '../index';
// 552647f3
//49ee8599
const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');
const cyrillicReg = /^[А-ЯЁ][а-яё]*$/i;
const spinner = document.querySelector('#spinner');

let errorWindow = document.querySelector('.info');

export default async function getMovieSlides(word, page, newWord) {
  spinner.style.display = 'block';
  errorWindow.innerText = '';
  const url = `https://www.omdbapi.com/?s=${word}&apikey=552647f3&page=${page}&type=movie`;
  const res = await fetch(url);
  const data = await res.json();
  state.countPage = Math.ceil(Number(data.totalResults) / 10);
  if (data.Response === 'True') {
    const card = data.Search.map((item) => doSlide(item, page));
    await Promise.all(card);
    if (newWord) {
      swiper.removeAllSlides();
    }
    card.forEach((item) => item.then((result) => {
      swiper.appendSlide(result);
    }));
    errorWindow.innerText = `Showing results for "${word}"(${data.totalResults} titles)`;
  } else {
    if (data.Error === 'Movie not found!') {
      errorWindow.innerText = `No results for "${word}"`;
    }
    if (data.Error === 'Too many results.') {
      errorWindow.innerText = `There are too many results to "${word}" search`;
    }
    if (data.Error === 'Something went wrong.') {
      errorWindow.innerText = 'You did not enter a search query';
    }
  }
  spinner.style.display = 'none';
}

