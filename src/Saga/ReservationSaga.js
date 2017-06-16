import { put, takeLatest, cancelled } from 'redux-saga/effects';

import * as ReservationAction from '../Action/ReservationAction';
import { getLocations, getAllTasks } from '../Request/ReservationRequest';


function* getLocationsTask() {
  try {
    const resp = yield getLocations();

    if (resp.status === 200) {
      yield put({
        type: ReservationAction.RESERVATION_GET_LOCATIONS_SUCCESS,
        locations: resp.body,
      });
    } else {
      yield put({
        type: ReservationAction.RESERVATION_GET_LOCATIONS_FAIL,
      });
    }
  } catch (error) {
    yield put({
      type: ReservationAction.RESERVATION_GET_LOCATIONS_ERROR,
      error
    })
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ReservationAction.RESERVATION_GET_LOCATIONS_FAIL,
      })
    }
  }
}

function* getAllTasksTask(action) {
  try {
    const resp = yield getAllTasks(action.placeIds, action.day);

    if (resp.status === 200) {
      yield put({
        type: ReservationAction.RESERVATION_GET_ALL_SUCCESS,
        reservations: resp.body ? resp.body : [],
      });
    } else {
      yield put({
        type: ReservationAction.RESERVATION_GET_ALL_FAIL,
      });
    }
  } catch (error) {
    yield put({
      type: ReservationAction.RESERVATION_GET_ALL_ERROR,
      error,
    });
  } finally {
    if (yield cancelled()) {
      yield put({
        type: ReservationAction.RESERVATION_GET_ALL_FAIL,
      })
    }
  }
}

export default function* reservationSaga() {
  yield takeLatest(ReservationAction.RESERVATION_GET_LOCATIONS, getLocationsTask);
  yield takeLatest(ReservationAction.RESERVATION_GET_ALL, getAllTasksTask)
}
