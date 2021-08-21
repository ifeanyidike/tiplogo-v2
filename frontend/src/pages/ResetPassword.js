import React, { useState } from 'react'
import { Grid, TextField, IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../redux/actions/userActions"
import Header from "../components/MainHeader"
import { ResetButton, PasswordResetContainer } from "../styles/AuthStyle"
import Loader from "../components/Loaders/SimpleLoader"
import Meta from "../components/Meta"

const ResetPassword = () => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        message: ''
    });

    const location = useLocation()
    const dispatch = useDispatch()
    const splittedPath = location.pathname.split(/\//)
    const token = splittedPath[splittedPath.length - 1]

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { loading, error, result } = useSelector(state => state.passwordReset)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.password !== values.confirmPassword) {
            setValues({ ...values, message: 'Passwords do not match' })
        } else {
            dispatch(resetPassword(token, values.password))
        }
    }

    return (
        <div>
            <Meta />
            <Header />
            <PasswordResetContainer>
                <form className="content" onSubmit={handleSubmit}>
                    <div className="message">
                        {
                            values && values.message && values.message
                        }
                        {
                            loading ? <Loader />
                                : error ? error
                                    : result && result.message
                        }
                    </div>
                    <h2>Please Enter Your New Password</h2>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            fullWidth
                            autoComplete="Enter password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <i className="fas fa-key"></i>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Confirm Password"
                            value={values.confirmPassword}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            onChange={handleChange('confirmPassword')}
                            fullWidth
                            autoComplete="Enter password again"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <i className="fas fa-key"></i>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <ResetButton type="submit">Reset Password</ResetButton>
                </form>
            </PasswordResetContainer>
        </div>
    )
}

export default ResetPassword
