import React, { useEffect } from 'react'
import { AuthTabContainer, AuthMainContainer } from "../styles/AuthStyle"
import Header from "../components/MainHeader"
import AuthPanel from "../components/Auth/"
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'

const AuthPage = () => {
    useEffect(() => {
        scroll.scrollToTop()
    }, [])

    return (
        <div>
            <Meta />
            <Header />
            <AuthMainContainer>
                <AuthTabContainer>
                    <AuthPanel />
                </AuthTabContainer>
            </AuthMainContainer>
        </div>
    )
}

export default AuthPage
