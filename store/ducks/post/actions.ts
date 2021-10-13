/* eslint-disable no-unused-vars */
import {PostActionType, IPost, SET_POST} from './types';

export function SetPostAction(post: IPost): PostActionType {
  return {
    type: SET_POST,
    post,
  };
}
