import React, { useState, useEffect } from 'react'
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Drafts';
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../redux/actions/userActions"
import Header from "../components/MainHeader"
import { ResetButton, PasswordResetContainer } from "../styles/AuthStyle"
import Loader from "../components/Loaders/SimpleLoader"
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')

    const { loading, error, result } = useSelector(state => state.passwordForgot)

    useEffect(() => {
        scroll.scrollToTop()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(forgotPassword(email))

    }

    return (
        <div>
            <Meta />
            <Header />
            <PasswordResetContainer>
                <form className="content" onSubmit={handleSubmit}>
                    <div className="message">
                        {
                            loading ? <Loader />
                                : error ? error
                                    : result && result.message
                        }
                    </div>
                    <h2>Please Enter Your Email</h2>

                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            autoComplete="off"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DraftsIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <ResetButton type="submit">Send Email</ResetButton>
                </form>
            </PasswordResetContainer>
        </div>
    )
}

export default ForgotPassword
