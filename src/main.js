import { render } from './framework/render.js';
import CommentsModel from './model/comments-model.js';
import FilmCardsModel from './model/films-model.js';
import MainPresenter from './presenter/main-presenter.js';
import ExtraFilmsPresenter from './presenter/extra-films-presenter.js';
import UserProfileView from './view/user-profile-view.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const commentsModel = new CommentsModel();
const filmCardsModel = new FilmCardsModel(commentsModel);
const mainPresenter = new MainPresenter(filmCardsModel.getFilms(), commentsModel.getComments());
const extraFilmsPresenter = new ExtraFilmsPresenter();

render(new UserProfileView(), siteHeaderElement);
mainPresenter.init(siteMainElement);
extraFilmsPresenter.init(siteMainElement, filmCardsModel.films);

