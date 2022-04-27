import {createElement} from '../render.js';

const createNewSection = () => '<section class="films"></section>';

export default class NewFilmsSectionView {
  getTemplate() {
    return createNewSection();
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
