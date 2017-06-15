import { put, cancelled, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as UserAction from '../Action/UserAction';
import * as ReservationAction from '../Action/ReservationAction';

import { signIn } from '../Request/UserRequest';


function* signInTask(action) {
  try {
    const resp = yield signIn(action.email, action.password);

    if (resp.status === 200 && resp.body.type === 'EGOBIE') {
      yield put({
        type: UserAction.USER_SIGN_IN_SUCCESS,
        user: resp.body,
      });
      yield put({
        type: ReservationAction.RESERVATION_GET_LOCATIONS,
      })
      yield put(push('/reservations'))
    } else {
      yield put({
        type: UserAction.USER_SIGN_IN_FAIL,
      });
    }
  } catch (error) {
    yield put({
      type: UserAction.USER_SIGN_IN_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: UserAction.USER_SIGN_IN_FAIL,
      });
    }
  }
}

export default function* userSaga() {
  yield takeLatest(UserAction.USER_SIGN_IN, signInTask);
};
