import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBhVlsS1Rh2bRkRsD32RnaVi3vklrFKg20',
  authDomain: 'crwn-db-5f44b.firebaseapp.com',
  projectId: 'crwn-db-5f44b',
  storageBucket: 'crwn-db-5f44b.appspot.com',
  messagingSenderId: '93686599638',
  appId: '1:93686599638:web:b17d1a7739e04ea6199e77',
};

// Make an API request to get the 'uid' Google made.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // check if there is an userAuth object
  if (!userAuth) return;

  // Snapshot reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // If there is no such user exists in the database. Create a new one
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // create method
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // Return userRef in case it is needed
  return userRef;
};

firebase.initializeApp(config);

// Move shop data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // Batch the calls to firestore to make the code predicable
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // collectionRef comes back with a new doc id

    // send the shop data to firestore using batch
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); // comes back with a promise
};

// Convert the collection data from firestore
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    // Return a new object with the routing
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // Use the JS reduce method to return the final object data
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up Google auth
// Step 1: get the provider method from auth library
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Step 2: takes custom params
// Triggers the select google account modal
googleProvider.setCustomParameters({ prompt: 'select_account' });
// Step 3: export sign in popup and pass in provider variable
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Export the whole firebase library in case needed
export default firebase;
