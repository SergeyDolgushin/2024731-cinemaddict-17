import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../render.js';


export default class MainPresenter {
  mainFilmsSection = new FilmsSectionView();
  filmsSection = new FilmsListSectionView();
  filmsContainer = new FilmsListContainerView();

  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.filmCards = [...this.filmsModel.films];

    render(this.mainFilmsSection, this.mainContainer);
    render(this.filmsSection, this.mainFilmsSection.getElement());
    render(this.filmsContainer, this.filmsSection.getElement());
    for (let i = 0; i < this.filmCards.length; i++) {
      render(new FilmCardView(this.filmCards[i]), this.filmsContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsSection.getElement());
  };
}
