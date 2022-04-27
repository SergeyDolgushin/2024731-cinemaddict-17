import {createElement} from '../render.js';

const createNewContainer = () => '<div class="films-list__container"></div>';

export default class NewFilmsListContainerView {
  getTemplate() {
    return createNewContainer();
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
