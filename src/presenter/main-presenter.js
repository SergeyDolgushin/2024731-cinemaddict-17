import { render } from '../render.js';
import PopupPresenter from './popup-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import EmptyListView from '../view/empty-list-view.js';

const FILMS_COUNT_PER_ROW = 5;
const siteMainElement = document.querySelector('.main');


export default class MainPresenter {
  mainFilmsSection = new FilmsSectionView();
  filmsSection = new FilmsListSectionView();
  filmsContainer = new FilmsListContainerView();
  showMoreButton = new ShowMoreButtonView();

  #currentCountFilms = FILMS_COUNT_PER_ROW;

  #renderCard = (card, comments) => {
    const filmCardView = new FilmCardView(card);
    render(filmCardView, this.filmsContainer.getElement());
    filmCardView.element.querySelector('.film-card__poster').addEventListener('click', () => {
      const popupView = new PopupPresenter();
      popupView.init(siteMainElement, card, comments);
    });
  };

  init = (mainContainer, filmsModel, commentsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.filmCards = [...this.filmsModel];
    this.commentsModel = commentsModel;
    this.filmComments = [...this.commentsModel];

    render(this.mainFilmsSection, this.mainContainer);
    render(this.filmsSection, this.mainFilmsSection.getElement());
    render(this.filmsContainer, this.filmsSection.getElement());
    if (this.filmCards.length === 0) {
      const emptyList = new EmptyListView();
      render(emptyList, this.filmsContainer.getElement());
    } else {
      for (let i = 0; i < Math.min(this.filmCards.length, FILMS_COUNT_PER_ROW); i++) {
        this.#renderCard(this.filmCards[i], this.filmComments);
      }
    }

    if (this.filmCards.length > FILMS_COUNT_PER_ROW) {
      render(this.showMoreButton, this.filmsSection.getElement());

      this.showMoreButton.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.filmCards
      .slice(this.#currentCountFilms, this.#currentCountFilms + FILMS_COUNT_PER_ROW)
      .forEach((films) => this.#renderCard(films, this.filmComments));

    this.#currentCountFilms += FILMS_COUNT_PER_ROW;

    if (this.#currentCountFilms > this.filmCards.length) {
      this.showMoreButton.element.remove();
      this.showMoreButton.removeElement();
    }

  };

}
