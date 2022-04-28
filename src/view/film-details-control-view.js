import {createElement} from '../render.js';

export default class NewControlView {
  init = (parameters) => {
    this.button = `<button type="button" class="${parameters.class}" id="${parameters.id}" name="${parameters.name}">${parameters.caption}</button>`;
  };

  getTemplate() {

    return this.button;
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
