import React from 'react';
import './collection-item.style.scss';
import CustomButton from '../custom-button/custom-button.component';

// import redux library
import { connect } from 'react-redux';
import { addItems } from '../../redux/cart/cart.actions';


// functional component
// Destruct the addItems action!!!
const CollectionItem = ({ item, addItems }) => {
// Destruct the props from item
const {  name, price, imageUrl} = item;
return (
        <div className="collection-item">
            <div className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            >
            </div>

            <div className="collection-footer">
                <span className="name">{ name }</span>
                <span className="price">{ price }</span>
            </div>
            {<CustomButton inverted onClick={() => addItems(item)}>Add to cart</CustomButton>}
        </div>
    )
}

// create mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    addItems: item => dispatch(addItems(item)) // calls the addItems action, pass in the item, returns the item object.
})

export default connect(null, mapDispatchToProps)(CollectionItem);