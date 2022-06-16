import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sortDateDown, sortRateDown } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import UserProfileView from '../view/user-profile-view.js';
import ExtraFilmsPresenter from './extra-films-presenter.js';
import PopupPresenter from './popup-presenter.js';
import SortButtonsView from '../view/sort-buttons-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';

const TimeLimit = {
  LOWER_LIMIT: 150,
  UPPER_LIMIT: 300,
};
const FILMS_COUNT_PER_ROW = 5;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

export default class MainPresenter {
  #mainFilmsSection = new FilmsSectionView();
  #filmsSection = new FilmsListSectionView();
  #filmsContainer = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #SortButtons = new SortButtonsView();
  #userProfileView = new UserProfileView();
  #extraFilmsPresenter = new ExtraFilmsPresenter();
  #loadingComponent = new LoadingView();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #filmCardPresenter = null;
  #filmPresenter = new Map();
  #currentCountFilms = FILMS_COUNT_PER_ROW;
  #currentSortType = SortType.DEFAULT;
  popupPresenter = null;
  #activeSortOrder = 'default';
  #activeFilter = 'default';
  #emptyListView = null;
  #filmCardsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #prevUserProfile = null;
  #isLoading = true;

  constructor(filmsModel, commentsModel, filterModel) {
    this.#filmCardsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#filmCardsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = [...this.#filmCardsModel.films];
    const filteredFilms = filter[filterType](films);

    switch (this.#activeSortOrder) {
      case SortType.SORT_DATE:
        return filteredFilms.sort(sortDateDown);
      case SortType.SORT_RATE:
        return filteredFilms.sort(sortRateDown);
    }

    return filteredFilms;
  }


  get comments() {
    return this.#commentsModel.comments;
  }

  #handleViewAction = async (actionType, updateType, filmUpdate, commentUpdate) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#uiBlocker.block();
        try {
          await this.#filmCardsModel.updateFilm(updateType, filmUpdate);
          this.#uiBlocker.unblock();
        } catch (err) {
          // throw new Error('Can\'t update film', err);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#uiBlocker.block();
        this.popupPresenter.setSaving();
        try {
          await this.#commentsModel.addComment(updateType, filmUpdate.id, commentUpdate);
          this.#uiBlocker.unblock();
        } catch (err) {
          this.popupPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#uiBlocker.block();
        this.popupPresenter.setDeleting();
        try {
          await this.#commentsModel.deleteComment(updateType, filmUpdate, commentUpdate, this.#filmCardsModel.init);
          this.#uiBlocker.unblock();
        } catch (err) {
          this.popupPresenter.setAborting();
        }
        break;
      case UserAction.CLOSE_POPUP:
        this.#refreshFilmsList();
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.UPDATE:
        this.#filmPresenter.get(data.film.id).init(data.film, this.comments);
        this.#filmCardsModel.init(UpdateType.MINOR, data.film.id);
        break;
      case UpdateType.PATCH:
        this.#clearFilmsList({ resetRenderedFilmsCount: false, resetSortType: false });
        this.#renderUserProfile();
        this.#renderFilmsList();
        break;
      case UpdateType.MINOR:
        this.#filmPresenter.get(data.id).init(data, this.comments);
        if (this.popupPresenter !== null) {
          this.#newPopupHandler(data, this.comments);
        }
        this.#renderUserProfile();
        this.#rerenderExtraFilmsInfo();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsList({ resetRenderedFilmsCount: true, resetSortType: true });
        this.#renderUserProfile();
        this.#renderFilmsList();
        break;
      case UpdateType.INIT:
        this.#getAllComments();
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderUserProfile();
        this.#renderFilmsList();
        break;
      case UpdateType.INIT_COMMENT:
        this.#filmPresenter.forEach((presenter) => presenter.getComments(this.comments));
        break;
    }
  };

  init = (mainContainer) => {
    this.mainContainer = mainContainer;
    this.#emptyListView = new EmptyListView(this.#filterModel.filter);
    this.#emptyListView.init();
    this.#renderUserProfileView();
    this.#renderFilmsList();
  };

