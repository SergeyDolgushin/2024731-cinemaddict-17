import { createElement } from '../render.js';
import { setActiveClass } from '../utils.js';

const createFilmsTemplate = (filmCard) => {
  const activeClass = 'film-card__controls-item--active';
  const userDetails = filmCard.filmInfo.userDetails;
  const { title, totalRating, genre, description, poster, release } = filmCard.filmInfo;

  const activeClassButtonWatchlist = setActiveClass(userDetails.watchlist, activeClass);
  const activeClassButtonAlreadyWatched = setActiveClass(userDetails.alreadyWatched, activeClass);
  const activeClassButtonFavorite = setActiveClass(userDetails.favorite, activeClass);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${release.date}</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${filmCard.comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="${activeClassButtonWatchlist} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="${activeClassButtonAlreadyWatched} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="${activeClassButtonFavorite} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView {
  constructor(filmCard) {
    this.filmCard = filmCard;
  }

  getTemplate() {
    return createFilmsTemplate(this.filmCard);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
