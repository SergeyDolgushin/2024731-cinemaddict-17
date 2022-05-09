import { getRandomInteger, getRandomFloat, convertTimeDuration, generateId, getRandomArrayElement, getRandomBoolean } from '../utils.js';
import { TITLES, POSTERS, DIRECTORS, WRITERS, ACTORS, RELEASE_COUNTRY, GENRE, DESCRIPTIONS, COMMENTS, COMMENTS_AUTORS, EMOJIES } from './const-film-temp.js';

const generateCommentID = generateId();

const generateComment = () => (
  {
    id: generateCommentID(),
    author: getRandomArrayElement(COMMENTS_AUTORS),
    comment: getRandomArrayElement(COMMENTS),
    date: new Date(),
    emotion: getRandomArrayElement(EMOJIES)
  }
);

const generateFilmInfo = (id, commentsModel) => {
  const date = new Date();
  const randomDuration = getRandomInteger(60, 300);
  const filmComments = Array.from({ length: getRandomInteger(0, 5) }, generateComment);
  commentsModel.addComments(filmComments);

  return {
    id,
    comments: filmComments.map((comment) => comment.id),
    filmInfo: {
      title: getRandomArrayElement(TITLES),
      alternativeTitle: getRandomArrayElement(TITLES),
      totalRating: getRandomFloat(0, 10, 1),
      poster: getRandomArrayElement(POSTERS),
      ageRating: getRandomInteger(0, 5),
      director: getRandomArrayElement(DIRECTORS),
      writers: [getRandomArrayElement(WRITERS), getRandomArrayElement(DIRECTORS)],
      actors: [getRandomArrayElement(ACTORS), getRandomArrayElement(WRITERS)],
      release: {
        date: date.getFullYear(),
        releaseCountry: getRandomArrayElement(RELEASE_COUNTRY)
      },
      runtime: convertTimeDuration(randomDuration),
      genre: [getRandomArrayElement(GENRE)],
      description: getRandomArrayElement(DESCRIPTIONS),
      userDetails: {
        watchlist: getRandomBoolean(),
        alreadyWatched: getRandomBoolean(),
        watchingDate: date.getFullYear(),
        favorite: getRandomBoolean(),
      }
    }
  };
};


export { generateFilmInfo, generateComment };
