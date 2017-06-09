import userSaga from './UserSaga';


export default function* eGobieSaga() {
  yield [
    userSaga(),
  ];
}