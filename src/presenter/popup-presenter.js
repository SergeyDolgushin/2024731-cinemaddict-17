import { render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #card = null;
  #commentsModel = null;
  #comments = null;
  #changeCard = null;
  #mainContainer = null;
  #popupView = null;
  #closePopupPresenter = null;
  #prevPopupView = null;


  constructor(changeCard, closePopupPresenter, commentsModel) {
    this.#changeCard = changeCard;
    this.#closePopupPresenter = closePopupPresenter;
    this.#commentsModel = commentsModel;
  }

  get filmCard() {
    return this.#card;
  }

  get filmComments() {
    return this.#commentsModel;
  }

  init = (filmModel, comments, mainContainer) => {
    this.#mainContainer = mainContainer;
    this.#card = filmModel;
    this.#comments = comments;
    this.#prevPopupView = this.#popupView;
    this.#renderOrReplacePopup(this.#prevPopupView);
  };

  #handleModelEventReceiveComments = (comments, filmId) => {
    this.#prevPopupView = this.#popupView;
    if (this.#card.id === filmId) {
      this.#comments = comments;
      this.#popupView.removeHandlers();
      this.#renderOrReplacePopup(this.#prevPopupView);
    }
  };

  #renderOrReplacePopup = (prevPopupView) => {
    this.#renderPopup(prevPopupView);
    this.#popupView.setPreferenceButtons(this.#handleWatchlistClick, this.#handleAlreadyWatchedClick, this.#handleFavoriteClick);
    this.#popupView.deleteButtonHandler(this.#handleDeleteClick);
    this.#popupView.sendNewComment(this.#handleAddNewComment);
  };

  #renderPopup = (prevPopupView) => {
    this.#popupView = new PopupView(this.#card, this.#comments, this.#commentsModel);
    const handlePopupCloseButton = () => {
      this.destroy();
      this.#closePopupPresenter();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.destroy();
        this.#closePopupPresenter();
      }
    };

    if (prevPopupView === null) {
      render(this.#popupView, this.#mainContainer);
    } else {
      replace(this.#popupView, prevPopupView);
    }

    this.#popupView.setClickHandler(handlePopupCloseButton);
    this.#popupView.setEscExitHandler(onEscKeyDown);
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
    this.#changeCard(
      UserAction.ADD_COMMENT,
      UpdateType.UPDATE,
      this.#card,
      {
        'emotion': comment.emotion,
        'comment': comment.comment
      },
    );
  };

  setSaving = () => {
    this.#popupView.updateView({
      isDisabled: true,
      isSaving: true,
    });
  };

  setDeleting = () => {
    this.#popupView.updateView({
      isDisabled: true,
      isDeleting: true,
    });
  };

  setAborting = () => {
    const resetPopupState = () => {
      this.#popupView.updateView({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#popupView.shake(resetPopupState);
  };

  updateStateView = (film, comments) => {
    this.#popupView.updateState({
      film: film[0],
      comments,
    });
  };
}
