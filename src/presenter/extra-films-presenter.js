import { render } from '../framework/render.js';
import { sortRateDown, sortMostCommented } from '../utils/sorting.js';
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

export default class ExtraFilmsPresenter {
  #filmCardsTopRated = null;
  #filmCardsMostCommented = null;
  #originalfilmCards = null;

  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.#filmCardsTopRated = [...filmsModel];
    this.#filmCardsMostCommented = [...filmsModel];
    this.#originalfilmCards = [...filmsModel];


    if (this.#originalfilmCards.length > 0) {
      this.#filmCardsTopRated.sort(sortRateDown);
      this.#filmCardsMostCommented.sort(sortMostCommented);
      const mainSection = this.mainContainer.querySelector('.films');
      if (this.#filmCardsTopRated.length > 0) {
        const extraContainerTopRated = this.#renderContainer(topRated, mainSection);
        this.#renderTopRated(extraContainerTopRated);
      }
      if (this.#filmCardsMostCommented.length > 0) {
        const extraContainerMostCommented = this.#renderContainer(mostCommented, mainSection);
        this.#renderMostCommented(extraContainerMostCommented);
      }
    }
  };

  #renderTopRated = (extraContainer) => {
    const placeShowMoreFilm = extraContainer.element.querySelector('.films-list__container');
    this.#filmCardsTopRated.slice(0, 2).forEach((element) =>
      render(new FilmView(element), placeShowMoreFilm)
    );
  };

  #renderMostCommented = (extraContainer) => {
    const placeShowMoreFilm = extraContainer.element.querySelector('.films-list__container');
    this.#filmCardsMostCommented.slice(0, 2).forEach((element) =>
      render(new FilmView(element), placeShowMoreFilm)
    );
  };

  #renderContainer = (item, mainSection) => {
    const extraContainer = new ExtraFilmsContainerView(item);
    render(extraContainer, mainSection);

    return extraContainer;
  };

}
