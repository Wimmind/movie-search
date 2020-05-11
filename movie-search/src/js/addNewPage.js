import state from '../index';
import getMovieSlides from './fillSwiper';
import languageСheck from './languageCheck';
const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');
const cyrillicReg = /^[А-ЯЁ][а-яё]*$/i;
const spinner = document.querySelector('#spinner');

export default async function addNewPage(currentWord, currentPage) {
    if (currentPage<=state.countPage){
        try {
            if (cyrillicReg.test(currentWord)) {
              await languageСheck(currentWord,currentPage,false);
            } else {
              await getMovieSlides(currentWord,currentPage,false);
            }
          } catch (err) {
            document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
            console.error('Something went wrong', err);
          } finally {
            spinner.style.display = 'none';
          }
    }
}