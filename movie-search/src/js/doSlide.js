import getRating from './getRating';

const doSlide = async (film, num) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('swiper-slide');

  const cardLink = document.createElement('a');
  cardLink.href = `https://www.imdb.com/title/${film.imdbID}/videogallery`;
  cardLink.target = '_blank';
  cardLink.innerText = film.Title;
  cardLink.setAttribute('title',`${film.Title}`);
  cardLink.classList.add('card-header');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-body');
  cardImage.alt = 'poster';
  cardImage.src = film.Poster === 'N/A' ? '../assets/image/no-poster.jpg' : film.Poster;

  const cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer');
  const rating = await getRating(film.imdbID, num) === 'N/A' ? 'nothing' : await getRating(film.imdbID, num);
  cardFooter.innerHTML = `${film.Year}<div style="display:flex; align-items:center;"><span class='starIcon'></span>${rating}</div>`;

  card.append(cardLink);
  card.append(cardImage);
  card.append(cardFooter);
  return card;
};

export default doSlide;
