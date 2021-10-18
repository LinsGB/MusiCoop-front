import {combineReducers} from 'redux';
import audioReducer from './audio/reducers';

export const rootReducer = combineReducers({
  audio: audioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
