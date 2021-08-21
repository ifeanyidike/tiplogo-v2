import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import BaseFile from "../components/Services/Base"
import Loader from "../components/Loaders/SimpleLoader"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCardOrderDetails } from "../redux/actions/cardOrderActions"
import { listFewCards } from '../redux/actions/cardActions'
import queryString from "query-string"
import EditCards from '../components/Services/EditCards'
import NotLoggedIn from "../components/Utils/NotLoggedIn"
import { logout } from "../redux/actions/userActions"
import Meta from "../components/Meta"
import { WALLET_DEBIT_RESET } from '../redux/constants/userConstants'
import { animateScroll as scroll } from 'react-scroll'

const CardPage = () => {

    const location = useLocation()
    const { id } = queryString.parse(location.search)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        scroll.scrollTo(300)

    }, [])

    useEffect(() => {
        dispatch({ type: WALLET_DEBIT_RESET })
    }, [dispatch])

    useEffect(() => {
        if (userInfo) {
            const { exp } = jwt_decode(userInfo.token)
            const expirationTime = (exp * 1000) - 6000
            if (Date.now() >= expirationTime) {
                dispatch(logout())
            }
        }

        dispatch(getCardOrderDetails(id))
        dispatch(listFewCards(4))
    }, [dispatch, userInfo, id])


    const cardListFew = useSelector(state => state.cardListFew)
    const { loading: cardsLoading, cards, error: cardsError } = cardListFew

    const cardOrderDetails = useSelector(state => state.cardOrderDetails)
    const { loading: orderLoading, order, error: orderError } = cardOrderDetails

    return (
        <div>
            <Meta />
            {

                !userInfo ?
                    <NotLoggedIn />
                    :
                    <>
                        {

                            <BaseFile
                                loading={cardsLoading}
                                cards={cards}
                                error={cardsError}
                                TopImage={
                                    order && order.orderItems &&
                                    <img src={order.orderItems.image} alt={order.orderItems.name} />
                                }
                                topText={order && order.orderItems.name}
                            >
                                {/* <pre>order{JSON.stringify(order, null, 2)}</pre>     */}
                                {
                                    orderLoading ? <Loader /> :
                                        orderError ? orderError :
                                            <EditCards
                                                id={order._id}
                                                cardObj={order && order.orderItems}
                                                paymentMethod={order.paymentMethod}
                                            />
                                }
                            </BaseFile>
                        }
                    </>
            }

        </div>
    )
}

export default CardPage
