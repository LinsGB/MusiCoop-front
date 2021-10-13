export const SET_POST = 'POST/SET_POST';

export interface IPost {
  id: string;
  comentario: string;
}

export interface PostState {
  post: IPost;
}

interface SetPostAction {
  type: typeof SET_POST;
  post: IPost;
}

export type PostActionType = SetPostAction;
