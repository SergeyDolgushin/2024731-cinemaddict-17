import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: (filmsCards) => filmsCards,
  [FilterType.WATCHLIST]: (filmsCards) => filmsCards.filter((filmCard) => filmCard.filmInfo.userDetails.watchlist === true),
  [FilterType.ALREADYWATCHED]: (filmsCards) => filmsCards.filter((filmCard) => filmCard.filmInfo.userDetails.alreadyWatched === true),
  [FilterType.FAVORITE]: (filmsCards) => filmsCards.filter((filmCard) => filmCard.filmInfo.userDetails.favorite === true),
};

export { filter };
