import '@babel/polyfill';
import swiper from './js/swiper';
import { buttonSearch,buttonClear,spinner,inputWord,state } from './js/variables';
import showKeyboard from './js/keyboard';
import languageСheck from './js/languageCheck';
import getMovieSlides from './js/fillSwiper';
import addNewPage from './js/addNewPage';
import hasRusLetters from './js/hasRusLetters'


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
  try {
    if (hasRusLetters(state.currentWord)) {
      await languageСheck(state.currentWord, state.currentPage, true);
    } else {
      await getMovieSlides(state.currentWord, state.currentPage, true);
    }
  } catch (err) {
    document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
  } finally {
    spinner.style.display = 'none';
  }
});


document.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    state.currentPage = 1;
    state.currentWord = inputWord.value;
    event.preventDefault();
    try {
      if (hasRusLetters(state.currentWord)) {
        await languageСheck(state.currentWord, state.currentPage, true);
      } else {
        await getMovieSlides(state.currentWord, state.currentPage, true);
      }
    } catch (err) {
      document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
    } finally {
      spinner.style.display = 'none';
    }
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


window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const microphoneBtn = document.querySelector('.micro-button');
const recognition = new window.SpeechRecognition();

recognition.interimResults = false;
recognition.maxAlternatives = 2;
recognition.continuous = false;

recognition.onresult = (event) => {
  for (let i = event.resultIndex, len = event.results.length; i < len; i += 1) {
    const { transcript } = event.results[i][0];
    if (event.results[i].isFinal) {
      inputWord.value = transcript;
    } else {
      inputWord.value = transcript;
    }
  }
  microphoneBtn.classList.remove('microphone-active');
  buttonSearch.click();
};

recognition.onaudioend = () => {
  microphoneBtn.classList.remove('microphone-active');
};

const microphoneActivated = () => {
  microphoneBtn.addEventListener('click', () => {
    if (!microphoneBtn.classList.contains('microphone-active')) {
      microphoneBtn.classList.add('microphone-active');
      recognition.start();
    } else {
      microphoneBtn.classList.remove('microphone-active');
      recognition.stop();
    }
  });
};

microphoneActivated();
