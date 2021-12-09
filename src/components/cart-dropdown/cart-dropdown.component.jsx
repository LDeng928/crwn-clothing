import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.style.scss';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { createStructuredSelector } from 'reselect';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

// 'dispatch' is available with connect
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        // Use condition to check if the cartItems array is empty, if it is, render a span message, otherwise, map out cart items.
        cartItems.length ? (
          // Map out cart items
          cartItems.map((cartItem) => <CartItem key={CartItem.id} item={cartItem}></CartItem>)
        ) : (
          <span className='empty-message'>Your cart is empty.</span>
        )
      }
    </div>
    <div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          // Brings in the dispatch to toggle the cart.
          // When user is in the checkout page. The cartDropDown will disappear.
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  </div>
);

// const mapStateToProps = ({ cart: { cartItems }}) => ({
//     cartItems
// })

// const mapStateToProps = state => ({
//     cartItems: selectCartItems(state)
// })

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// To get the 'history' prop, wrap connect inside withRouter()
export default withRouter(connect(mapStateToProps)(CartDropdown));
