import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux'
import AsyncStorage from '@react-native-community/async-storage';
import sagaPlugin from 'reactotron-redux-saga';
import apiSaucePlugin from 'reactotron-apisauce';

// if (__DEV__) {
const reactotron = Reactotron.configure()
  .use(reactotronRedux({
    isActionImportant: action => action.type === 'repo.receive'
  }))
  .use(apiSaucePlugin())
  .use(sagaPlugin())
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .connect();

reactotron.clear();
console.tron = reactotron;

const sagaMonitor = Reactotron.createSagaMonitor();
export { sagaMonitor };
export default reactotron
// }
