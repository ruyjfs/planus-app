import {combineReducers} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
// import notices from "./notices";
// import notifications from "./notifications";
// import user from "./user";
// import firebase from "./firebase";
import auth from './auth';
import authChat from './authChat';
import tasks from './tasks';

const rootReducer = combineReducers({
  auth,
  authChat,
  tasks,
});

export {useDispatch, useSelector};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
