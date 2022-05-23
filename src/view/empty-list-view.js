import { infoType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


const createEmptyListTemplate = (kindOfFilter) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${infoType[kindOfFilter]}</h2>
    </section>
  </section>`
);

export default class EmptyListView extends AbstractView {
  #kindOfFilter = null;

  constructor(initKindOfFilter) {
    super();
    this.#kindOfFilter = initKindOfFilter;
  }

  init = (newKindOfFilter) => {
    this.#kindOfFilter = newKindOfFilter;
  };

  get template() {

    return createEmptyListTemplate(this.#kindOfFilter);
  }

}
