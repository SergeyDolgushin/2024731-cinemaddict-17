import { render, remove, replace } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';

export default class FilmCardPresenter {
  #card = null;
  #comments = null;
  #filmsContainer = null;
  #filmCardView = null;
  #changeCard = null;
  popupPresenter = null;
  #showPopup = null;
  #refreshPopup = null;

  constructor(filmsContainer, changeCard, showPopup, refreshPopup) {
    this.#filmsContainer = filmsContainer;
    this.#changeCard = changeCard;
    this.#showPopup = showPopup;
    this.#refreshPopup = refreshPopup;
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
      this.#refreshPopup(this.#card, this.#comments);
    }
    this.#filmCardView.setClickHandler(this.#showPopup);
  };


  destroy = () => {
    remove(this.#filmCardView);
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
