import {createElement} from '../render.js';

export default class NewEmojiInputView {
  init = (parameters) => {
    this.emoji = `<input class='film-details__emoji-item visually-hidden' name='comment-emoji' type='radio' id='${parameters.id}' value='${parameters.value}'>`;
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
