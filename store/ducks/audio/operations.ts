import audioApi from '../../../api/audio';
import * as audioActions from './actions';

export const getAudio = () => async (dispatch: any) => {
  try {
    const audio = await audioApi.getAudio();

    dispatch(audioActions.setAudioAction(audio));

    return audio;
  } catch (error: any) {}
};
