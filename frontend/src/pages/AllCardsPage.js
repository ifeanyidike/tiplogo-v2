import React, { useEffect } from 'react'
import Base from "../components/Services/Base"
import { useDispatch, useSelector } from "react-redux"
import { listCards } from '../redux/actions/cardActions'
import { DRAWER_CLOSE } from "../redux/constants/utilConstants"
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'
import { CARD_ORDER_CREATE_RESET, CARD_ORDER_UPDATE_RESET } from "../redux/constants/cardOrderConstants"
import { WALLET_DEBIT_RESET } from '../redux/constants/userConstants'


const AllCardsPage = () => {

    const cardList = useSelector(state => state.cardList)
    const { loading: cardsLoading, cards, error: cardsError } = cardList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: DRAWER_CLOSE })
        dispatch({ type: CARD_ORDER_CREATE_RESET })
        dispatch({ type: CARD_ORDER_UPDATE_RESET })
        dispatch({ type: WALLET_DEBIT_RESET })
    }, [dispatch])

    useEffect(() => {
        dispatch(listCards())
    }, [dispatch])

    useEffect(() => {
        scroll.scrollToTop()
    }, [])

    return (
        <div>
            <Meta />
            <Base
                loading={cardsLoading}
                cards={cards}
                error={cardsError}
                topText="Browse All Cards. A Click Away to Purchase."
            >

            </Base>
        </div>
    )
}

export default AllCardsPage
