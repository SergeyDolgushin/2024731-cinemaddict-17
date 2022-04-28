import NewShowMoreContainerView from '../view/show-more-container-view.js';
import NewFilmView from '../view/film-card-view.js';

import {render} from '../render.js';

const topRated = {
  title: 'Top rated',
  showMoreInstance: '',
  element: '',
};

const mostCommented = {
  title: 'Most commented',
  showMoreInstance: '',
  element: '',
};

const showMoreInstances = [topRated, mostCommented];

export default class ShowMorePresenter {

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    const mainSection = this.mainContainer.querySelector('.films');
    for (const item of showMoreInstances) {
      item.showMoreInstance = new NewShowMoreContainerView();
      item.showMoreInstance.init(item);
      item.element = item.showMoreInstance.getElement();
      const placeShowMoreFilm = item.element.querySelector('.films-list__container');
      render(item.showMoreInstance, mainSection);
      render(new NewFilmView(), placeShowMoreFilm);
    }
  };
}
