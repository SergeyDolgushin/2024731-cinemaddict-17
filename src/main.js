import NewShowUserView from './view/user-view.js';
import NewFiltersView from './view/filter-view.js';
import NewNavigationView from './view/navigation-view.js';
import {render, RenderPosition} from './render.js';
import MainPresenter from './presenter/main-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ShowMorePresenter from './presenter/show-more-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const mainPresenter = new MainPresenter();
const popupPresenter = new PopupPresenter();
const showMorePresenter = new ShowMorePresenter();

render(new NewShowUserView(), siteHeaderElement);
render(new NewNavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new NewFiltersView(), siteMainElement);
mainPresenter.init(siteMainElement);
showMorePresenter.init(siteMainElement);
popupPresenter.init(footerElement, RenderPosition.AFTEREND);

