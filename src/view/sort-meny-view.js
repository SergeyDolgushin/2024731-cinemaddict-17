import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createNavigationTemplate = (filters) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="${FilterType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count" data-filter-type="${FilterType.WATCHLIST}">${filters.at(0).count}</span></a>
    <a href="#history" class="main-navigation__item" data-filter-type="${FilterType.ALREADYWATCHED}">History <span class="main-navigation__item-count" data-filter-type="${FilterType.ALREADYWATCHED}">${filters.at(1).count}</span></a>
    <a href="#favorites" class="main-navigation__item" data-filter-type="${FilterType.FAVORITE}">Favorites <span class="main-navigation__item-count" data-filter-type="${FilterType.FAVORITE}">${filters.at(2).count}</span></a>
  </nav>`
);

export default class SortMenuView extends AbstractView {
  #filters = null;
  #prevActiveElments = null;
  currentActiveFilter = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {

    return createNavigationTemplate(this.#filters);
  }

  refreshState = (filters) => {
    this.#filters = filters;

  };

  setFilterTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    this.#prevActiveElments = document.querySelector('.main-navigation__item--active');
    if ((evt.target.tagName !== 'A') && (evt.target.tagName !== 'SPAN')) {
      return;
    }
    evt.preventDefault();
    if (this.#prevActiveElments.classList.contains('main-navigation__item--active')
      && evt.target.classList.contains('main-navigation__item--active')
      && evt.target.dataset.filterType !== 'default') {
      this._callback.sortTypeChange(FilterType.ALL);
      this.#prevActiveElments.classList.toggle('main-navigation__item--active');
      evt.target.classList.toggle('main-navigation__item--active');
      return;
    }
    this.#prevActiveElments.classList.toggle('main-navigation__item--active');
    evt.target.classList.toggle('main-navigation__item--active');
    this.currentActiveFilter = evt.target.dataset.filterType;
    this._callback.sortTypeChange(this.currentActiveFilter);
  };
}
