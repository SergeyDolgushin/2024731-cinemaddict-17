import { render, remove, RenderPosition } from '../framework/render.js';
import { sortDateDown, sortRateDown } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ExtraFilmsPresenter from './extra-films-presenter.js';
import PopupPresenter from './popup-presenter.js';
import SortButtonsView from '../view/sort-buttons-view.js';
import EmptyListView from '../view/empty-list-view.js';

const FILMS_COUNT_PER_ROW = 5;
const siteMainElement = document.querySelector('.main');

export default class MainPresenter {
  #mainFilmsSection = new FilmsSectionView();
  #filmsSection = new FilmsListSectionView();
  #filmsContainer = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #SortButtons = new SortButtonsView();
  #extraFilmsPresenter = new ExtraFilmsPresenter();
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
  #openPresenter = null;

  constructor(filmsModel, commentsModel, filterModel) {
    this.#filmCardsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#filmCardsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmCardsModel.films;
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

  #handleViewAction = (actionType, updateType, filmUpdate, commentUpdate) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmCardsModel.updateFilm(updateType, filmUpdate);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, commentUpdate);
        this.#filmCardsModel.updateFilm(updateType, filmUpdate);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, commentUpdate);
        this.#filmCardsModel.updateFilmComment(updateType, filmUpdate, commentUpdate);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data, this.comments);
        break;
      case UpdateType.MINOR:
        this.#filmPresenter.get(data.id).init(data, this.comments);
        if (this.popupPresenter !== null) {
          this.#newPopupHandler(data, this.comments);
        }
        this.#extraFilmsPresenter.destroy();
        this.#extraFilmsPresenter.init(siteMainElement, this.#filmCardsModel.films);
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsList({ resetRenderedFilmsCount: true, resetSortType: true });
        this.#renderFilmsList();
        break;
    }
  };

  init = (mainContainer) => {
    this.mainContainer = mainContainer;
    this.#emptyListView = new EmptyListView(this.#filterModel.filter);
    this.#emptyListView.init();
    this.#renderFilmsList();
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
    const films = this.films.slice(0, Math.min(filmsCount, FILMS_COUNT_PER_ROW));

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

    if (this.popupPresenter !== null) {
      this.#openPresenter = this.popupPresenter;
    }

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#clearFilmsContainer();
    this.#currentCountFilms = FILMS_COUNT_PER_ROW;
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


  #newPopupHandler = (film, comments) => {
    this.#closeOpenPopup();
    this.popupPresenter = new PopupPresenter(this.#handleViewAction, this.#isPopupOpen);
    this.popupPresenter.init(film, comments, siteMainElement);
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
    render(this.#emptyListView, this.#filmsContainer.element);
  };

  #removeEmptyListView = () => {
    remove(this.#emptyListView);
    this.#emptyListView.removeElement();
  };

}
