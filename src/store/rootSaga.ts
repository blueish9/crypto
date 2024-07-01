import { all, fork } from 'redux-saga/effects';

import { cryptoWatcher } from '../modules/crypto/action/cryptoSaga';

export default function* rootSaga() {
  yield all([fork(cryptoWatcher)]);
}
