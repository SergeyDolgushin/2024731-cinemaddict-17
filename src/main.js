import { render } from './framework/render.js';
import CommentsModel from './model/comments-model.js';
import FilmCardsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import UserProfileView from './view/user-profile-view.js';
import FilmsApiService from './api/films-api-service.js';
import CommentsApiService from './api/comments-api-service.js';

const AUTHORIZATION = 'Basic hS6sfS73wcl1sa5j';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filmCardsModel = new FilmCardsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(filmCardsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmCardsModel);

render(new UserProfileView(), siteHeaderElement);
filterPresenter.init();
mainPresenter.init(siteMainElement);
filmCardsModel.init();

