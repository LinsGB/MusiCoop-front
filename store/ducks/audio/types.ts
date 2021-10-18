export const SET_AUDIO = 'AUDIO/SET_AUDIO';

export interface IAudio {
  audio: [];
}

export interface AudioState {
  audio: IAudio;
}

interface setAudioAction {
  type: typeof SET_AUDIO;
  audio: IAudio;
}

export type AudioActionType = setAudioAction;
