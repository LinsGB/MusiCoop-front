import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from '../store/ducks';
import * as audioActions from '../store/ducks/audio/actions';
import * as operations from '../store/ducks/audio/operations';

function useAudio() {
  const {audio} = useSelector((state: RootState) => state.audio);

  const {getAudio} = bindActionCreators(
    {
      ...audioActions,
      ...operations,
    },
    useDispatch(),
  );

  return {
    audio,
    getAudio,
  };
}

export default useAudio;
