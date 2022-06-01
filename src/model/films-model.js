import { generateFilmInfo } from '../mock/films-comments.js';
import { getRandomInteger } from '../utils.js';
import Observable from '../framework/observable.js';

const MIN_QUANTITY_FILMS = 0;
const MAX_QUANTITY_FILMS = 1;

export default class FilmCardsModel extends Observable {
  #films = null;
  constructor(CommentsModel) {
    super();
    this.#films = Array.from(
      {
        length: getRandomInteger(MIN_QUANTITY_FILMS, MAX_QUANTITY_FILMS)
      },
      (_, index) => generateFilmInfo(index, CommentsModel)
    );
  }

  get films() {

    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting item');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  updateFilmComment = (updateType, filmUpdate, commentUpdate) => {
    let index = filmUpdate.comments.findIndex((comment) => comment === Number(commentUpdate));
    filmUpdate.comments.splice(index, 1);

    index = this.#films.findIndex((film) => film.id === filmUpdate.id);
    this.#films = [
      ...this.#films.slice(0, index),
      filmUpdate,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, filmUpdate);
  };

}
