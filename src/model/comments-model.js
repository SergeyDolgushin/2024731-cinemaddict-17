import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #comments = null;

  constructor() {
    super();
    this.#comments = [];
  }

  addComments = (comments) => {
    this.#comments = [...this.comments, ...comments];
  };

  get comments() {

    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments.push(update);

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === Number(update));
    this.#comments.splice(index, 1);

    this._notify(updateType, update);
  };
}
