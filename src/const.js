const FilterType = {
  ALL: 'default',
  WATCHLIST: 'watchlist',
  ALREADYWATCHED: 'alreadywatched',
  FAVORITE: 'favorite',
};

const SortType = {
  DEFAULT: 'default',
  SORT_DATE: 'date',
  SORT_RATE: 'rating',
};

const infoType = {
  'default': 'There are no movies in our database',
  'watchlist': 'There are no movies to watch now',
  'alreadywatched': 'There are no watched movies now',
  'favorite': 'There are no favorite movies now',
};

export { FilterType, SortType, infoType };
