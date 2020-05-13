import {buttonSearch,inputWord} from './variables';

export default function showKeyboard() {
  const divWrapper = document.querySelector('.keyboard-wrapper');
  divWrapper.innerHTML = '';

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const hiddenButton = document.createElement('div');
  hiddenButton.classList.add('clear-button_keyboard');

  divWrapper.append(hiddenButton);
  divWrapper.append(keyboard);

  const buttons = [
    [
      ['Backquote', 'ё', 'Ё', '`', '~'], ['Digit1', '1', '!', '1', '!'], ['Digit2', '2', '"', '2', '@'], ['Digit3', '3', '№', '3', '#'], ['Digit4', '4', ';', '4', '$'],
      ['Digit5', '5', '%', '5', '%'], ['Digit6', '6', ':', '6', '^'], ['Digit7', '7', '?', '7', '&'], ['Digit8', '8', '*', '8', '*'], ['Digit9', '9', '(', '9', '('],
      ['Digit0', '0', ')', '0', ')'], ['Minus', '-', '_', '-', '_'], ['Equal', '=', '+', '=', '+'], ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace'],
    ],
    [
      ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'], ['KeyQ', 'й', 'Й', 'q', 'Q'], ['KeyW', 'ц', 'Ц', 'w', 'W'], ['KeyE', 'у', 'У', 'e', 'E'], ['KeyR', 'к', 'К', 'r', 'R'],
      ['KeyT', 'е', 'Е', 't', 'T'], ['KeyY', 'н', 'Н', 'y', 'Y'], ['KeyU', 'г', 'Г', 'u', 'U'], ['KeyI', 'ш', 'Ш', 'i', 'I'], ['KeyO', 'щ', 'Щ', 'o', 'O'], ['KeyP', 'з', 'З', 'p', 'P'],
      ['BracketLeft', 'х', 'Х', '[', '{'], ['BracketRight', 'ъ', 'Ъ', ']', '}'], ['Backslash', '\\', '/', '\\', '|'], ['Delete', 'Del', 'Del', 'Del', 'Del'],
    ],
    [
      ['CapsLock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'], ['KeyA', 'ф', 'Ф', 'a', 'A'], ['KeyS', 'ы', 'Ы', 's', 'S'], ['KeyD', 'в', 'В', 'd', 'D'],
      ['KeyF', 'а', 'А', 'f', 'F'], ['KeyG', 'п', 'П', 'g', 'G'], ['KeyH', 'р', 'Р', 'h', 'H'], ['KeyJ', 'о', 'О', 'j', 'J'], ['KeyK', 'л', 'Л', 'k', 'K'], ['KeyL', 'д', 'Д', 'l', 'L'],
      ['Semicolon', 'ж', 'Ж', ';', ':'], ['Quote', 'э', 'Э', '\'', '\''], ['Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
    ],
    [
      ['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'], ['KeyZ', 'я', 'Я', 'z', 'Z'], ['KeyX', 'ч', 'Ч', 'x', 'X'], ['KeyC', 'с', 'С', 'c', 'C'], ['KeyV', 'м', 'М', 'v', 'V'], ['KeyB', 'и', 'И', 'b', 'B'],
      ['KeyN', 'т', 'Т', 'n', 'N'], ['KeyM', 'ь', 'Ь', 'm', 'M'], ['Comma', 'б', 'Б', ',', '<'], ['Period', 'ю', 'Ю', '.', '>'], ['Slash', '.', ',', '/', '?'],
      ['ArrowUp', '↑', '↑', '↑', '↑'], ['ShiftRight', 'Shift', 'Shift', 'Shift', 'Shift'],
    ],
    [
      ['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'], ['MetaLeft', 'RUS', 'RUS', 'ENG', 'ENG'], ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'], ['Space', 'Space', 'Space', 'Space', 'Space'],
      ['AltRight', 'Alt', 'Alt', 'Alt', 'Alt'],
      ['ArrowLeft', '←', '←', '←', '←'], ['ArrowDown', '↓', '↓', '↓', '↓'], ['ArrowRight', '→', '→', '→', '→'], ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ],
  ];


  let language = 1;

  let capsLockButton = false;
  const shiftButton = false;

  let ctrlAltPressed = false;


  for (let i = 1; i <= 5; i += 1) {
    const lang = 1;
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard-row', `keyboard__row-${i}`);
    document.querySelector('.keyboard').append(keyboardRow);

    buttons[i - 1].forEach((button) => {
      const buttonKey = document.createElement('div');
      buttonKey.classList.add('key');
      document.querySelector(`.keyboard__row-${i}`).append(buttonKey);

      if (button[0] === 'Backspace' || button[0] === 'CapsLock' || button[0] === 'ShiftLeft' || button[0] === 'ShiftRight' || button[0] === 'Enter') {
        buttonKey.classList.add('key_medium', 'system');
      }
      if (button[0] === 'ControlLeft' || button[0] === 'ControlRight') {
        buttonKey.classList.add('key_small', 'system');
      }
      if (button[0] === 'Space') {
        buttonKey.classList.add('key_big', 'system');
      }
      if (button[0] === 'MetaLeft' || button[0] === 'AltLeft' || button[0] === 'AltRight' || button[0] === 'Delete' || button[0] === 'Tab' || button[0] === 'ArrowDown' || button[0] === 'ArrowUp'
      || button[0] === 'ArrowRight' || button[0] === 'ArrowLeft') {
        buttonKey.classList.add('system');
      }

      buttonKey.textContent = button[lang];
      if (!buttonKey.classList.contains('system')) {
        buttonKey.setAttribute('value', button[lang]);
        buttonKey.setAttribute('system-value', button[0]);
      } else {
        buttonKey.setAttribute('value', '');
        buttonKey.setAttribute('system-value', button[0]);
      }
    });
  }
  const circleCapsLock = document.createElement('div');
  circleCapsLock.classList.add('circleCapsLock');
  document.querySelector('.keyboard').append(circleCapsLock);


  const generateKeyboard = (item, shift) => {
    const buttonMas = document.querySelectorAll('.key');
    const keyB = [];
    for (let i = 1; i <= 5; i += 1) {
      buttons[i - 1].forEach((button) => {
        keyB.push(button);
      });
    }

    for (let i = 0; i < 64; i += 1) {
      if (!shift) {
        buttonMas[i].textContent = keyB[i][item];
        if (!buttonMas[i].classList.contains('system')) {
          if (capsLockButton) {
            buttonMas[i].textContent = buttonMas[i].textContent.toUpperCase();
          } else {
            buttonMas[i].textContent = buttonMas[i].textContent.toLowerCase();
          }
          buttonMas[i].setAttribute('value', keyB[i][item]);
          buttonMas[i].setAttribute('system-value', keyB[i][0]);
        } else {
          buttonMas[i].setAttribute('value', '');
          buttonMas[i].setAttribute('system-value', keyB[i][0]);
        }
      } else {
        buttonMas[i].textContent = keyB[i][item + 1];
        if (!buttonMas[i].classList.contains('system')) {
          buttonMas[i].setAttribute('value', keyB[i][item + 1]);
          buttonMas[i].setAttribute('system-value', keyB[i][0]);
        } else {
          buttonMas[i].setAttribute('value', '');
          buttonMas[i].setAttribute('system-value', keyB[i][0]);
        }
      }
    }
  };
  const backspaceFunc = () => {
    const startText = inputWord.selectionStart;
    if (inputWord.selectionStart !== inputWord.selectionEnd) {
      inputWord.value = inputWord.value.slice(0, inputWord.selectionStart)
        + inputWord.value.slice(inputWord.selectionEnd);
      inputWord.selectionEnd = startText;
    } else if (inputWord.selectionStart > 0) {
      inputWord.value = inputWord.value.slice(0, inputWord.selectionStart - 1)
        + inputWord.value.slice(inputWord.selectionEnd);
      inputWord.selectionStart = startText - 1;
      inputWord.selectionEnd = startText - 1;
    }
  };
  const tabFunc = () => {
    inputWord.setRangeText('    ', inputWord.selectionStart, inputWord.selectionEnd, 'end');
  };
  const spaceFunc = () => {
    inputWord.setRangeText(' ', inputWord.selectionStart, inputWord.selectionEnd, 'end');
  };
  const enterFunc = async () => {
    buttonSearch.click();
  };
  const deleteFunc = () => {
    const startText = inputWord.selectionStart;
    const endText = inputWord.selectionEnd;
    let longText = endText - startText;
    if (startText === endText) {
      longText = 1;
    }
    inputWord.value = inputWord.value.slice(0, startText)
      + inputWord.value.slice(startText + longText);
    inputWord.selectionStart = startText;
    inputWord.selectionEnd = startText;
  };

  document.querySelector('.keyboard').addEventListener('click', (event) => {
    if (event.target.classList.contains('key')) {
      document.querySelector('.search-input').focus();
    }
  });

  document.querySelector('.keyboard').addEventListener('mousedown', (event) => {
    document.querySelector('.search-input').focus();
    if (event.target.classList.contains('key')) {
      event.target.classList.add('active');
      setTimeout(() => { event.target.classList.remove('active'); }, 300);

      if (!capsLockButton) {
        inputWord.setRangeText(event.target.getAttribute('value'), inputWord.selectionStart, inputWord.selectionEnd, 'end');
      } else {
        inputWord.setRangeText(event.target.getAttribute('value').toUpperCase(), inputWord.selectionStart, inputWord.selectionEnd, 'end');
      }

      const systemValue = event.target.getAttribute('system-value');

      if (systemValue === 'Backspace') {
        backspaceFunc();
      }
      if (systemValue === 'Tab') {
        tabFunc();
      }
      if (systemValue === 'Space') {
        spaceFunc();
      }
      if (systemValue === 'Enter') {
        enterFunc();
      }
      if (systemValue === 'Delete') {
        deleteFunc();
      }
      if (systemValue === 'CapsLock') {
        if (!capsLockButton) {
          document.querySelector('.circleCapsLock').classList.add('capsActive');
          capsLockButton = true;
        } else {
          document.querySelector('.circleCapsLock').classList.remove('capsActive');
          capsLockButton = false;
        }
        generateKeyboard(language, shiftButton);
      }

      if (systemValue === 'MetaLeft') {
        if (!ctrlAltPressed) {
          language = 3;
          ctrlAltPressed = true;
        } else {
          language = 1;
          ctrlAltPressed = false;
        }
        generateKeyboard(language, shiftButton);
      }

      if (systemValue === 'ArrowLeft') {
        inputWord.selectionEnd = inputWord.selectionEnd - 1 >= 0 ? inputWord.selectionEnd - 1 : 0;
      }

      if (systemValue === 'ArrowRight') {
        inputWord.selectionStart += 1;
      }
    }
  });
  document.querySelector('.keyboard').addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('key')) {
      event.target.classList.remove('active');
    }
  });

  const wrapper = document.querySelector('.keyboard-wrapper');

  const position = JSON.parse(localStorage.getItem('position')) || {
    top: 'calc(50% - 100px)',
    left: 'calc(50% - 320px)',
  };
  wrapper.style.top = position.top;
  wrapper.style.left = position.left;

  wrapper.onmousedown = (event) => {
    const shiftX = event.clientX - wrapper.getBoundingClientRect().left;
    const shiftY = event.clientY - wrapper.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      wrapper.style.top = `${pageY - shiftY}px`;
      wrapper.style.left = `${pageX - shiftX}px`;
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    wrapper.onmouseup = () => {
      position.top = wrapper.style.top;
      position.left = wrapper.style.left;
      localStorage.setItem('position', JSON.stringify(position));
      document.removeEventListener('mousemove', onMouseMove);
      wrapper.onmouseup = null;
    };
  };

  hiddenButton.addEventListener('click', () => {
    document.querySelector('.keyboard-button').click();
  });
}
