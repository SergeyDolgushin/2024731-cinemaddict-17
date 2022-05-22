import { generateFilter } from '../mock/filter.js';
import { FilterType } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const IS_ELEMENT_ACTIVE = 'main-navigation__item--active';

const createNavigationTemplate = (filters) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${filters[3].default ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${FilterType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${filters[3].watchlist ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count" data-filter-type="${FilterType.WATCHLIST}">${filters[0].count}</span></a>
    <a href="#history" class="main-navigation__item ${filters[3].alreadywatched ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${FilterType.ALREADYWATCHED}">History <span class="main-navigation__item-count" data-filter-type="${FilterType.ALREADYWATCHED}">${filters[1].count}</span></a>
    <a href="#favorites" class="main-navigation__item ${filters[3].favorite ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${FilterType.FAVORITE}">Favorites <span class="main-navigation__item-count" data-filter-type="${FilterType.FAVORITE}">${filters[2].count}</span></a>
  </nav>`
);

export default class SortMenuView extends AbstractStatefulView {
  #prevActiveElments = null;
  currentActiveFilter = null;
  #initialState = {
    default: true,
    watchlist: false,
    alreadywatched: false,
    favorite: false,
  };

  constructor(filmsCards) {
    super();
    this._state = { ...generateFilter(filmsCards) };
    this._state[3] = { ...this.#initialState };
  }

  get template() {

    return createNavigationTemplate(this._state);
  }

  refreshState = (filmsCards) => {
    this._setState(generateFilter(filmsCards));
    this.updateElement(this._state);
    for (const prop in this._state[3]) {
      if (this._state[3][prop] === true) {
        this._callback.sortTypeChange(prop, false);
      }
    }
  };

  setFilterTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if ((evt.target.tagName !== 'A') && (evt.target.tagName !== 'SPAN')) {
      return;
    }
    evt.preventDefault();
    this.#changeState[evt.target.dataset.filterType](evt);
    this.updateElement(this._state);
  };

  _restoreHandlers = () => {
    this.setFilterTypeChangeHandler(this._callback.sortTypeChange);
  };

  #changeState = {
    default: (evt) => this._changeFilterToAll(evt),
    watchlist: (evt) => this._changeFilterToWatchlist(evt),
    alreadywatched: (evt) => this._changeFilterToAlreadyWatched(evt),
    favorite: (evt) => this._changeFilterToFavorite(evt)
  };

  _changeFilterToAll = (evt) => {
    this.#changeStateFilter(evt);
    this._state[3].watchlist = false;
    this._state[3].alreadywatched = false;
    this._state[3].favorite = false;
  };

  _changeFilterToWatchlist = (evt) => {
    this.#changeStateFilter(evt);
    this._state[3].default = false;
  };

  _changeFilterToAlreadyWatched = (evt) => {
    this.#changeStateFilter(evt);
    this._state[3].default = false;
  };

  _changeFilterToFavorite = (evt) => {
    this.#changeStateFilter(evt);
    this._state[3].default = false;
  };

  #changeStateFilter = (evt) => {
    this._callback.sortTypeChange(evt.target.dataset.filterType, true);
    this._state[3][evt.target.dataset.filterType] = !this._state[3][evt.target.dataset.filterType];
    this._setState(this._state);
  };

}
