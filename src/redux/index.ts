import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import createSagaMiddleware from 'redux-saga';
import Reactotron, {sagaMonitor} from '~/config/ReactotronConfig';

import rootReducer from './reducers';
import rootSaga from './sagas';

const encryptor = createEncryptor({
  secretKey: 'Planus-',
  onError: function (error) {
    // Handle the error.
    console.log('error redux encrypt', error);
  },
});

// AsyncStorage.clear();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
  whitelist: [
    'auth',
    // 'travel',
    // 'travelDriver',
  ],
  blacklist: [
    'tasks',
    'authChat',
    // 'layout',
    // 'notifications',
    'users',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Setup Redux-Saga
const middleWare = [];
const sagaMiddleware = createSagaMiddleware({sagaMonitor});
middleWare.push(sagaMiddleware);

// Reactotron.createEnhancer()
// const store = createStore(persistedReducer, Reactotron.createEnhancer());
// let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middleWare)),
);
sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

export {store, persistor};
