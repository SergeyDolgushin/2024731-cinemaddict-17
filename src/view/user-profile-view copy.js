import { UserRaiting } from '../const';
import { FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import AbstractView from '../framework/view/abstract-view.js';

const createUserProfileTemplate = (raiting) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${raiting}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);


export default class UserProfileView extends AbstractView {
  #count = 0;
  #raiting = UserRaiting.NONE;

  init = (isLoading, filmsCards) => {
    const films = isLoading ? [] : filmsCards;
    this.#count = filter[FilterType.ALREADYWATCHED](films).length;

    this.#raiting = UserRaiting.NONE;
    if (this.#count === 0) {
      this.#raiting = UserRaiting.NONE;
      return;
    }
    if (this.#count <= 10) {
      this.#raiting = UserRaiting.NOVICE;
      return;
    }
    if (this.#count <= 20) {
      this.#raiting = UserRaiting.FAN;
      return;
    }
    if (this.#count >= 21) {
      this.#raiting = UserRaiting.BUFF;
    }
  };

  get template() {

    return createUserProfileTemplate(this.#raiting);
  }
}
