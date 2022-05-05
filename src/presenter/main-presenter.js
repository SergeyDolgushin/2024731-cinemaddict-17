import { render } from '../render.js';
import PopupPresenter from './popup-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';

const siteMainElement = document.querySelector('.main');

export default class MainPresenter {
  mainFilmsSection = new FilmsSectionView();
  filmsSection = new FilmsListSectionView();
  filmsContainer = new FilmsListContainerView();

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
    for (let i = 0; i < this.filmCards.length; i++) {
      this.#renderCard(this.filmCards[i], this.filmComments);
    }

    render(new ShowMoreButtonView(), this.filmsSection.getElement());
  };
}
