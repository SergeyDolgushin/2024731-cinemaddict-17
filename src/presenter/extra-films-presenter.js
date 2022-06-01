import { render, remove } from '../framework/render.js';
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
  #topRatedCards = new Map();
  #mostCommentedCards = new Map();
  #extraContainer = null;
  #extraContainerTopRated = null;
  #extraContainerMostCommented = null;

  init = (mainContainer, filmsModel) => {
    this.#filmCardsTopRated = [...filmsModel];
    this.#filmCardsMostCommented = [...filmsModel];
    this.#originalfilmCards = [...filmsModel];


    if (this.#originalfilmCards.length > 0) {
      this.#filmCardsTopRated.sort(sortRateDown);
      this.#filmCardsMostCommented.sort(sortMostCommented);
      const mainSection = mainContainer.querySelector('.films');
      if (this.#filmCardsTopRated.length > 0) {
        this.#extraContainerTopRated = this.#renderContainer(topRated, mainSection);
        this.#renderTopRated(this.#extraContainerTopRated);
      }
      if (this.#filmCardsMostCommented.length > 0) {
        this.#extraContainerMostCommented = this.#renderContainer(mostCommented, mainSection);
        this.#renderMostCommented(this.#extraContainerMostCommented);
      }
    }
  };

  #renderTopRated = (extraContainer) => {
    const topRatedContainer = extraContainer.element.querySelector('.films-list__container');
    this.#filmCardsTopRated.slice(0, 2).forEach((element, index) => {
      const topRatedCard = this.#renderNewCard(element, topRatedContainer);
      // render(topRatedCard, placeShowMoreFilm);
      this.#topRatedCards.set(index, topRatedCard);
    });
  };

  #renderMostCommented = (extraContainer) => {
    const showMoreFilmContainer = extraContainer.element.querySelector('.films-list__container');
    this.#filmCardsMostCommented.slice(0, 2).forEach((element, index) => {
      // const mostCommentedCard = new FilmView(element);
      // render(mostCommentedCard, placeShowMoreFilm);
      const mostCommentedCard = this.#renderNewCard(element, showMoreFilmContainer);
      this.#mostCommentedCards.set(index, mostCommentedCard);
    });
  };

  #renderNewCard = (element, container) => {
    const newCard = new FilmView(element);
    render(newCard, container);

    return newCard;
  };

  #renderContainer = (item, mainSection) => {
    this.#extraContainer = new ExtraFilmsContainerView(item);
    render(this.#extraContainer, mainSection);

    return this.#extraContainer;
  };

  destroy = () => {
    this.#topRatedCards.forEach((topRatedCard) => remove(topRatedCard));
    this.#topRatedCards.clear();
    this.#mostCommentedCards.forEach((mostCommentedCard) => remove(mostCommentedCard));
    this.#mostCommentedCards.clear();
    remove(this.#extraContainerTopRated);
    remove(this.#extraContainerMostCommented);
    remove(this.#extraContainer);
  };
}
