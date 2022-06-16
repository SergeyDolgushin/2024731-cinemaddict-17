import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { FilterName } from '../const.js';

const IS_ELEMENT_ACTIVE = 'main-navigation__item--active';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${name}">
    ${FilterName[type]}
    <span class="main-navigation__item-count" data-filter-type="${name}">${count}
    </span>
    </a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.slice(1, 4)
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item ${filterItems[0].type === currentFilterType ? IS_ELEMENT_ACTIVE : ''}" data-filter-type="${filterItems[0].name}">
        All movies
      </a>
      ${filterItemsTemplate}
    </nav>`
  );
};


export default class FilterView extends AbstractStatefulView {
  currentActiveFilter = null;

  #filter = null;
  #currentFilter = null;

  constructor(filter, currentFilter) {
    super();
    this.#filter = filter;
    this.#currentFilter = currentFilter;
  }

  get template() {

    return createFilterTemplate(this.#filter, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if ((evt.target.tagName !== 'A') && (evt.target.tagName !== 'SPAN')) {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };


}
