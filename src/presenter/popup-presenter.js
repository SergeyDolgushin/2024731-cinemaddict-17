import { render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #card = null;
  #commentsModel = null;
  #changeCard = null;
  #mainContainer = null;
  #popupView = null;
  #closePopupPresenter = null;

  constructor(changeCard, closePopupPresenter) {
    this.#changeCard = changeCard;
    this.#closePopupPresenter = closePopupPresenter;
  }

  get filmCard() {
    return this.#card;
  }

  get filmComments() {
    return this.#commentsModel;
  }

  init = (filmModel, commentsModel, mainContainer) => {
    this.#mainContainer = mainContainer;
    this.#card = filmModel;
    this.#commentsModel = commentsModel;
    const prevPopupView = this.#popupView;
    this.#renderPopup(prevPopupView);
    this.#popupView.setPreferenceButtons(this.#handleWatchlistClick, this.#handleAlreadyWatchedClick, this.#handleFavoriteClick);
    this.#popupView.deleteButtonHandler(this.#handleDeleteClick);
    this.#popupView.sendNewComment(this.#handleAddNewComment);

  };

  #renderPopup = (prevPopupView) => {
    this.#popupView = new PopupView(this.#card, this.#commentsModel);
    const handlePopupCloseButton = () => {
      this.#popupView.destroy();
      this.#closePopupPresenter();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#popupView.destroy();
        this.#closePopupPresenter();
        document.removeEventListener('keydown', onEscKeyDown);
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
    this.#popupView.destroy();
  };

  #handleFavoriteClick = () => {
    this.#card.filmInfo.userDetails.favorite = !this.#card.filmInfo.userDetails.favorite;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#card },
    );
  };

  #handleWatchlistClick = () => {
    this.#card.filmInfo.userDetails.watchlist = !this.#card.filmInfo.userDetails.watchlist;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#card },
    );
  };

  #handleAlreadyWatchedClick = () => {
    this.#card.filmInfo.userDetails.alreadyWatched = !this.#card.filmInfo.userDetails.alreadyWatched;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#card },
    );
  };

  #handleDeleteClick = (commentId) => {
    this.#changeCard(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      { ...this.#card },
      commentId,
    );
  };

  #handleAddNewComment = (comment) => {
    this.#card.comments.push(comment.id);

    this.#changeCard(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      { ...this.#card },
      comment,
    );
  };
}
