import { buttonSearch,inputWord } from './variables';

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

export default microphoneActivated;