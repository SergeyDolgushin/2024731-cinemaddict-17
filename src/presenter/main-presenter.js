import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils.js';
import { sortDateDown, sortRateDown } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';
import { SortType, FilterType } from '../const.js';
import FilmCardPresenter from './film-card-presenter.js';
import SortMenuView from '../view/sort-meny-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import PopupPresenter from './popup-presenter.js';
import FiltersView from '../view/filter-view.js';
import EmptyListView from '../view/empty-list-view.js';

const FILMS_COUNT_PER_ROW = 5;
const siteMainElement = document.querySelector('.main');

export default class MainPresenter {
  #mainFilmsSection = new FilmsSectionView();
  #filmsSection = new FilmsListSectionView();
  #filmsContainer = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #filterComponent = new FiltersView();
  #sortMenuView = null;
  #filmCardPresenter = null;
  #filmPresenter = new Map();
  #originalFilmsCards = [];
  #currentCountFilms = FILMS_COUNT_PER_ROW;
  #currentSortType = SortType.DEFAULT;
  #currentFilterType = FilterType.ALL;
  #NavigationElement = null;
  #filters = null;
  #currentActiveFilter = null;
  popupPresenter = null;

  constructor(filmsModel, commentsModel) {
    this.#originalFilmsCards = [...filmsModel];
    this.filmCards = [...filmsModel];
    this.commentsModel = commentsModel;
    this.filmComments = [...this.commentsModel];
  }

  init = (mainContainer) => {
    this.mainContainer = mainContainer;
    this.#sortMenuView = new SortMenuView(this.filmCards);
    render(this.#sortMenuView, this.mainContainer, RenderPosition.AFTERBEGIN);
    this.#NavigationElement = document.querySelector('.main-navigation');
    this.#renderFilmsContainer();
    if (this.filmCards.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderFilter();
    this.#renderSort();
    this.#renderFilmsList();
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilmsCards(this.#currentCountFilms, this.#currentCountFilms + FILMS_COUNT_PER_ROW);
    this.#currentCountFilms += FILMS_COUNT_PER_ROW;

    if (this.#currentCountFilms > this.filmCards.length) {
      remove(this.#showMoreButton);
    }
  };

  #handleCardChange = (updatedFilmCard) => {
    this.filmCards = updateItem(this.filmCards, updatedFilmCard);
    this.#originalFilmsCards = updateItem(this.#originalFilmsCards, updatedFilmCard);
    this.#filmPresenter.get(updatedFilmCard.id).init(updatedFilmCard, this.filmComments);
    this.#refreshFilteredList();
  };

  #handleCommentChange = (updatedFilmCard, updatedComments) => {
    this.filmCards = updateItem(this.filmCards, updatedFilmCard);
    this.filmComments = updatedComments;
    this.#originalFilmsCards = updateItem(this.#originalFilmsCards, updatedFilmCard);
    this.#filmPresenter.get(updatedFilmCard.id).init(updatedFilmCard, this.filmComments);
    this.#refreshFilteredList();
  };


  #renderFilmsContainer = () => {
    render(this.#mainFilmsSection, this.mainContainer);
    render(this.#filmsSection, this.#mainFilmsSection.element);
    render(this.#filmsContainer, this.#filmsSection.element);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DATE:
        this.filmCards.sort(sortDateDown);
        break;
      case SortType.SORT_RATE:
        this.filmCards.sort(sortRateDown);
        break;
      default:
        this.filmCards = [...this.#originalFilmsCards];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#refreshFilmsList();
  };

  #renderSort = () => {
    render(this.#filterComponent, this.#NavigationElement, RenderPosition.AFTEREND);
    this.#filterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #filterFilms = (filterType) => {
    switch (filterType) {
      case FilterType.WATCHLIST:
        this.filmCards = [...filter[FilterType.WATCHLIST](this.filmCards)];
        break;
      case FilterType.ALREADYWATCHED:
        this.filmCards = [...filter[FilterType.ALREADYWATCHED](this.filmCards)];
        break;
      case FilterType.FAVORITE:
        this.filmCards = [...filter[FilterType.FAVORITE](this.filmCards)];
        break;
      default:
        this.filmCards = [...this.#originalFilmsCards];
    }

    this.#currentFilterType = filterType;
  };

  #handleFilterTypeChange = (filterType, state) => {
    if (this.#currentFilterType === filterType && state) {
      return;
    }
    this.#filterFilms(filterType);
    this.#refreshFilmsList();
    this.#currentActiveFilter = this.#sortMenuView.currentActiveFilter;
  };

  #refreshFilteredList = () => {
    if (this.#sortMenuView.currentActiveFilter === this.#currentActiveFilter) {
      this.#filterFilms(this.#sortMenuView.currentActiveFilter);
      this.#sortMenuView.refreshState(this.#originalFilmsCards);
      // this.#refreshFilmsList();
    }
    this.#currentActiveFilter = this.#sortMenuView.currentActiveFilter;
  };


  #refreshFilmsList = () => {
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #renderFilter = () => {
    this.#sortMenuView.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
  };

  #renderFilmCard = (filmCard) => {
    this.#filmCardPresenter = new FilmCardPresenter(
      this.#filmsContainer,
      this.#handleCardChange,
      this.#isPopupOpen,
      this.#newPopupHandler,
      this.#refreshPopup
    );
    this.#filmCardPresenter.init(filmCard, this.filmComments);
    this.#filmPresenter.set(filmCard.id, this.#filmCardPresenter);
  };

  #renderFilmsCards = (from, to) => {
    this.filmCards
      .slice(from, to)
      .forEach((card) => this.#renderFilmCard(card));
  };

  #renderFilmsList = () => {
    this.#renderFilmsCards(0, Math.min(this.filmCards.length, FILMS_COUNT_PER_ROW));

    if (this.filmCards.length > FILMS_COUNT_PER_ROW) {
      this.#renderShowMoreButton();
    }
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#currentCountFilms = FILMS_COUNT_PER_ROW;
    remove(this.#showMoreButton);
  };

  #isPopupOpen = () => {
    if (this.popupPresenter !== null) {
      this.popupPresenter.destroy();
      this.popupPresenter = null;
    }
  };

  #newPopupHandler = (film, comments) => {
    this.#isPopupOpen();
    this.popupPresenter = new PopupPresenter(this.#handleCardChange, this.#handleCommentChange);
    this.popupPresenter.init(film, comments, siteMainElement);
  };

  #refreshPopup = (film, comments) => {
    if (this.popupPresenter !== null) {
      this.popupPresenter.destroy();
      this.popupPresenter = null;
      this.popupPresenter = new PopupPresenter(this.#handleCardChange, this.#handleCommentChange);
      this.popupPresenter.init(film, comments, siteMainElement);
    }
  };


  #renderShowMoreButton = () => {
    if (this.filmCards.length > FILMS_COUNT_PER_ROW) {
      render(this.#showMoreButton, this.#filmsSection.element);

      this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderEmptyList = () => {
    render(new EmptyListView(), this.#filmsContainer.element);
  };

}
