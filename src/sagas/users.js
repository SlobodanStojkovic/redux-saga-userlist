import { takeEvery, takeLatest, call, fork, put } from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

//generator functions must always yield values

function* getUsers() {
  //this is worker saga
  try {
    const result = yield call(api.getUsers);
    //code under result will be called after the call has been resolved
    yield put(actions.getUsersSuccess({ items: result.data.data }));
    console.log(result.data.data);
  } catch (error) {
    console.log(error);
  }
}

function* watchGetUsersRequest() {
  //this is watcher saga, which watches when one particular redux action has been dispatched, and then acts upon the action by calling the worker saga
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
  try {
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    });
    yield call(getUsers);
  } catch (error) {
    console.log(error);
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const usersSagas = [fork(watchGetUsersRequest), fork(watchCreateUserRequest)];

export default usersSagas;
