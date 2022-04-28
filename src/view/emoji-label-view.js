import {createElement} from '../render.js';

export default class NewEmojiView {
  init = (parameters) => {
    this.emoji = `<label class='film-details__emoji-label' for='${parameters.id}'>
      <img src='${parameters.url}' width='30' height='30' alt='emoji'>
    </label>`;
  };

  getTemplate() {

    return this.emoji;
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
