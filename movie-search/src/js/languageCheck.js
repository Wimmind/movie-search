import getMovieSlides from './fillSwiper';

export default async function languageСheck(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200502T075924Z.16bef609e3b7f7e4.bb4d2ed3596546da694c76a845f50ad6c2ef19e1&text=${word}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  getMovieSlides(data.text.join());
  document.querySelector('.search-input').value = `${data.text.join()}`;
}
