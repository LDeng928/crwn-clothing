import ShopActionTypes from "./shop.types";

import {firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            // Calls the Firestore utility function to convert the documentSnapshot into useful data
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // Then use Redux to pass the data
            dispatch(fetchCollectionsSuccess(collectionsMap));
          }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};