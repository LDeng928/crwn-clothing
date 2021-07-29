import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.style.scss'
import CartItem from '../cart-item/cart-item.component';

const CartIcon = ({toggleCartHidden, itemCount}) => (
        <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className='item-count'>{ itemCount }</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
    });

// Display the accumulated quantity in cart icon
// This is a selector.
// Use reselect (memorization) to improve performance
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(CartIcon);