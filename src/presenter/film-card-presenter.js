import { render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmCardPresenter {
  #card = null;
  #comments = null;
  #filmsContainer = null;
  #filmCardView = null;
  #changeCard = null;
  popupPresenter = null;
  #showPopup = null;
  #filterType = null;

  constructor(filmsContainer, changeCard, showPopup, filterType) {
    this.#filmsContainer = filmsContainer;
    this.#changeCard = changeCard;
    this.#showPopup = showPopup;
    this.#filterType = filterType;
  }

  init(card, comments) {
    this.#card = card;
    this.#comments = comments;

    const prevfilmCardView = this.#filmCardView;
    this.#renderCard(prevfilmCardView);
    this.#filmCardView.setPreferenceButtons(this.#handleWatchlistClick, this.#handleAlreadyWatchedClick, this.#handleFavoriteClick);
  }

  #renderCard = (prevfilmCardView) => {
    this.#filmCardView = new FilmCardView(this.#card, this.#comments);

    if (prevfilmCardView === null) {
      render(this.#filmCardView, this.#filmsContainer.element);
    } else {
      replace(this.#filmCardView, prevfilmCardView);
    }
    this.#filmCardView.setClickHandler(this.#showPopup);
  };


  destroy = () => {
    this.#filmCardView.destroy();
  };

  #selectUpdateType = () => (this.#filterType !== 'All') ? UpdateType.MAJOR : UpdateType.MINOR;


  #handleFavoriteClick = () => {
    this.#card.filmInfo.userDetails.favorite = !this.#card.filmInfo.userDetails.favorite;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      this.#selectUpdateType(),
      { ...this.#card },
    );
  };

  #handleWatchlistClick = () => {
    this.#card.filmInfo.userDetails.watchlist = !this.#card.filmInfo.userDetails.watchlist;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      this.#selectUpdateType(),
      { ...this.#card },
    );
  };

  #handleAlreadyWatchedClick = () => {
    this.#card.filmInfo.userDetails.alreadyWatched = !this.#card.filmInfo.userDetails.alreadyWatched;
    this.#changeCard(
      UserAction.UPDATE_FILM,
      this.#selectUpdateType(),
      { ...this.#card },
    );
  };

}
