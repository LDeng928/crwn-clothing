import { takeLatest, put, all, call } from 'redux-saga/effects';

// Firebase auth and googleProvider
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

// User Action types
import UserActionTypes from './user.types';

// User actions
import { signInFailure, signInSuccess } from './user.actions';

// Utility function to get userRef
export function* getSnapshotFromUserAuth(userAuth) {
  try {
    // 2. Use createUserProfileDocument method and passing the user object
    const userRef = yield call(createUserProfileDocument, userAuth);

    // 3. Create the snapshot using get() method
    const userSnapshot = yield userRef.get();

    // 4. Use put to put back the returned data to Redux flow
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// Function that actually triggers the google sign in
export function* signInWithGoogle() {
  try {
    // 1. Get back the userRef using the auth method signInWithPopup
    const { user } = yield auth.signInWithPopup(googleProvider);

    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// Email sign in
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    // 1. Retrieve the email and password from firebase
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// Google sign in
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Email and password sign in
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Tally all sagas related to user and use all and call, then send it to rootSage
export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
