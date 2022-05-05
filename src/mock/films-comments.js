import { getRandomInteger, getRandomFloat, convertTimeDuration } from '../utils.js';
import { TITLES, POSTERS, DIRECTORS, WRITERS, ACTORS, RELEASE_COUNTRY, GENRE, DESCRIPTIONS, COMMENTS, COMMENTS_AUTORS, EMOJIES } from './const-film-temp.js';

const getRandomArrayElement = (descriptions) => {

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateComment = (_element, indexId) => (
  {
    id: indexId,
    author: getRandomArrayElement(COMMENTS_AUTORS),
    comment: getRandomArrayElement(COMMENTS),
    date: new Date(),
    emotion: getRandomArrayElement(EMOJIES)
  }
);

const generateFilmInfo = (_element, index) => {
  const date = new Date();
  const randomDuration = getRandomInteger(60, 300);

  return {
    id: index,
    comments: [],
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
      filmInfo: {
        runtime: convertTimeDuration(randomDuration),
        genre: [getRandomArrayElement(GENRE)],
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched: Boolean(getRandomInteger(0, 1)),
        watchingDate: date.getFullYear(),
        favorite: Boolean(getRandomInteger(0, 1)),
      }
    }
  };
};


export { generateFilmInfo, generateComment };
