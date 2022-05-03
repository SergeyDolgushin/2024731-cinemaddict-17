import ShowUserProfileView from './view/user-view.js';
import FiltersView from './view/filter-view.js';
import NavigationView from './view/navigation-view.js';
import { render, RenderPosition } from './render.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ExtraFilmsPresenter from './presenter/show-more-presenter.js';
import FilmCardsModel from './model/film-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const mainPresenter = new MainPresenter();
const popupPresenter = new PopupPresenter();
const extraFilmsPresenter = new ExtraFilmsPresenter();
const filmCardsModel = new FilmCardsModel();

render(new ShowUserProfileView(), siteHeaderElement);
render(new NavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteMainElement);
mainPresenter.init(siteMainElement, filmCardsModel);
extraFilmsPresenter.init(siteMainElement, filmCardsModel);
popupPresenter.init(footerElement, filmCardsModel, RenderPosition.AFTEREND);

