import { createSelector } from "reselect";

// Get the state selector
const selectUser = state => state.user;

//const selectCart = state => state.cart;

// Get the slice of state
export const selectCurrentUser = createSelector(
    // An array
    [selectUser],
    // The return value of above array, which is 'user'
    (user) => user.currentUser
)