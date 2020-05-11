import getRating from './getRating';
const errorWindow = document.querySelector('.info');

const doSlide = async (film, page) => {
  const card = document.createElement('div');
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  card.classList.add('card');

  const cardLink = document.createElement('a');
  cardLink.href = `https://www.imdb.com/title/${film.imdbID}/videogallery`;
  cardLink.target = '_blank';
  cardLink.innerText = film.Title;
  cardLink.setAttribute('title',`${film.Title}`);
  cardLink.classList.add('card-header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-body');
  cardImage.alt = 'poster';
  try {
    if (film.Poster === 'N/A') {
      cardImage.src = '../assets/image/no-poster.jpg';
    } else {
      await fetch(film.Poster);
      cardImage.src = film.Poster;
    }
  } catch (err) {
    cardImage.src = '../assets/image/no-poster.jpg';
    errorWindow.innerText = 'You did not enter a search query';
    console.error('we have trouble with Poster', film.Poster);
  }
  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer');
  
  const rating = await getRating(film.imdbID, page) === 'N/A' ? 'nothing' : await getRating(film.imdbID, page);

  cardFooter.innerHTML = `${film.Year}<div style="display:flex; align-items:center;"><span class='starIcon'></span>${rating}</div>`;

  card.append(cardLink);
  card.append(cardImage);
  card.append(cardFooter);
  slide.append(card)
  return slide;
};

export default doSlide;
