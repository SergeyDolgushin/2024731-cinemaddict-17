import NewShowMoreButtonView from '../view/show-more-button-view.js';
import NewFilmsSectionView from '../view/main-films-section-view.js';
import NewFilmsListSectionView from '../view/films-list-section-view.js';
import NewFilmsListContainerView from '../view/films-list-container-view.js';
import NewFilmView from '../view/film-card-view.js';
import {render} from '../render.js';


export default class MainPresenter {
  mainFilmsSection = new NewFilmsSectionView();
  filmsSection = new NewFilmsListSectionView();
  filmsContainer = new NewFilmsListContainerView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.mainFilmsSection, this.mainContainer);
    render(this.filmsSection, this.mainFilmsSection.getElement());
    render(this.filmsContainer, this.filmsSection.getElement());

    for (let i = 0; i < 5; i++) {
      render(new NewFilmView(), this.filmsContainer.getElement());
    }

    render(new NewShowMoreButtonView(), this.filmsSection.getElement());
  };
}
