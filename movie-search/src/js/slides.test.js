import getMovieSlides from './fillSwiper';

describe('getMovieSlides.slides', () => {
  it('Should be an instance of Object', () => {
    const word = 'love';
    expect(getMovieSlides(word)).toBeInstanceOf(Object);
  });
});
