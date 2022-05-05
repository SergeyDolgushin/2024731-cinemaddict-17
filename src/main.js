import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filter-view.js';
import NavigationView from './view/navigation-view.js';
import { render, RenderPosition } from './render.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ExtraFilmsPresenter from './presenter/extra-films-presenter.js';
import FilmCardsModel from './model/film-model.js';
import CommentsModel from './model/comment-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const mainPresenter = new MainPresenter();
const popupPresenter = new PopupPresenter();
const extraFilmsPresenter = new ExtraFilmsPresenter();
const commentsModel = new CommentsModel();
const filmCardsModel = new FilmCardsModel(commentsModel.getComments());
filmCardsModel.getCards();
render(new UserProfileView(), siteHeaderElement);
render(new NavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteMainElement);
mainPresenter.init(siteMainElement, filmCardsModel);
extraFilmsPresenter.init(siteMainElement, filmCardsModel);
popupPresenter.init(footerElement, filmCardsModel, commentsModel);

