import NewShowUserView from './view/user-view.js';
import NewFiltersView from './view/filter-view.js';
import NewNavigationView from './view/navigation-view.js';
import {render, RenderPosition} from './render.js';
import MainPresenter from './presenter/main-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const mainPresenter = new MainPresenter();

render(new NewShowUserView(), siteHeaderElement);
render(new NewNavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new NewFiltersView(), siteMainElement);
mainPresenter.init(siteMainElement);

