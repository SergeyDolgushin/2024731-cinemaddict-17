import ShowMoreContainerView from '../view/show-more-container-view.js';
import NewFilmView from '../view/film-card-view.js';

import {render} from '../render.js';

const topRated = {
  title: 'Top rated',
  showMoreInstance: '',
};

const mostCommented = {
  title: 'Most commented',
  showMoreInstance: '',
};

const showMoreInstances = [topRated, mostCommented];

export default class ShowMorePresenter {

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    const mainSection = this.mainContainer.querySelector('.films');
    for (const item of showMoreInstances) {
      const showMoreInstance = new ShowMoreContainerView(item);
      render(showMoreInstance, mainSection);
      const placeShowMoreFilm = showMoreInstance.getElement(item).querySelector('.films-list__container');
      render(new NewFilmView(), placeShowMoreFilm);
    }
  };
}
