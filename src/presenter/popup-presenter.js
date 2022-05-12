import { render } from '../render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #renderPopup = (card, comments) => {
    const popupView = new PopupView(card, comments);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        popupView.element.remove();
        popupView.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    render(popupView, this.mainContainer);
    popupView.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      popupView.element.remove();
      popupView.removeElement();
    });
    document.addEventListener('keydown', onEscKeyDown);
  };

  init = (mainContainer, filmModel, commentsModel) => {
    this.mainContainer = mainContainer;
    this.filmModel = filmModel;
    this.filmCard = this.filmModel;
    this.commentsModel = commentsModel;
    this.filmComments = [...this.commentsModel];
    this.#renderPopup(this.filmCard, this.filmComments);
  };
}
