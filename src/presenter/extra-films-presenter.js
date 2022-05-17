import { render } from '../framework/render.js';
import ExtraFilmsContainerView from '../view/extra-container-view.js';
import FilmView from '../view/film-card-view.js';

const topRated = {
  title: 'Top rated',
  showMoreInstance: '',
};

const mostCommented = {
  title: 'Most commented',
  showMoreInstance: '',
};

const showMoreInstances = [topRated, mostCommented];

export default class ExtraFilmsPresenter {
  #filmCards = null;

  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;

    if (this.filmsModel.length > 0) {
      this.#filmCards = this.filmsModel.reduce((acc, curr) => acc.filmInfo.totalRating > curr.filmInfo.totalRating ? acc : curr);
      const mainSection = this.mainContainer.querySelector('.films');
      for (const item of showMoreInstances) {
        const showMoreInstance = new ExtraFilmsContainerView(item);
        render(showMoreInstance, mainSection);
        const placeShowMoreFilm = showMoreInstance.element.querySelector('.films-list__container');
        render(new FilmView(this.#filmCards), placeShowMoreFilm);
      }
    }
  };
}
