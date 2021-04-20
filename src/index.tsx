import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterilaComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {store, persistor} from './redux';
import Routes from './routes';

const App = () => {
  MaterilaComunityIcon.loadFont();
  MaterialIcon.loadFont();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
