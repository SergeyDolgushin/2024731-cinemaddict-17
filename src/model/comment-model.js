
import { generateComment } from '../mock/films-comments.js';
import { getRandomInteger, shuffle } from '../utils.js';

const minRangeQunatity = 50;
const maxRangeQunatity = 100;
const quantityComments = getRandomInteger(minRangeQunatity, maxRangeQunatity);

export default class CommentsModel {
  comments = Array.from({ length: quantityComments }, generateComment);

  getComments = () => shuffle(this.comments);
}
