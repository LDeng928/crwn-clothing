import { createSelector } from "reselect";

// First type: input selector
const selectCart = state => state.cart;

// Second type: output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);


// Output selector: Export the hidden 
export const selectCartHidden = createSelector(
    [selectCart], 
    (cart) => cart.hidden
)

// Output selector. It only targets the quantity
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)

// Output selector: Export price total
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedPrice, cartItem) =>
    accumulatedPrice + (cartItem.price * cartItem.quantity), 0)
)
