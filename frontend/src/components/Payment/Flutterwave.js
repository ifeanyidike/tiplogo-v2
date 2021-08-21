import React, { useEffect, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { WalletButton } from '../../styles/ProfileStyle';
import { PayButton } from '../../styles/ServiceStyle';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

export default function App({ amount, service, simple, onSuccess }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [key, setKey] = useState("")
    useEffect(() => {
        const getKey = async () => {
            const { data: clientKey } = await axios.get('/api/config/flutterwave')
            setKey(clientKey)
        }
        getKey()
    }, [key])

    const config = {
        public_key: key,
        tx_ref: Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userInfo.email,
            phonenumber: userInfo.profile && userInfo.profile.phoneNumber,
            name: userInfo.name,
        },
        customizations: {
            title: 'Payment to Pin Cafes',
            description: `Payment for Pin Cafes ${service} services`,
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };



    const handleFlutterPayment = useFlutterwave(config);

    return (
        <div className="App">
            {
                simple ?
                    <WalletButton
                        mr={10}
                        onClick={() => {
                            handleFlutterPayment({
                                callback: onSuccess,
                                onClose: () => { },
                            });
                        }}
                    >
                        Flutterwave
                    </WalletButton>
                    :
                    <PayButton
                        onClick={() => {
                            handleFlutterPayment({
                                callback: onSuccess,
                                onClose: () => { },
                            });
                        }}
                        customsize={40}
                    >
                        <i

                            className="fab fa-amazon-pay"></i>
                    </PayButton>
            }

        </div>
    );
}

// callback: (response) => {
//     console.log(response);
//     closePaymentModal() // this will close the modal programmatically
// },