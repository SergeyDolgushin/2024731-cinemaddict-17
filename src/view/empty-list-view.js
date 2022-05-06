import { createElement } from '../render.js';

const createEmptyListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
    </section>
  </section>`
);

export default class EmptyListView {
  getTemplate() {

    return createEmptyListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
