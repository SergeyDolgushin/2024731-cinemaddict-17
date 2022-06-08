import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
import { adaptToClient } from '../api/adapters.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  getFilmComments = async (filmId) => {
    try {
      const comments = await this.#commentsApiService.getComments(filmId);
      this.#comments = [...comments];
    } catch {
      return [];
    }

    this._notify(UpdateType.PATCH, { 'filmId': filmId, 'filmComments': this.#comments });
  };

  addComment = async (updateType, filmId, comments) => {
    let updatedData = null;
    try {
      updatedData = await this.#commentsApiService.updateComment(filmId, comments);
      this.#comments = [...updatedData.comments];
    } catch {
      this.#comments = [];
    }
    this._notify(
      updateType,
      {
        'film': adaptToClient(updatedData.movie),
        'comments': this.#comments
      }
    );
  };

  get comments() {

    return this.#comments;
  }

  deleteComment = async (updateType, filmId, update) => {
    const index = this.#comments.findIndex((comment) => Number(comment.id) === Number(update));

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments.splice(index, 1);
      update = null;
      this._notify(
        updateType,
        {
          'comments': update,
          'filmId': filmId
        }
      );
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
  };
}
