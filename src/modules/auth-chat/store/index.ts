import {createStore} from 'redux';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import Reactotron from '~/config/ReactotronConfig';

import rootReducer from './reducers';

const encryptor = createEncryptor({
  secretKey: 'Religare-AuthChat-',
  onError: function(error) {
    // Handle the error.
    console.log('error redux encrypt', error);
  },
});

// console.log('KK', AsyncStorage);
// AsyncStorage.clear();
const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [encryptor],
  whitelist: [],
  blacklist: ['authChat'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

interface Store {
  authChat: any;
}

let store: Store = createStore(persistedReducer, Reactotron.createEnhancer());
let persistor = persistStore(store);

export {store, persistor};
