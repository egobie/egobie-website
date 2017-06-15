import userSaga from './UserSaga';
import reservationSaga from './ReservationSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
    reservationSaga(),
  ];
}