  #getAllComments = () => {
    this.#filmCardsModel.films.forEach((film) => this.#commentsModel.getFilmComments(film.id));
  };


  #handleShowMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmsCount, this.#currentCountFilms + FILMS_COUNT_PER_ROW);
    const films = this.films.slice(this.#currentCountFilms, newRenderedFilmCount);

    this.#renderFilmsCards(films);
    this.#currentCountFilms = newRenderedFilmCount;

    if (this.#currentCountFilms >= filmsCount) {
      remove(this.#showMoreButton);
    }
  };


  #renderFilmsContainer = () => {
    render(this.#mainFilmsSection, this.mainContainer);
    render(this.#filmsSection, this.#mainFilmsSection.element);
    render(this.#filmsContainer, this.#filmsSection.element);
  };

  #clearFilmsContainer = () => {
    remove(this.#mainFilmsSection);
    remove(this.#filmsSection);
    remove(this.#filmsContainer);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#activeSortOrder === sortType) {
      return;
    }

    this.#activeSortOrder = sortType;
    this.#refreshFilmsList();
    this.#closeOpenPopup();
  };

  #renderSort = () => {
    render(this.#SortButtons, this.mainContainer, RenderPosition.BEFOREEND);
    this.#SortButtons.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #refreshFilmsList = () => {
    this.#clearFilmsList();
    this.#renderFilmsList();
  };


  #renderFilmCard = (filmCard) => {
    this.#filmCardPresenter = new FilmCardPresenter(
      this.#filmsContainer,
      this.#handleViewAction,
      this.#newPopupHandler,
      this.#filterModel.filter
    );
    this.#filmCardPresenter.init(filmCard, this.comments);
    this.#filmPresenter.set(filmCard.id, this.#filmCardPresenter);
  };

  #renderFilmsCards = (films) => {
    films.forEach((card) => this.#renderFilmCard(card));
  };

  #renderFilmsList = () => {
    const filmsCount = this.films.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films.slice(0, Math.min(filmsCount, this.#currentCountFilms));

    this.#renderSort();
    this.#renderFilmsContainer();

    if (filmsCount === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderFilmsCards(films.slice(0, Math.min(filmsCount, this.#currentCountFilms)));

    if (filmsCount >= FILMS_COUNT_PER_ROW) {
      this.#renderShowMoreButton();
    }
    this.#extraFilmsPresenter.init(siteMainElement, this.#filmCardsModel.films);

  };

  #clearFilmsList = ({ resetRenderedFilmsCount = false, resetSortType = false } = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#clearFilmsContainer();
    // this.#currentCountFilms = FILMS_COUNT_PER_ROW;
    remove(this.#showMoreButton);

    if (this.#emptyListView) {
      this.#removeEmptyListView();
    }

    if (resetRenderedFilmsCount) {
      this.#currentCountFilms = FILMS_COUNT_PER_ROW;
    } else {
      this.#currentCountFilms = Math.min(filmsCount, this.#currentCountFilms);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #closeOpenPopup = () => {
    if (this.popupPresenter !== null) {
      this.popupPresenter.destroy();
      this.popupPresenter = null;
    }
  };


  #newPopupHandler = (film) => {
    this.#closeOpenPopup();
    this.popupPresenter = new PopupPresenter(this.#handleViewAction, this.#isPopupOpen);
    this.popupPresenter.init(film, this.comments, siteMainElement);
  };

  #isPopupOpen = () => {
    this.popupPresenter.destroy();
    this.popupPresenter = null;
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsSection.element);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderEmptyList = () => {
    this.#emptyListView.init(this.#filterModel.filter);
    remove(this.#loadingComponent);
    render(this.#emptyListView, this.#filmsContainer.element);
  };

  #removeEmptyListView = () => {
    remove(this.#emptyListView);
    this.#emptyListView.removeElement();
  };

  #renderUserProfile = () => {
    if (this.#prevUserProfile === null) {
      this.#renderUserProfileView();
    } else {
      remove(this.#userProfileView);
      this.#renderUserProfileView();
    }
    this.#prevUserProfile = this.#userProfileView;
  };

  #renderUserProfileView = () => {
    this.#userProfileView.init(this.#isLoading, this.#filmCardsModel.films);
    render(this.#userProfileView, siteHeaderElement);
    this.#prevUserProfile = this.#userProfileView;
  };

  #rerenderExtraFilmsInfo = () => {
    this.#extraFilmsPresenter.destroy();
    this.#extraFilmsPresenter.init(siteMainElement, this.#filmCardsModel.films);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.mainContainer);
  };
}
