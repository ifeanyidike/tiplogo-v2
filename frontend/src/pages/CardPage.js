import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import BaseFile from "../components/Services/Base"
import BaseChildren from "../components/Services/BaseChildren"
import Loader from "../components/Loaders/SimpleLoader"
import { useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/userActions"
import { DRAWER_CLOSE } from "../redux/constants/utilConstants"
import { Modal } from "../styles/ModalStyle"
import { Link } from "react-router-dom"
import {
    listCardDetails,
    listFewCards
} from '../redux/actions/cardActions'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'
import { CARD_ORDER_CREATE_RESET, CARD_ORDER_UPDATE_RESET } from '../redux/constants/cardOrderConstants'

const CardPage = () => {
    const history = useHistory()
    const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const cardListFew = useSelector(state => state.cardListFew)
    const { loading: cardsLoading, cards, error: cardsError } = cardListFew

    const cardDetails = useSelector(state => state.cardDetails)
    const { loading: cardLoading, card } = cardDetails

    useEffect(() => {
        scroll.scrollTo(350)

    }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: CARD_ORDER_CREATE_RESET })
        dispatch({ type: CARD_ORDER_UPDATE_RESET })
        dispatch({ type: DRAWER_CLOSE })
    }, [dispatch])

    useEffect(() => {
        if (userInfo) {
            const { exp } = jwt_decode(userInfo.token)
            const expirationTime = (exp * 1000) - 6000
            if (Date.now() >= expirationTime) {
                dispatch(logout())
            }
        }

    }, [dispatch, userInfo, history])

    useEffect(() => {
        const splittedPath = location.pathname.split(/\//)
        const id = splittedPath[splittedPath.length - 1]

        dispatch(listCardDetails(id))
        dispatch(listFewCards(4))
    }, [dispatch, location])

    return (
        <div>
            <Meta />

            {
                !userInfo && (
                    <Modal>
                        <div className="modalitem">
                            <p>You are not signed in</p>
                            <div>
                                <Link to="/auth">Login <VpnKeyIcon /></Link>
                                <span>to continue</span>
                            </div>
                        </div>
                    </Modal>
                )
            }
            <BaseFile
                loading={cardsLoading}
                cards={cards}
                error={cardsError}
                TopImage={<img src={card && card.upload && card.upload.image} alt={card && card.name} />}
                topText={card && card.name}
            >
                {
                    cardLoading ? <Loader />
                        :

                        <BaseChildren
                            baseAmount={card && card.price}
                            availability={card && card.countInStock > 0 ? "In stock" : "Out of stock"}
                            name={card && card.name}
                        />

                }
            </BaseFile>
        </div>
    )
}

export default CardPage
