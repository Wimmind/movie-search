import hasRusLetters from './hasRusLetters'

describe('Test hasRusLetters function', () => {
    it('Should be an instance of function', () => {
        const word = 'папа';
      expect(hasRusLetters(word)).toBe(true);
    });
    it('Should be an instance of function', () => {
        const word = 'rock';
      expect(hasRusLetters(word)).toBe(false);
    });
    it('Should be an instance of function', () => {
        const word = '';
      expect(hasRusLetters(word)).toBe(false);
    });
  });
  