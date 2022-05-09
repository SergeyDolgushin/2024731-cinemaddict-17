import { render, RenderPosition } from './render.js';
import CommentsModel from './model/comments-model.js';
import FilmCardsModel from './model/films-model.js';
import NavigationView from './view/navigation-view.js';
import MainPresenter from './presenter/main-presenter.js';
import ExtraFilmsPresenter from './presenter/extra-films-presenter.js';
import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filter-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const mainPresenter = new MainPresenter();
const extraFilmsPresenter = new ExtraFilmsPresenter();
const commentsModel = new CommentsModel();
const filmCardsModel = new FilmCardsModel(commentsModel);
render(new UserProfileView(), siteHeaderElement);
render(new NavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteMainElement);
mainPresenter.init(siteMainElement, filmCardsModel.getFilms(), commentsModel.getComments());
extraFilmsPresenter.init(siteMainElement, filmCardsModel.getFilms());

