export const addItemToCart = (cartItems, cartItemToAdd) => {
    // Find existing cart item. Returns true/false
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem) {
        // If true, return a new array
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
            ) 
    }

    // If false, return a new array with all existing cartItems, but also attach a quantity value.
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}