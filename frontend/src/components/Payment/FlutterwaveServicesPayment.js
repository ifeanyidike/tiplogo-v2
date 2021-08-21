import { closePaymentModal } from 'flutterwave-react-v3'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createChangeOfCourseOrder } from '../../redux/actions/changeOfCourseActions'
import { createJambPasswordResetOrder } from '../../redux/actions/jambPasswordResetActions'
import { createOlevelUploadOrder } from '../../redux/actions/oLevelResultUploadActions'
import Flutterwave from './Flutterwave'

const FlutterwaveCardPayment = ({
  transactionType,
  orderItems,
  jambAmountPay,
}) => {
  const dispatch = useDispatch()
  const { service } = useSelector((state) => state.serviceByName)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let price = parseInt(service?.cost)
  if (!jambAmountPay) {
    price = parseInt(service?.cost + 2500)
  }

  const onSuccess = (reference) => {
    const paymentResult = {
      id: reference.transaction_id,
      status: reference.status,
      update_time: String(new Date().getTime()),
      email: userInfo.email,
    }

    if (transactionType === 'changeofcourse') {
      dispatch(
        createChangeOfCourseOrder({
          orderItems,
          price,
          paymentMethod: 'Flutterwave',
          paymentResult,
        }),
      )
    } else if (transactionType === 'jambpasswordreset') {
      dispatch(
        createJambPasswordResetOrder({
          orderItems,
          price: parseInt(service.cost),
          paymentMethod: 'Flutterwave',
          paymentResult,
        }),
      )
    } else if (transactionType === 'olevelresultupload') {
      dispatch(
        createOlevelUploadOrder(
          orderItems,
          parseInt(service.cost),
          'Flutterwave',
          paymentResult,
        ),
      )
    }
    closePaymentModal()
  }

  return (
    <Flutterwave
      amount={price}
      service={orderItems.name}
      onSuccess={onSuccess}
    />
  )
}

export default FlutterwaveCardPayment
