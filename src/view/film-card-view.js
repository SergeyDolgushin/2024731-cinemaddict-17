import { createElement } from '../render.js';

const createNewFilms = (task) => (`
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${task.film_info.title}</h3>
      <p class="film-card__rating">${task.film_info.total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${task.film_info.release.date}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${task.film_info.film_info.genre}</span>
      </p>
      <img src="${task.film_info.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${task.film_info.film_info.description}</p>
      <span class="film-card__comments">5 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`
);

export default class FilmView {
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return createNewFilms(this.task);
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
