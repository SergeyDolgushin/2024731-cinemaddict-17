import { generateFilmInfo } from '../mock/films-comments.js';

export default class FilmCardsModel {
  constructor(CommentsModel) {
    this.films = Array.from({ length: 10 }, (_, index) => generateFilmInfo(index, CommentsModel));
  }

  getFilms = () => this.films;
}
