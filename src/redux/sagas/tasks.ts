import {call, put, takeEvery, select, fork, take} from 'redux-saga/effects';

import Service from '../../services/firebase/Tasks';
// import ServiceComments from '~/services/firebase/Comments';
import TypesReducers from '../reducers/types';

import Types from './types';

// function* loadComments({payload}) {
//   // const parentIds = yield select(state => state.publications.allId);
//   const byId = yield call(ServiceComments.getAll, {parentId: payload.parentId});
//   // console.log(payload.parentId, byId, '---');
//   yield put({
//     type: TypesReducers.PUBLICATIONS.COMMENTS_ADD,
//     payload: {byId, parentId: payload.parentId},
//   });
//   // yield put({type: Types.PUBLICATIONS.COMMENTS_LOAD_SUCCESS});
// }

// function* loadViews({payload}) {
//   const byId = yield call(Service.loadViews, payload.parentId);
//   // console.log(payload.parentId, byId, '---');
//   yield put({
//     type: TypesReducers.PUBLICATIONS.VIEWS_ADD,
//     payload: {byId, parentId: payload.parentId},
//   });
// }

async function promiseApi() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({1: {id: 1, text: 'test 100'}});
    }, 2000);
  });
}

function* refresh() {
  yield put({
    type: TypesReducers.TASKS.REFRESH,
    // payload: byId,
  });
}

function* load({payload}: any) {
  try {
    yield put({type: Types.LOAD.REQUEST});
    // yield put({
    //   type: TypesReducers.TASKS.ADD,
    //   // payload: byId,
    //   payload: { 2: { id: 2, text: 'test 2' } },
    // });
    const byId = yield call(
      Service.getAll,
      {userId: payload.userId},
      payload.page,
    );
    // const byId = yield call(promiseApi);
    yield put({
      type: TypesReducers.TASKS.ADD,
      // payload: byId,
      payload: byId,
    });
    yield put({type: Types.TASKS.LOAD_SUCCES});
    yield put({type: Types.LOAD.SUCCES});
    console.log('SAGA END');
  } catch (e) {
    console.log('FALHA REDUX SAGA ->>', e.message);
    yield put({type: Types.LOAD.FAILURE, message: e.message});
  }
}
interface DynamicIndice {
  [state: string]: any;
}

function* save({payload, id = null}: any) {
  try {
    yield put({type: Types.LOAD.REQUEST});
    const result = yield call(Service.save, payload, id);
    let byId: DynamicIndice = {};

    byId[result.data.id] = result.data;
    yield put({
      type: TypesReducers.TASKS.ADD,
      payload: byId,
    });
    yield put({type: Types.TASKS.SAVE_SUCCES});
    yield put({type: Types.LOAD.SUCCES});
  } catch (e) {
    console.log('FALHOU -----', e.message);
    yield put({type: Types.LOAD.FAILURE, message: e.message});
  }
}

function* del({id}: any) {
  try {
    // console.log(id);
    yield put({type: Types.LOAD.REQUEST});
    yield put({
      type: TypesReducers.TASKS.DEL,
      id,
    });
    yield call(Service.delete, id);
    yield put({type: Types.LOAD.SUCCES});
  } catch (e) {
    console.log('FALHOU -----', e.message);
    yield put({type: Types.LOAD.FAILURE, message: e.message});
  }
}

function* tasks() {
  yield takeEvery(Types.TASKS.LOAD, load);
  yield takeEvery(Types.TASKS.REFRESH, refresh);
  yield takeEvery(Types.TASKS.SAVE, save);
  yield takeEvery(Types.TASKS.DEL, del);
  // yield takeEvery(Types.PUBLICATIONS.COMMENTS_LOAD, loadComments);
  // yield takeEvery(Types.PUBLICATIONS.VIEWS_LOAD, loadViews);
  // yield takeEvery(Types.PUBLICATIONS.LOAD_SUCCES, loadComments);
  // yield takeEvery(Types.PUBLICATIONS.LOAD_SUCCES, loadViews);
  // yield fork(loadComments);
  // yield fork(loadViews);
  // yield[
  //   fork('LOAD_DASHBOARD', loadDashboardSequenced),
  //   fork('LOAD_DASHBOARD2' loadDashboardNonSequenced)
  // ];
  // yield fork(Types.PUBLICATIONS.LOAD)
}

export default tasks;
