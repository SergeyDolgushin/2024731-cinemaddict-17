import {createElement} from '../render.js';

const createNewTaskButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class NewShowMoreButtonView {
  getTemplate() {
    return createNewTaskButtonTemplate();
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
