import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

// Take in price as property
// price needs to be in cents
const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JTXunGXbjy9pAjD5W2aZg0q8jLKEQCNVh9zYWiLnpjnjNOZ41Vo1msK2jJImDwuILWrjHWNjMqVjyHDw0dAIW7V00ph99m66V'

    const onToken = token => {
        console.log(token);
        alert('Payment successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
            allowRememberMe
        />    
    )
}

export default StripeCheckoutButton