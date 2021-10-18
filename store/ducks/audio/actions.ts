/* eslint-disable no-unused-vars */
import {AudioActionType, IAudio, SET_AUDIO} from './types';

export function setAudioAction(audio: IAudio): AudioActionType {
  return {
    type: SET_AUDIO,
    audio,
  };
}
