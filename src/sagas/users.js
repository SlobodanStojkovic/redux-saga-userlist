import {
  takeEvery,
  takeLatest,
  take,
  call,
  fork,
  put,
} from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

//generator functions* must always yield values

function* getUsers() {
  //this is worker saga
  try {
    const result = yield call(api.getUsers);
    //code under result will be called after the call has been resolved
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (error) {
    yield put(
      actions.usersError({
        error:
          "An error occurred when trying to get the users. The error is: " +
          error,
      })
    );
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
    yield put(
      actions.usersError({
        error:
          "An error occurred when trying to create the user. The error is: " +
          error,
      })
    );
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser.userId);
    yield call(getUsers);
  } catch (error) {
    yield put(
      actions.usersError({
        error:
          "An error occurred when trying to delete the user. The error is: " +
          error,
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, {
      userId: action.payload.userId,
    });
  }
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

export default usersSagas;
