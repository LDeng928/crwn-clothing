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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    // Check if the item already exists in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // Only checks if the existingCartItem equals to one
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity-1}
        : cartItem
        )


    // My try on the code...
    // if(existingCartItem && cartItems.quantity > 1) {
    //     return cartItems.map(cartItem =>
    //         cartItem.id === cartItemToRemove.id 
    //         ? {...cartItem, quantity: cartItem.quantity - 1}
    //         : cartItem
    //         )
    // } else if(existingCartItem && cartItems.quantity === 1) {
    //     return (
    //         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    //     )
    // }
}