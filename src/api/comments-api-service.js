import ApiService from '../framework/api-service.js';
import { Method } from './api-consts.js';


export default class CommentsApiService extends ApiService {
  getComments = (filmId) => this._load({ url: `comments/${filmId}` })
    .then(ApiService.parseResponse);


  updateComment = async (filmId, comment) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment}`,
      method: Method.DELETE,
    });

    return response;
  };
}
