import { getRandomInteger, getRandomFloat } from '../utils.js';
import { TITLES, POSTERS, DIRECTORS, WRITERS, ACTORS, RELEASE_COUNTRY, GENRE, DESCRIPTIONS } from './const.js';

const generateText = (descriptions) => {

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

export const generateTask = () => {
  const date = new Date();

  return {
    id: '0',
    'film_info': {
      'title': generateText(TITLES),
      'alternative_title': generateText(TITLES),
      'total_rating': getRandomFloat(0, 10, 1),
      'poster': generateText(POSTERS),
      'age_rating': getRandomInteger(0, 5),
      'director': generateText(DIRECTORS),
      'writers': [generateText(WRITERS), generateText(DIRECTORS)],
      'actors': [generateText(ACTORS), generateText(WRITERS)],
      'release': {
        'date': date,
        'release_country': generateText(RELEASE_COUNTRY)
      },
      'film_info': {
        'runtime': getRandomInteger(60, 300),
        'genre': [generateText(GENRE)],
        'description': generateText(DESCRIPTIONS)
      },
      'user_details': {
        'watchlist': Boolean(getRandomInteger(0, 1)),
        'already_watched': Boolean(getRandomInteger(0, 1)),
        'watching_date': date,
        'favorite': Boolean(getRandomInteger(0, 1)),
      }
    }

  };
};
