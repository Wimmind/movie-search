import {cyrillicReg} from './variables';

export default function hasRusLetters(word) {
  return cyrillicReg.test(word);
}