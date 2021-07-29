import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.style.scss'

import { connect } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ( { cartItems } ) => (    
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    // Map out cart items
                    cartItems.map(cartItem => <CartItem key={CartItem.id} item={cartItem}></CartItem>)
                }
            </div> 
            <div>             
                <CustomButton>GO TO CHECKOUT</CustomButton>
            </div>
        </div>
    )

// const mapStateToProps = ({ cart: { cartItems }}) => ({
//     cartItems
// })

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown);