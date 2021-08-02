import { createSelector } from "reselect";
import { memoize } from "lodash";

// To match the string number id to the url string
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// convert an object into an array to make 'selectCollections' work
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)


// Find collection.id matching the url parameter of our collection id map
export const selectCollection = memoize((collectionUrlParam) => 
        createSelector(
            [selectCollections],
            // Data Normalization. Change SHOP_DATA to an object, with category as the key. 
            collections => collections[collectionUrlParam]
            // collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])            
        )
    );
