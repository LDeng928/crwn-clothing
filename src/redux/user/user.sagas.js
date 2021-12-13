import { takeLatest, put, all, call } from 'redux-saga/effects';

// Firebase auth and googleProvider
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

// User Action types
import UserActionTypes from './user.types';

// User actions
import { googleSignInSuccess, googleSignInFailure } from './user.actions';

// Function that actually triggers the google sign in
export function* signInWithGoogle() {
  try {
    // 1. Get back the userRef using the auth method signInWithPopup
    const { user } = yield auth.signInWithPopup(googleProvider);

    // 2. Use createUserProfileDocument method and passing the user object
    const userRef = yield call(createUserProfileDocument, user);

    // 3. Create the snapshot using get() method
    const userSnapshot = yield userRef.get();

    // 4. Use put to put back the returned data to Redux flow
    yield put(
      googleSignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

// Google sign in
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Tally all sagas related to user and use all and call, then send it to rootSage
export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
