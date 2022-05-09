export default class CommentsModel {
  constructor() {
    this.comments = [];
  }

  addComments = (comments) => {
    this.comments = [...this.comments, ...comments];
  };

  getComments = () => this.comments;
}
