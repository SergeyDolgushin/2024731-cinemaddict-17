import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortButtonsTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_RATE}">Sort by rating</a></li>
  </ul>`
);

export default class SortButtonsView extends AbstractView {
  #prevActiveElments = null;

  get template() {
    return createSortButtonsTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    this.#prevActiveElments = document.querySelector('.sort__button--active');
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#prevActiveElments.classList.toggle('sort__button--active');
    evt.target.classList.toggle('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
