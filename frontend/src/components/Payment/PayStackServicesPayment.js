import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createChangeOfCourseOrder } from '../../redux/actions/changeOfCourseActions'
import { createJambPasswordResetOrder } from '../../redux/actions/jambPasswordResetActions'
import { createOlevelUploadOrder } from '../../redux/actions/oLevelResultUploadActions'
import PayStack from './PayStack'

const PayStackServicePayment = ({
  transactionType,
  orderItems,
  jambAmountPay,
  type,
}) => {
  const dispatch = useDispatch()
  const { service } = useSelector((state) => state.serviceByName)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let price = parseInt(service?.cost)
  if (type === 'changeofcourse') {
    if (!jambAmountPay) {
      price += 2500
    }
  }

  const onSuccess = (reference) => {
    const paymentResult = {
      id: reference.trxref,
      status: reference.status,
      update_time: String(new Date().getTime()),
      email: userInfo.email,
    }

    if (transactionType === 'changeofcourse') {
      dispatch(
        createChangeOfCourseOrder({
          orderItems,
          price,
          paymentMethod: 'PayStack',
          paymentResult,
        }),
      )
    } else if (transactionType === 'jambpasswordreset') {
      dispatch(
        createJambPasswordResetOrder({
          orderItems,
          price: parseInt(service.cost),
          paymentMethod: 'PayStack',
          paymentResult,
        }),
      )
    } else if (transactionType === 'olevelresultupload') {
      dispatch(
        createOlevelUploadOrder(
          orderItems,
          parseInt(service.cost),
          'PayStack',
          paymentResult,
        ),
      )
    }
  }

  return <PayStack amount={price} onSuccess={onSuccess} />
}

export default PayStackServicePayment
