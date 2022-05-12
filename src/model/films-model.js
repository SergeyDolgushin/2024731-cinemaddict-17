import { generateFilmInfo } from '../mock/films-comments.js';
import { getRandomInteger } from '../utils.js';
const MIN_QUANTITY_FILMS = 0;
const MAX_QUANTITY_FILMS = 13;

export default class FilmCardsModel {
  constructor(CommentsModel) {
    this.films = Array.from(
      {
        length: getRandomInteger(MIN_QUANTITY_FILMS, MAX_QUANTITY_FILMS)
      },
      (_, index) => generateFilmInfo(index, CommentsModel)
    );
  }

  getFilms = () => this.films;
}
