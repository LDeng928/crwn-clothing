import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSage() {
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
