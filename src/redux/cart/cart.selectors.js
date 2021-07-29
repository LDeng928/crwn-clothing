import { createSelector } from "reselect";

// First type: input selector
const selectCart = state => state.cart;

// Second type: output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

// Output selector
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)