import { createElement } from '../render.js';

const createFilmsTemplate = (filmCards) => (
  `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmCards.filmInfo.title}</h3>
      <p class="film-card__rating">${filmCards.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmCards.filmInfo.release.date}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${filmCards.filmInfo.filmInfo.genre}</span>
      </p>
      <img src="${filmCards.filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmCards.filmInfo.filmInfo.description}</p>
      <span class="film-card__comments">${filmCards.comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`
);

export default class FilmView {
  constructor(filmCards) {
    this.filmCards = filmCards;
  }

  getTemplate() {
    return createFilmsTemplate(this.filmCards);
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