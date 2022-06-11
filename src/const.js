const FilterType = {
  ALL: 'All',
  WATCHLIST: 'watchlist',
  ALREADYWATCHED: 'alreadywatched',
  FAVORITE: 'favorite',
};

const FilterName = {
  'All': 'All',
  'watchlist': 'Watchlist',
  'alreadywatched': 'History',
  'favorite': 'Favorites',
};

const SortType = {
  DEFAULT: 'default',
  SORT_DATE: 'date',
  SORT_RATE: 'rating',
};

const infoType = {
  'All': 'There are no movies in our database',
  'watchlist': 'There are no movies to watch now',
  'alreadywatched': 'There are no watched movies now',
  'favorite': 'There are no favorite movies now',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  CLOSE_POPUP: 'CLOSE_POPUP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  UPDATE: 'UPDATE',
  INIT_COMMENT: 'INIT_COMMENT',
};

const UserRaiting = {
  NONE: '',
  NOVICE: 'novice',
  FAN: 'fan',
  BUFF: 'movie buff',
};

export { FilterType, SortType, infoType, UserAction, UpdateType, UserRaiting, FilterName };
