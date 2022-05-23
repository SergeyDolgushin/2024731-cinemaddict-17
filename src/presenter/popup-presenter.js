import { render, remove, replace } from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #card = null;
  #changeCard = null;
  #mainContainer = null;
  #popupView = null;
  #changeComment = null;

  constructor(changeCard, changeComment) {
    this.#changeCard = changeCard;
    this.#changeComment = changeComment;
  }

  init = (filmModel, commentsModel, mainContainer) => {
    this.#mainContainer = mainContainer;
    this.#card = filmModel;
    this.commentsModel = commentsModel;
    this.filmComments = [...this.commentsModel];
    const prevPopupView = this.#popupView;
    this.#renderPopup(prevPopupView);
    this.#popupView.setPreferenceButtons(this.#handleWatchlistClick, this.#handleAlreadyWatchedClick, this.#handleFavoriteClick);
  };

  #renderPopup = (prevPopupView) => {
    this.#popupView = new PopupView(this.#card, this.filmComments);
    this.#popupView.sendNewComment(this.#changeComment);
    const handlePopupCloseButton = () => {
      remove(this.#popupView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        remove(this.#popupView);
      }
    };

    if (prevPopupView === null) {
      render(this.#popupView, this.#mainContainer);
    } else {
      replace(this.#popupView, prevPopupView);
    }

    this.#popupView.setClickHandler(handlePopupCloseButton);
    document.addEventListener('keydown', onEscKeyDown);
  };

  destroy = () => {
    remove(this.#popupView);
  };

  #handleFavoriteClick = () => {
    this.#card.filmInfo.userDetails.favorite = !this.#card.filmInfo.userDetails.favorite;
    this.#changeCard({ ...this.#card });
  };

  #handleWatchlistClick = () => {
    this.#card.filmInfo.userDetails.watchlist = !this.#card.filmInfo.userDetails.watchlist;
    this.#changeCard({ ...this.#card });
  };

  #handleAlreadyWatchedClick = () => {
    this.#card.filmInfo.userDetails.alreadyWatched = !this.#card.filmInfo.userDetails.alreadyWatched;
    this.#changeCard({ ...this.#card });
  };
}
