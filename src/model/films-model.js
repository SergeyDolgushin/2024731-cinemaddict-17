import { UpdateType } from '../const.js';
import { adaptToClient } from '../api/adapters.js';
import Observable from '../framework/observable.js';


export default class FilmCardsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async (updateType = UpdateType.INIT, filmId) => {
    let currentFilm = null;
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(adaptToClient);
      if (updateType !== UpdateType.INIT) {
        currentFilm = this.#films.filter((film) => film.id === filmId);
        currentFilm = currentFilm.at(0);
      }
    } catch (err) {
      this.#films = [];
      throw new Error('Can\'t update unexisting item');
    }

    this._notify(updateType, currentFilm);
  };

  get films() {

    return this.#films;
  }

  updateFilm = async (updateType, filmUpdate) => {
    const index = this.#films.findIndex((film) => film.id === filmUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting item');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(filmUpdate);
      const updatedFilm = adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update film', err);
    }
  };

  updateFilmComment = (updateType, filmUpdate, commentId) => {
    let index = filmUpdate.comments.findIndex((comment) => comment === Number(commentId));
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
