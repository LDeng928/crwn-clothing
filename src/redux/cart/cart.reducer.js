import CartActionsTypes from './cart.types'
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [] // Initial state is an empty array
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionsTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionsTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
                //[...state.cartItems, action.payload] Spread in the existing cartItems and add whatever items come in as payload.
            }
        default:
            return state;
    }
};

export default cartReducer;