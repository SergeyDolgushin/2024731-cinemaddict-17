import he from 'he';
import { setActiveClass, humanizeDateTime } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const isCtrlEnterPressed = (evt) => (evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey);

const createCommentTemplate = (film, comments, isDisabled, isDeleting) => {
  const listComments = [];
  comments.forEach((comment) => {
    if (film.comments.includes(comment.id)) {
      listComments.push(
        `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${comment.author}</span>
                  <span class="film-details__comment-day">${humanizeDateTime(comment.date)}</span>
                  <button type="button" class="film-details__comment-delete" data-id="${comment.id}" ${isDisabled ? 'disabled' : ''}>
                    ${isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </p>
              </div>
            </li>`
      );
    }
  });
  return listComments.join('');
};

const createPopupTemplate = (filmCard, listComments, isSaving, isDisabled, comment) => {
  const activeClass = 'film-details__control-button--active';
  const userDetails = filmCard.filmInfo.userDetails;

  const activeClassButtonWatchlist = setActiveClass(userDetails.watchlist, activeClass);
  const activeClassButtonAlreadyWatched = setActiveClass(userDetails.alreadyWatched, activeClass);
  const activeClassButtonFavorite = setActiveClass(userDetails.favorite, activeClass);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmCard.filmInfo.poster}" alt="">
            <p class="film-details__age">18+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmCard.filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmCard.filmInfo.alternativeTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmCard.filmInfo.totalRating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmCard.filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmCard.filmInfo.writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmCard.filmInfo.actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmCard.filmInfo.release.date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmCard.filmInfo.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmCard.filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${filmCard.filmInfo.genre.join(', ')}</span>
              </tr>
            </table>
            <p class="film-details__film-description">
            ${filmCard.filmInfo.description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="${activeClassButtonWatchlist} film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
          <button type="button" class="${activeClassButtonAlreadyWatched} film-details__control-button film-details__control-button--watched" id="watched" name="watched" ${isDisabled ? 'disabled' : ''}>Already watched</button>
          <button type="button" class="${activeClassButtonFavorite} film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite" ${isDisabled ? 'disabled' : ''}>Add to favorites</button>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${listComments}
          </ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>
              ${isSaving ? 'Saving...' : comment}
              </textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
    </section>`
  );
};

export default class PopupView extends AbstractStatefulView {
  #filmCard = null;
  #filmComments = null;
  _state = null;
  #arrCode = [];
  #scrollPosition = 0;


  constructor(filmCard, filmsComments) {
    super();
    this.#filmCard = filmCard;
    this.#filmComments = filmsComments;
    this._state = PopupView.parseDataToState(filmCard, filmsComments);
    this.#addCommentsHandlers();
  }

  get template() {
    const listComments = createCommentTemplate(this._state.film, this._state.comments, this._state.isDisabled, this._state.isDeleting);

    return createPopupTemplate(this._state.film, listComments, this._state.isSaving, this._state.isDisabled, this._state.comment);
  }

  get scrollPosition() {
    return this.#scrollPosition;
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  setEscExitHandler = (callback) => {
    this._callback.escExit = callback;
    document.addEventListener('keydown', this.#escHandler);
  };

  setPreferenceButtons = (cbWatchlist, cbWatched, cbFavorite) => {
    this.#setWatchlistHandler(cbWatchlist);
    this.#setWatchedHandler(cbWatched);
    this.#setFavoriteHandler(cbFavorite);
  };

  #clickHandler = () => {
    this._callback.click();
  };

  #escHandler = (evt) => {
    this._callback.escExit(evt);
  };

  #setWatchlistHandler = (callback) => {
    this._callback.clickWatchList = callback;
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
  };

  #clickWatchlistHandler = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    this._callback.clickWatchList();
  };

  #setWatchedHandler = (callback) => {
    this._callback.clickWatched = callback;
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#clickWatchedHandler);
  };

  #clickWatchedHandler = (evt) => {
    evt.stopPropagation();
    this._callback.clickWatched();
  };

  #setFavoriteHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickFavoriteHandler = (evt) => {
    evt.stopPropagation();
    this._callback.clickFavorite();
  };

  deleteButtonHandler = (callback) => {
    this._callback.clickDeleteButton = callback;
    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((button) => button.addEventListener('click', this.#commentDeleteClickHandler));
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();

    const commentId = evt.target.dataset.id;
    this.updateElement();

    this._callback.clickDeleteButton(commentId);
  };


  #selectEmojiHandler = (evt) => {
    const urlEmojie = `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="${evt.target.id}"></img>`;
    const emojieContainer = this.element.querySelector('.film-details__add-emoji-label');
    evt.preventDefault();
    if (emojieContainer.firstChild !== null) {
      emojieContainer.removeChild(emojieContainer.firstChild);
    }
    emojieContainer.insertAdjacentHTML('afterbegin', urlEmojie);
    this._setState({
      emotion: evt.target.value,
      scrollPosition: this.element.scrollTop,
    });
  };


  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  sendNewComment = (callback) => {
    this._callback.addComment = callback;
    // document.addEventListener('keydown', this.#detectKeysPressed);
    document.addEventListener('keyup', this.#commentAddHandler);
  };

  // #detectKeysPressed = (evt) => {
  //   if (evt.code === 'ControlLeft' || evt.code === 'Enter') {
  //     if (evt.repeat) {
  //       return;
  //     }
  //     this.#arrCode.push(evt.code);
  //   }
  // };

  // #addNewCommentHandler = (evt) => {
  //   if (this.#arrCode.includes('ControlLeft') && this.#arrCode.includes('Enter') && this.#arrCode.includes(evt.code)) {
  //     this.#arrCode = [];
  //     const tempComment = {};
  //     tempComment.comment = this._state.comment;
  //     tempComment.emotion = this._state.emotion;
  //     this._setState({ ...tempComment });
  //     this._callback.addComment(this._state);
  //   }
  // };

  #commentAddHandler = (evt) => {
    if (!this._state.emotion || this._state.comment === '') {
      return;
    }

    if (isCtrlEnterPressed(evt)) {
      evt.preventDefault();

      this._setState({
        comment: evt.target.value,
        emotion: this._state.emotion,
      });

      // this.updateElement({
      //   isSaving: true
      // });

      this._callback.addComment(this._state);
    }
  };

  #addCommentsHandlers = () => {
    const emojiesElements = this.element.querySelectorAll('.film-details__emoji-item');
    emojiesElements.forEach((element) => element.addEventListener('click', this.#selectEmojiHandler));
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
  };

  _restoreHandlers = () => {
    this.sendNewComment(this._callback.addComment);
    this.#addCommentsHandlers();
    this.deleteButtonHandler(this._callback.clickDeleteButton);
    this.setClickHandler(this._callback.click);
    this.setPreferenceButtons(
      this._callback.clickWatchList,
      this._callback.clickWatched,
      this._callback.clickFavorite
    );
  };

  destroy = () => {
    // document.removeEventListener('keydown', this.#detectKeysPressed);
    document.removeEventListener('keyup', this.#commentAddHandler);
    document.removeEventListener('keydown', this.#escHandler);
    this.element.remove();
  };

  updateView = (update) => {
    this.#scrollPosition = this.element.scrollTop;
    this.updateElement(update);
    this.element.scrollTop = this.#scrollPosition;
  };

  updateState = (update) => {
    this._setState(update);
  };

  static parseDataToState = (film, comments) => ({
    film,
    comments,
    emotion: null,
    comment: '',
    isDeleting: false,
    isDisabled: false,
    isSaving: false,
    scrollPosition: 0,
  });
}
