import { generateFilmInfo } from '../mock/films-comments.js';
import { getRandomInteger } from '../utils.js';
const MIN_QUANTITY_FILMS = 0;
const MAX_QUANTITY_FILMS = 11;

export default class FilmCardsModel {
  constructor(CommentsModel) {
    this.randomQuantityFilms = getRandomInteger(MIN_QUANTITY_FILMS, MAX_QUANTITY_FILMS);
    this.films = Array.from({ length: this.randomQuantityFilms }, (_, index) => generateFilmInfo(index, CommentsModel));
  }

  getFilms = () => this.films;
}
