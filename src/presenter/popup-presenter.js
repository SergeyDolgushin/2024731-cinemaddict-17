import NewPopupView from '../view/main-popup-view.js';
import NewControlView from '../view/film-details-control-view.js';
import NewCommentlView from '../view/comment-view.js';
import NewEmojiInputView from '../view/emoji-input-view.js';
import NewEmojiLabelView from '../view/emoji-label-view';
import {render} from '../render.js';

const controlWatchlist = {
  class: 'film-details__control-button film-details__control-button--watchlist',
  id: 'watchlist',
  name: 'watchlist',
  caption: 'Add to watchlist',
  controlInstance: '',
};

const controlWatched = {
  class: 'film-details__control-button film-details__control-button--active film-details__control-button--watched',
  id: 'watched',
  name: 'watched',
  caption: 'Already watched',
  controlInstance: '',
};

const controlFavorite = {
  class: 'film-details__control-button film-details__control-button--favorite',
  id: 'favorite',
  name: 'favorite',
  caption: 'Add to favorites',
  controlInstance: '',
};

const detailsControls = new Map([
  ['controlWatchlist', controlWatchlist],
  ['controlWatched', controlWatched],
  ['controlFavorite', controlFavorite],
]);

const emojiSmile = {
  id: 'emoji-smile',
  value: 'smile',
  url: './images/emoji/smile.png',
  emojiInputInstance: '',
  emojiLabelInstance: '',
};

const emojiSleeping = {
  id: 'emoji-sleeping',
  value: 'sleeping',
  url: './images/emoji/sleeping.png',
  emojiInputInstance: '',
  emojiLabelInstance: '',
};

const emojiPuke = {
  id: 'emoji-puke',
  value: 'puke',
  url: './images/emoji/puke.png',
  emojiInputInstance: '',
  emojiLabelInstance: '',
};

const emojiAngry = {
  id: 'emoji-angry',
  value: 'angry',
  url: './images/emoji/angry.png',
  emojiInputInstance: '',
  emojiLabelInstance: '',
};

const allEmojies = [emojiSmile, emojiSleeping, emojiPuke, emojiAngry];

export default class PopupPresenter {
  mainPopupForm = new NewPopupView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.mainPopupForm, this.mainContainer);
    const popupContainer = this.mainPopupForm.getElement();
    const controlContainer = popupContainer.querySelector('.film-details__controls');
    const commentContainer = popupContainer.querySelector('.film-details__comments-list');
    const emojiContainer = popupContainer.querySelector('.film-details__emoji-list');

    for (const item of detailsControls.values()) {
      item.controlInstance = new NewControlView();
      item.controlInstance.init(item);
      render(item.controlInstance, controlContainer);
    }
    render(new NewCommentlView(), commentContainer);

    for (const emoji of allEmojies) {
      emoji.emojiInputInstance = new NewEmojiInputView();
      emoji.emojiInputInstance.init(emoji);
      emoji.emojiLabelInstance = new NewEmojiLabelView();
      emoji.emojiLabelInstance.init(emoji);
      render(emoji.emojiInputInstance, emojiContainer);
      render(emoji.emojiLabelInstance, emojiContainer);
    }
  };
}
