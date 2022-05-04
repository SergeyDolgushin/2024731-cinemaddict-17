import ExtraFilmsContainerView from '../view/extra-container-view.js';
import FilmView from '../view/film-card-view.js';

import { render } from '../render.js';

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
  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.filmCards = [...this.filmsModel.getCurrentCards()];

    const mainSection = this.mainContainer.querySelector('.films');
    for (const item of showMoreInstances) {
      const showMoreInstance = new ExtraFilmsContainerView(item);
      render(showMoreInstance, mainSection);
      const placeShowMoreFilm = showMoreInstance.getElement(item).querySelector('.films-list__container');
      render(new FilmView(this.filmCards[0]), placeShowMoreFilm);
    }
  };
}
