import { render } from './framework/render.js';
import CommentsModel from './model/comments-model.js';
import FilmCardsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import UserProfileView from './view/user-profile-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const commentsModel = new CommentsModel();
const filmCardsModel = new FilmCardsModel(commentsModel);
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(filmCardsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmCardsModel);

render(new UserProfileView(), siteHeaderElement);
filterPresenter.init();
mainPresenter.init(siteMainElement);

