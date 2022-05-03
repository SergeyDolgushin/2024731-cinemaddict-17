import { createElement } from '../render.js';

const createExtraFilmContainerTemplate = (parameters) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${parameters.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class ExtraFilmsContainerView {

  constructor(parameters) {
    this.parameters = parameters;
  }

  getTemplate() {

    return createExtraFilmContainerTemplate(this.parameters);
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