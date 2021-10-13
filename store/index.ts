import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {rootReducer} from './ducks';

import reactotron from '../config/Reactotron.config';

const middlewares: any = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares), reactotron.createEnhancer()),
);

export const persistor = persistStore(store);
