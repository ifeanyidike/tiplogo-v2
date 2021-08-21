import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { cardPayOrder } from "../../redux/actions/cardOrderActions"
import PayStack from "./PayStack"

const PayStackCardPayment = ({ orderId, orderitem, amount }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const qty = orderitem.qty
    const cardId = orderitem.card

    const onSuccess = (reference) => {
        const paymentResult = {
            id: reference.trxref,
            status: reference.status,
            update_time: String((new Date()).getTime()),
            email: userInfo.email
        }

        //deliver order, 
        //send to user email, 
        //mark as delivered, 
        //push to saved card table
        dispatch(cardPayOrder(qty, cardId, orderId, paymentResult))
    }

    return (
        <PayStack
            amount={amount}
            onSuccess={onSuccess}
        />
    )
}

export default PayStackCardPayment
