import {createElement} from '../render.js';

export default class NewShowMoreContainerView {
  init = (parameters) => {
    this.container = `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${parameters.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;
  };

  getTemplate() {

    return this.container;
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
