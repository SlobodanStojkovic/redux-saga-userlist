import { takeEvery, call, fork, put } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

//generator functions must always yield values

function* getUsers() {
  //this is worker saga
  try {
    const result = yield call(api.getUsers);
    //code under result will be called after the call has been resolved
    yield put(actions.getUsersSuccess({ items: result.data.data }));
    console.log(result);
  } catch (error) {}
}

function* watchGetUsersRequest() {
  //this is watcher saga, which watches when one particular redux action has been dispatched, and then acts upon the action by calling the worker saga
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const usersSagas = [fork(watchGetUsersRequest)];

export default usersSagas;
