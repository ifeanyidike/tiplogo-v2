import React, { useEffect } from 'react'
import Header from "../components/MainHeader"
import { useDispatch, useSelector } from "react-redux"
import { activateAccount } from "../redux/actions/userActions"
import { useLocation, Link } from "react-router-dom"
import { EmailConfirmation } from "../styles/AuthStyle"
import { animateScroll as scroll } from 'react-scroll'

const ActivateAccount = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        scroll.scrollToTop()
    }, [])

    useEffect(() => {
        const splittedPath = location.pathname.split(/\//)
        const token = splittedPath[splittedPath.length - 1]

        dispatch(activateAccount(token))
    }, [dispatch, location])

    const { loading, error } = useSelector(state => state.accountActivate)

    return (
        <div>
            <Header />
            <EmailConfirmation>
                {
                    loading ?
                        <div><h2>Loading...</h2></div>
                        :
                        error ?
                            <div><h2>{error}</h2></div>
                            :
                            <div>
                                <h2>Email verified</h2>
                                <Link to="/auth">Login</Link>
                            </div>
                }
            </EmailConfirmation>

        </div>
    )
}

export default ActivateAccount
