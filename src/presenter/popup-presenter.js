import PopupView from '../view/popup-view.js';
import { render } from '../render.js';

export default class PopupPresenter {
  init = (mainContainer, filmsModel, commentsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.filmCards = [...this.filmsModel.films];
    this.commentsModel = commentsModel;
    this.filmComments = [...this.commentsModel.comments];

    render(new PopupView(this.filmCards[0], this.filmComments), this.mainContainer);
  };
}
