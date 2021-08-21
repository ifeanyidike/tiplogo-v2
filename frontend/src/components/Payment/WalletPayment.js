import React from 'react'
import { PayButton } from "../../styles/ServiceStyle"
import { useSelector, useDispatch } from "react-redux"
import { debitWallet } from "../../redux/actions/userActions"
import Loader from "../Loaders/SimpleLoader"

const WalletPayment = ({ orderitem, balance, order, setInsufficientAmount }) => {
    const dispatch = useDispatch()
    const amount = parseInt(orderitem.price)
    const qty = orderitem.qty
    const cardId = orderitem.card

    const walletDebit = useSelector(state => state.walletDebit)
    const { loading, error } = walletDebit

    const handleWalletPay = async () => {

        if (balance && balance > 0) {
            //Update order as paid
            //deliver order, 
            //send to user email, 
            //mark as delivered, 
            //push to saved card table
            dispatch(debitWallet({
                qty, cardId, orderId: order._id, amount
            })
            )

        } else {
            setInsufficientAmount(true)
        }
    }

    return (
        <>
            {
                loading ? <Loader />
                    : error ? error
                        :
                        <PayButton
                            onClick={handleWalletPay}>
                            Pay with Wallet
            </PayButton>
            }
        </>
    )
}

export default WalletPayment
