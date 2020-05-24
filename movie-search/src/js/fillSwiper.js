import { state,spinner,errorWindow } from './variables';
import swiper from './swiper';
import doSlide from './doSlide';
import showError from './showError';

export default async function getMovieSlides(word, page, newWord) {
  spinner.style.display = 'block';
  errorWindow.innerText = '';
  const url = `https://www.omdbapi.com/?s=${word}&apikey=49ee8599&page=${page}&type=movie`;
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
    errorWindow.innerText = showError(data.Error,word);
  }
  spinner.style.display = 'none';
}
