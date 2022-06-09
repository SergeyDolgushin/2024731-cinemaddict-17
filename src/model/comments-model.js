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

  addComment = async (updateType, filmId, commentId) => {
    let updatedData = null;
    try {
      updatedData = await this.#commentsApiService.updateComment(filmId, commentId);
      this.#comments = [...updatedData.comments];
    } catch {
      this.#comments = [];
    }
    this._notify(
      updateType,
      {
        'film': adaptToClient(updatedData.movie),
        'comments': this.#comments,
        'commentId': commentId,
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
    } catch (err) {
      throw new Error('Can\'t delete task');
    }
    this._notify(
      updateType,
      {
        'comments': update,
        'filmId': filmId,
        'status': 'delete',
      }
    );
  };
}
