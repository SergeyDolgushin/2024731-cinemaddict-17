import ShowUserView from './view/user-view.js';
import FiltersView from './view/filter-view.js';
import NavigationView from './view/navigation-view.js';
import { render, RenderPosition } from './render.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ShowMorePresenter from './presenter/show-more-presenter.js';
import TasksModel from './model/task-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const mainPresenter = new MainPresenter();
const popupPresenter = new PopupPresenter();
const showMorePresenter = new ShowMorePresenter();
const tasksModel = new TasksModel();

render(new ShowUserView(), siteHeaderElement);
render(new NavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), siteMainElement);
mainPresenter.init(siteMainElement, tasksModel);
showMorePresenter.init(siteMainElement);
popupPresenter.init(footerElement, RenderPosition.AFTEREND);

