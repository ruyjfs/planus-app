import {combineReducers} from 'redux';
import authChat from './authChat';

// interface rootReducer {
//   authChat: initialState;
// }

// export type RootState = ReturnType<typeof rootReducer>;

// export interface StateR {
//   authChat: {};
// }

export default combineReducers({
  authChat,
});
