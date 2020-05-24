import '@babel/polyfill';
import swiper from './js/swiper';
import { buttonSearch,buttonClear,spinner,inputWord,state } from './js/variables';
import showKeyboard from './js/keyboard';
import getMovieSlides from './js/fillSwiper';
import addNewPage from './js/addNewPage';
import microphoneActivated from './js/audioMicro';
import makeRequest from './js/makeRequest';


async function firstRequest() {
  try {
    await getMovieSlides(state.currentWord, state.currentPage, false);
  } catch (err) {
    document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
  } finally {
    spinner.style.display = 'none';
  }
}
firstRequest();

swiper.on('reachEnd ', () => {
    state.currentPage += 1;
    addNewPage(state.currentWord, state.currentPage);
});


buttonSearch.addEventListener('click', async (event) => {
  event.preventDefault();
  state.currentPage = 1;
  state.currentWord = inputWord.value;
  makeRequest(state.currentWord, state.currentPage, true);
});


document.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    buttonSearch.click();
  }
});


buttonClear.addEventListener('click', () => {
  inputWord.value = '';
  inputWord.focus();
});

document.querySelector('.keyboard-button').addEventListener('click', () => {
  document.querySelector('.keyboard-wrapper').classList.toggle('keyboard-hidden');
  showKeyboard();
  inputWord.focus();
});

microphoneActivated();