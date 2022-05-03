import PopupView from '../view/main-popup-view.js';
import { render } from '../render.js';

export default class PopupPresenter {

  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.filmCards = [...this.filmsModel.getCurrentCards()];
    this.filmComments = [...this.filmsModel.getCurrentComments()];

    render(new PopupView(this.filmCards[0], this.filmComments), this.mainContainer);
  };
}
