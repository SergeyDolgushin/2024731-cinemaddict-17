import AbstractView from '../framework/view/abstract-view.js';

const createExtraFilmContainerTemplate = (parameters) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${parameters.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class ExtraFilmsContainerView extends AbstractView {
  #parameters = null;

  constructor(parameters) {
    super();
    this.#parameters = parameters;
  }

  get template() {

    return createExtraFilmContainerTemplate(this.#parameters);
  }
}
