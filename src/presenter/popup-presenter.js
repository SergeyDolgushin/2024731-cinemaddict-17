import PopupView from '../view/main-popup-view.js';
import ControlView from '../view/film-details-control-view.js';
import CommentlView from '../view/comment-view.js';
import EmojiInputView from '../view/emoji-view.js';
import {render} from '../render.js';

export default class PopupPresenter {
  mainPopupForm = new PopupView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.mainPopupForm, this.mainContainer);
    const popupContainer = this.mainPopupForm.getElement();
    const controlContainer = popupContainer.querySelector('.film-details__top-container');
    const commentContainer = popupContainer.querySelector('.film-details__comments-list');
    const emojiContainer = popupContainer.querySelector('.film-details__new-comment');
    render(new ControlView(), controlContainer);
    render(new CommentlView(), commentContainer);
    render(new EmojiInputView(), emojiContainer);
  };
}
