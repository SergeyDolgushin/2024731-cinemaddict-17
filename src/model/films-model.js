import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { adaptToClient } from '../api/adapters.js';

export default class FilmCardsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(adaptToClient);
    } catch (err) {
      this.#films = [];
      throw new Error('Can\'t update unexisting item');
    }

    this._notify(UpdateType.INIT);
  };

  get films() {

    return this.#films;
  }

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting item');
    }

    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedFilm = adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        update,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
  };

  updateFilmComment = (updateType, filmUpdate, commentUpdate) => {
    let index = filmUpdate.comments.findIndex((comment) => Number(comment) === Number(commentUpdate));
    filmUpdate.comments.splice(index, 1);

    index = this.#films.findIndex((film) => film.id === filmUpdate.id);
    this.#films = [
      ...this.#films.slice(0, index),
      filmUpdate,
      ...this.#films.slice(index + 1),
    ];
  };

  addFilmComment = (updateType, filmUpdate, commentUpdate) => {
    filmUpdate.comments.push(commentUpdate);

    const index = this.#films.findIndex((film) => film.id === filmUpdate.id);
    this.#films = [
      ...this.#films.slice(0, index),
      filmUpdate,
      ...this.#films.slice(index + 1),
    ];
  };


  getUpdatedFilms = async (filmId) => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(adaptToClient);
    } catch (err) {
      this.#films = [];
      throw new Error('Can\'t update unexisting item');
    }

    this._notify(
      UpdateType.MINOR,
      {
        'comments': null,
        'filmId': filmId
      }
    );
  };

  getFilmById = (filmId) => this.#films.filter((film) => film.id === filmId);

}

