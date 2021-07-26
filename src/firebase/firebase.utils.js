import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBhVlsS1Rh2bRkRsD32RnaVi3vklrFKg20",
    authDomain: "crwn-db-5f44b.firebaseapp.com",
    projectId: "crwn-db-5f44b",
    storageBucket: "crwn-db-5f44b.appspot.com",
    messagingSenderId: "93686599638",
    appId: "1:93686599638:web:b17d1a7739e04ea6199e77"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up Google auth
// Step 1: get the provider method from auth library
const provider = new firebase.auth.GoogleAuthProvider();

// Step 2: takes custom params
// Triggers the select google account modal
provider.setCustomParameters({ prompt: 'select_account' });
// Step 3: export sign in popup and pass in provider variable
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Export the whole firebase library in case needed
export default firebase;