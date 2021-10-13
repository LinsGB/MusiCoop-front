/* eslint-disable no-unused-vars */
import {useReducer} from 'react';
import reactotron from 'reactotron-react-native';

type InitialState = {
  post: Array<Comment>;
  items: Array<any>;
};

type CommentItem = {
  id: number;
  comment: string;
};

type Comment = {
  items: Array<CommentItem>;
};

type Action = {
  comments?: any;
  itemIndex?: number;
  commentIndex?: number;
  items?: string;
  type?: string;
};

const initialState: InitialState = {
  post: [],
  items: [],
};

const postReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_POST': {
      reactotron.debug('asdasdadsadsadsadasdSDSDASDSADSA');
      return {
        ...state,
        post: action.comments,
      };
    }
    case 'SET_ITEMS': {
      const comments = state.post.map((comment: Comment) => {
        const items = comment.items.map((item: CommentItem) => {
          return Object.assign(item, {toggle: false});
        });
        return {...comment, items};
      });
      return {
        ...state,
        items: comments,
      };
    }
    case 'SET_TOGGLE': {
      const newComments = state.items.map(
        (comment: any, commentIndex: number) => {
          let isOpen = false;

          if (commentIndex === action.commentIndex) {
            isOpen = !comment.toggle;
          }
          return {...comment, toggle: isOpen};
        },
      );
      return {
        ...state,
        items: newComments,
      };
    }
  }
};

function useComments() {
  const [{post, items}, dispatch] = useReducer(postReducer, initialState);
  const setPost = (payload: any) => {
    dispatch({type: 'SET_POST', comments: payload});
  };
  const setItem = (payload: any) => {
    dispatch({type: 'SET_ITEMS', items: payload});
  };

  const setToggle = (commentIndex: number) => {
    dispatch({type: 'SET_TOGGLE', commentIndex});
  };

  return {
    post,
    items,
    setPost,
    setItem,
    setToggle,
  };
}

export default useComments;
