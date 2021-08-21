import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux"
import LaunchIcon from '@material-ui/icons/Launch';
import CustomTable from "../components/Tables/CustomTable"
import { useLocation, Link } from "react-router-dom"
import BaseFile from "../components/Services/Base"
import queryString from "query-string"
import PayStack from "../components/Payment/PayStackCardPayment"
import Flutterwave from "../components/Payment/FlutterwaveCardPayment"
import { getCardOrderDetails } from "../redux/actions/cardOrderActions"
import { listFewCards } from "../redux/actions/cardActions"
import Loader from "../components/Loaders/SimpleLoader"
import { logout } from "../redux/actions/userActions"
import Wallet from "../components/Utils/Wallet"
import MessageModal from "../components/Utils/MessageModal"
import WalletPayment from "../components/Payment/WalletPayment"
import { CARD_ORDER_CREATE_RESET, CARD_ORDER_PAY_RESET, CARD_ORDER_UPDATE_RESET } from '../redux/constants/cardOrderConstants';
import Message from "../components/Message"
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'

const PayOrder = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [insufficientAmount, setInsufficientAmount] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cardListFew = useSelector(state => state.cardListFew)
    const { loading: cardsLoading, cards, error: cardsError } = cardListFew

    const cardOrderDetails = useSelector(state => state.cardOrderDetails)
    const { error: orderError, order, loading: orderLoading } = cardOrderDetails

    const cardOrderPay = useSelector(state => state.cardOrderPay)
    const { error: payError, loading: payLoading, success: paySuccess } = cardOrderPay

    const walletDebit = useSelector(state => state.cardOrderPay)
    const { error: walletError, loading: walletLoading } = walletDebit

    const { wallet } = useSelector(state => state.userWalletAmount)

    useEffect(() => {
        dispatch({ type: CARD_ORDER_CREATE_RESET })
        dispatch({ type: CARD_ORDER_UPDATE_RESET })
    }, [dispatch])

    useEffect(() => {
        scroll.scrollTo(300)
    }, [])

    let orderitem;
    let balance;
    if (order) {
        const { orderItems } = order
        orderitem = orderItems

        balance = wallet &&
            parseInt(wallet - orderitem.price)
    }
    useEffect(() => {
        if (userInfo) {
            const { exp } = jwt_decode(userInfo.token)
            const expirationTime = (exp * 1000) - 6000
            if (Date.now() >= expirationTime) {
                dispatch(logout())
            }
        }

        const { orderId } = queryString.parse(location.search)
        dispatch(getCardOrderDetails(orderId))
        dispatch(listFewCards(4))
        dispatch({ type: CARD_ORDER_PAY_RESET })
    }, [dispatch, location, userInfo])


    console.log(order, orderitem)
    return (

        <BaseFile
            loading={cardsLoading}
            cards={cards}
            error={cardsError}
            TopImage={<img src={orderitem && orderitem.image} alt={orderitem && orderitem.name} />}
            topText={orderitem && orderitem.name}
        >
            <Meta />
            {walletError &&
                <Message variant="error">
                    {walletError}
                </Message>
            }
            <div
                className="buyinfo--third"
            >
                {walletLoading && <Loader />}

                {
                    orderLoading ?
                        <Loader /> :
                        orderError ?
                            <Message variant="error">
                                {orderError}
                            </Message>
                            :
                            (
                                <div className="table">
                                    <Wallet mt={20} />
                                    {
                                        payLoading ? <Loader /> :
                                            payError ?
                                                <Message variant="error">
                                                    {payError}
                                                </Message>
                                                :
                                                paySuccess ?
                                                    <>
                                                        <div className="success">
                                                            <Message variant="info">
                                                                Success!
                                                                <Link to="/profile#full-width-tab-2"> View Purchase Info</Link>
                                                            </Message>
                                                        </div>

                                                    </>
                                                    :
                                                    (
                                                        <>
                                                            <CustomTable
                                                                cost={orderitem && orderitem.price}
                                                                qty={orderitem && orderitem.qty}
                                                                name={orderitem && orderitem.name}
                                                                orderId={order && order._id}
                                                                paymentMethod={order && order.paymentMethod}
                                                            />

                                                            {
                                                                order && !order.isPaid && (

                                                                    <div className="table__action">
                                                                        <Link
                                                                            to={`/edititem/cardorder?id=${order._id}`}>
                                                                            Edit card <LaunchIcon />
                                                                        </Link>
                                                                        {
                                                                            order.paymentMethod === 'PayStack' ?
                                                                                <PayStack
                                                                                    orderId={order._id}
                                                                                    orderitem={orderitem}
                                                                                    amount={parseInt(orderitem.price)}
                                                                                />
                                                                                :
                                                                                order.paymentMethod === 'Flutterwave' ?
                                                                                    <Flutterwave
                                                                                        orderId={order._id}
                                                                                        orderitem={orderitem}
                                                                                        amount={parseInt(orderitem.price)}
                                                                                    />
                                                                                    :
                                                                                    order.paymentMethod === 'Wallet' ?
                                                                                        orderitem &&
                                                                                        <WalletPayment
                                                                                            orderitem={orderitem}
                                                                                            balance={balance}
                                                                                            order={order}
                                                                                            setInsufficientAmount={setInsufficientAmount}
                                                                                        />
                                                                                        :
                                                                                        null
                                                                        }


                                                                    </div>
                                                                )}
                                                        </>
                                                    )
                                    }


                                </div>
                            )

                }
            </div>
            <MessageModal
                open={insufficientAmount}
                setOpen={setInsufficientAmount}
                caption="Insufficient Fund"
                message=
                {<div>
                    Please add money to your wallet or <br />choose another payment method
                    </div>}
            />
        </BaseFile>

    )
}
export default PayOrder
