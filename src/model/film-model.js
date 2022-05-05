import { generateFilmInfo } from '../mock/films-comments.js';
import { getRandomInteger } from '../utils.js';

export default class FilmCardsModel {
  films = Array.from({ length: 10 }, generateFilmInfo);
  constructor(comments) {
    this.comments = comments;
  }

  addComments = (element) => {
    const maxQuantity = this.comments.length;
    const maxRange = Math.floor(maxQuantity / 3);
    const minRange = 0;
    const maxInterval = getRandomInteger(minRange, maxRange);
    element.comments = this.comments.slice(0, maxInterval);
    this.comments = this.comments.slice(maxInterval, maxQuantity);
  };

  getCards = () => this.films.map(this.addComments);
}
