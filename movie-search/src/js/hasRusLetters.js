import {cyrillicReg} from './variables';

export default function hasRusLetters(word) {
    if (cyrillicReg.test(word)) {
      return true;
    }
    return false; 
}