import { UpdateType } from '../const.js';
import { adaptToClient } from '../api/adapters.js';
import Observable from '../framework/observable.js';

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
      this.#comments = [...this.comments, ...comments];
      this._notify(UpdateType.INIT_COMMENT);
    } catch {
      return [];
    }
  };

  addComment = async (updateType, filmId, comment) => {
    let updatedData = null;
    try {
      updatedData = await this.#commentsApiService.addComment(filmId, comment);
      updatedData.comments.forEach((newComment) => {
        const index = this.#comments.findIndex((currentComment) => currentComment.id === newComment.id);
        if (index !== -1) {
          this.#comments.splice(index, 1);
        }
      });

      this.#comments = [...this.#comments, ...updatedData.comments];
      this._notify(
        updateType,
        {
          'film': adaptToClient(updatedData.movie),
          'commentId': updatedData.commentId,
        }
      );
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  addComments = (comments) => {
    this.#comments = [...this.comments, ...comments];
  };

  get comments() {

    return this.#comments;
  }

  // addComment = (updateType, update) => {
  //   this.#comments.push(update);

  //   this._notify(updateType, update);
  // };

  deleteComment = async (updateType, film, update, callback) => {
    const index = this.#comments.findIndex((comment) => Number(comment.id) === Number(update));
    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments.splice(index, 1);
      callback(updateType, film.id);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
