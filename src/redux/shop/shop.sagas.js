// Handle async function for shop actions => fetchCollectionsStartAsync

import { takeEvery, call, put } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

// Firebase
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

//  Shop actions
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

// Async Await style saga actions - using generator functions from JS
export function* fetchCollectionsAsync() {
  yield console.log('I am fired');
  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
