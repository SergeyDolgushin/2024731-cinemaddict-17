import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsSectionView from '../view/main-films-section-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmView from '../view/film-card-view.js';
import {render} from '../render.js';


export default class MainPresenter {
  mainFilmsSection = new FilmsSectionView();
  filmsSection = new FilmsListSectionView();
  filmsContainer = new FilmsListContainerView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.mainFilmsSection, this.mainContainer);
    render(this.filmsSection, this.mainFilmsSection.getElement());
    render(this.filmsContainer, this.filmsSection.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmView(), this.filmsContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsSection.getElement());
  };
}
