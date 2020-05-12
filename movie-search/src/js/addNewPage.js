
import { state,spinner } from './variables';

import getMovieSlides from './fillSwiper';
import languageСheck from './languageCheck';
import hasRusLetters from './hasRusLetters';

export default async function addNewPage(currentWord, currentPage) {
  if (currentPage <= state.countPage) {
    try {
      if (hasRusLetters(currentWord)) {
        await languageСheck(currentWord, currentPage, false);
      } else {
        await getMovieSlides(currentWord, currentPage, false);
      }
    } catch (err) {
      document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
    } finally {
      spinner.style.display = 'none';
    }
  }
}
