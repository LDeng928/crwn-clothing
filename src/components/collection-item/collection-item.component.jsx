import React from 'react';
import './collection-item.style.scss';

// import redux library
import { connect } from 'react-redux';
import { addItems } from '../../redux/cart/cart.actions';

// Import styled components
import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    NameContainer,
    BackgroundImage,
    PriceContainer
} from './collection-item.styles'


// functional component
// Destruct the addItems action!!!
const CollectionItem = ({ item, addItems }) => {
// Destruct the props from item
const {  name, price, imageUrl } = item;
return (
    <CollectionItemContainer>
        <BackgroundImage className='image' imageUrl={imageUrl} />
        <CollectionFooterContainer>
            <NameContainer>{name}</NameContainer>
            <PriceContainer>{price}</PriceContainer>
        </CollectionFooterContainer>
        <AddButton onClick={ () => addItems(item)} inverted>Add to cart</AddButton>
    </CollectionItemContainer>
    )
}

// create mapDispatchToProps
const mapDispatchToProps = dispatch => ({
    addItems: item => dispatch(addItems(item)) // calls the addItems action, pass in the item, returns the item object.
})

export default connect(null, mapDispatchToProps)(CollectionItem);