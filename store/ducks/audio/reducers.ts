/* eslint-disable no-unused-vars */
import {AudioActionType, AudioState, SET_AUDIO} from './types';

const initialState: AudioState = {
  audio: null,
};

const audioReducer = (state = initialState, action: AudioActionType) => {
  switch (action.type) {
    case SET_AUDIO: {
      return {
        ...state,
        audio: action.audio,
      };
    }

    default:
      return state;
  }
};

export default audioReducer;
