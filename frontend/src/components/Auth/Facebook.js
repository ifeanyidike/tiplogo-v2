import React, { useState } from 'react'
import FacebookLogin from "react-facebook-login"
import { useDispatch } from "react-redux"
import { facebooklogin } from "../../redux/actions/userActions"
import { FacebookButton } from "../../styles/AuthStyle"


const Facebook = () => {
    const [clicked, setClicked] = useState(false)
    const dispatch = useDispatch()


    const componentClicked = () => {
        setClicked(true)
    }
    const responseFacebook = response => {
        dispatch(facebooklogin(response.userID, response.accessToken))
    }

    return (
        <FacebookButton>
            <FacebookLogin
                icon="fa-facebook"
                appId="634436600775486"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={clicked && responseFacebook}
                textButton="&nbsp;Sign In with Facebook"

            />
        </FacebookButton>
    )
}

export default Facebook
