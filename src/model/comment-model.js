export default class CommentsModel {
  constructor() {
    this.comments = [];
  }

  addComments = (comments) => this.comments.push(comments);

  getComments = () => this.comments.flat();
}
