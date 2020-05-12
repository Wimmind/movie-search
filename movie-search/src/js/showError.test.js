import showError  from './showError';

describe('Test hasRusLetters function', () => {
    const word = 'qcg1dr';
    it(`Server response is "Movie not found!" for title "${word}"`, () => {
    expect(showError('Movie not found!', word)).toBe(`No results for "${word}"`);
    });
    it(`Server response is "Something went wrong." for title "${word}"`, () => {
    expect(showError('Something went wrong.', word)).toBe('You did not enter a search query');
    });
    it(`Server response is "Too many results." for title "${word}"`, () => {
    expect(showError('Too many results.', word)).toBe(`There are too many results to "${word}" search`);
    });
  });