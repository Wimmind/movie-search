import '@babel/polyfill';
import swiper from './js/swiper';

const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');
const cyrillicReg = /^[А-ЯЁ][а-яё]*$/i;
const spinner = document.querySelector('#spinner');

import showKeyboard from './js/keyboard';
import languageСheck from './js/languageCheck';
import getMovieSlides from './js/fillSwiper';
import addNewPage from './js/addNewPage';


let inputWord = document.querySelector('.search-input');

let currentWord = 'crank';
let currentPage = 1;


export default {countPage:1};

async function firstRequest(){
  try {
    await getMovieSlides(currentWord, currentPage,false);
  } catch (err) {
    document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
    console.error('Something went wrong', err);
  } finally {
    spinner.style.display = 'none';
  }
}
firstRequest()

swiper.on('slideChange', () => {
  if (swiper.activeIndex >=(swiper.slides.length - 5)){
    currentPage += 1;
    addNewPage(currentWord, currentPage);
  }
});


// на кнопку сеарч
buttonSearch.addEventListener('click', async(event) => {
  event.preventDefault();
  currentPage = 1;
  currentWord = inputWord.value;
  try {
    if (cyrillicReg.test(currentWord)) {
      await languageСheck(currentWord,currentPage,true);
    } else {
      await getMovieSlides(currentWord,currentPage,true);
    }
  } catch (err) {
    document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
    console.error('Something went wrong', err);
  } finally {
    spinner.style.display = 'none';
  }
});

// на ентер
document.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    currentPage = 1;
    currentWord = inputWord.value;
    event.preventDefault();
    try {
      if (cyrillicReg.test(currentWord)) {
        await languageСheck(currentWord,currentPage,true);
      } else {
        await getMovieSlides(currentWord,currentPage,true);
      }
    } catch (err) {
      document.querySelector('.info').innerText = `Something went wrong, ${err.message}`;
      console.error('Something went wrong', err);
    } finally {
      spinner.style.display = 'none';
    }
  }
})

// очистка
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
