import { setActiveClass } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTemplate = (filmCard) => {
  const activeClass = 'film-card__controls-item--active';
  const userDetails = filmCard.filmInfo.userDetails;
  const { title, totalRating, genre, description, poster, release, runtime } = filmCard.filmInfo;

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
          <span class="film-card__duration">${runtime}</span>
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

export default class FilmCardView extends AbstractView {
  #filmCard = null;
  #comments = null;

  constructor(filmCard, comments) {
    super();
    this.#filmCard = filmCard;
    this.#comments = comments;
  }

  get template() {
    return createFilmsTemplate(this.#filmCard);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster')
      .addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.click(this.#filmCard, this.#comments);
  };

  #setWatchlistHandler = (callback) => {
    this._callback.clickWatchList = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  };

  #clickWatchlistHandler = () => {
    this._callback.clickWatchList();
  };

  #setWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickWatchedHandler);
  };

  #clickWatchedHandler = () => {
    this._callback.clickWatched();
  };

  #setFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickFavoriteHandler = () => {
    this._callback.clickFavorite();
  };

  setPreferenceButtons = (cbWatchlist, cbWatched, cbFavorite) => {
    this.#setWatchlistHandler(cbWatchlist);
    this.#setWatchedHandler(cbWatched);
    this.#setFavoriteHandler(cbFavorite);
  };

  destroy = () => {
    this.element.querySelector('.film-card__poster')
      .removeEventListener('click', this.#clickHandler);
    this.element.remove();
  };
}
