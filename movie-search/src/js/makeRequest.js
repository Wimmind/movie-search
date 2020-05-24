import { spinner } from './variables';
import hasRusLetters from './hasRusLetters'
import languageСheck from './languageCheck';
import getMovieSlides from './fillSwiper';

export default async function makeRequest(currentWord, currentPage,newWord) {
    try {
        if (hasRusLetters(currentWord)) {
            await languageСheck(currentWord, currentPage, newWord);
        } else {
            await getMovieSlides(currentWord, currentPage, newWord);
        }
        } catch (err) {
            document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
        } finally {
            spinner.style.display = 'none';
    }
  }