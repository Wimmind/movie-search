const state = { 
    countPage: 1,
    currentWord:'crank',
    currentPage:1 
};
const buttonSearch = document.querySelector('.search-button');
const buttonClear = document.querySelector('.clear-button');
const spinner = document.querySelector('#spinner');
const inputWord = document.querySelector('.search-input');
const errorWindow = document.querySelector('.info');
const cyrillicReg = /[А-ЯЁа-яё]/i;

export {state,buttonSearch,buttonClear,spinner,inputWord,errorWindow,cyrillicReg};

