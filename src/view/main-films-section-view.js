import { createElement } from '../render.js';

const createSectionTemplate = () => '<section class="films"></section>';

export default class FilmsSectionView {
  getTemplate() {
    return createSectionTemplate();
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
