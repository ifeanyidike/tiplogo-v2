import React from 'react'
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const ServiceHowTo = () => {
    return (
        <div className='howto'>
            <h2>How It Works</h2>
            <ul>
                <li>
                    <CheckBoxIcon /> Choose the number of cards you want to buy and select your
                    payment method (Paystack, Flutterwave or Wallet).
                </li>
                <li>
                    <CheckBoxIcon /> Want to pay by wallet? Fund your wallet with a click.
                    You can pay in money from your bank account.
                    Your information is safe.
                </li>
                <li>
                    <CheckBoxIcon /> Click on "Place Order" to place an order.
                </li>
                <li>
                    <CheckBoxIcon /> Confirm your order and pay. Your purchased card will be sent to your email and also available in your profile.
                </li>

            </ul>
        </div>
    )
}

export default ServiceHowTo
