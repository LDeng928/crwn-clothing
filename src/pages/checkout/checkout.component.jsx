import React from 'react'
import './checkout.style.scss'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({cartItems, total}) => (  
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>            
            </div>
            <div className="header-block">
                <span>Description</span>            
            </div>
            <div className="header-block">
                <span>Quantity</span>            
            </div>
            <div className="header-block">
                <span>Price</span>            
            </div>
            <div className="header-block">
                <span>Remove</span>            
            </div>
        </div>
        {
            // Map out cart items
            cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
            ))
        }
        <div className="total">
            <span>{total}</span>
        </div>
        <div className="test-warning">*Please use the following test credit card for payment* 
        <br />
            4242 4242 4242 4242 with any number of expiration date and 3-digit security code
        </div>
        <StripeCheckoutButton price={total}/>
    </div>  
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);