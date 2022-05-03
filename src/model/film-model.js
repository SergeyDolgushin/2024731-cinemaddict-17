import { generateFilmInfo, generateComments } from '../mock/films-comments.js';
import { getRandomInteger } from '../utils.js';

const addCommentsToFilm = (films, comments) => {
  let arrayCommentsId = [];

  for (const film of films) {
    for (let i = 0; i < comments.length; i++) {
      arrayCommentsId.push(comments[i].id);
    }
    const maxNumberComments = getRandomInteger(1, comments.length);
    film.comments = arrayCommentsId.slice(1, maxNumberComments);
    arrayCommentsId = [];
  }
  return films;
};


export default class FilmCardsModel {
  comments = generateComments();
  films = Array.from({ length: 10 }, generateFilmInfo);

  getNewCards = () => addCommentsToFilm(this.films, this.comments);

  getCurrentCards = () => this.films;

  getCurrentComments = () => this.comments;

}
