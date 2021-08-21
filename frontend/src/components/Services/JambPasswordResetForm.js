import React, { useState, useEffect } from 'react'
import { ButtonSingle, NextButton } from "../../styles/ServiceStyle"
import { colors } from "../../styles/breakpoints"
import { makeStyles } from '@material-ui/core/styles';
import { Input, FormControl, IconButton } from '@material-ui/core'
import { InputLabel, InputAdornment } from '@material-ui/core'
import { Person as PersonIcon } from '@material-ui/icons'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CurrencyFormat from 'react-currency-format';
import EventNoteIcon from '@material-ui/icons/EventNote';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MomentUtils from '@date-io/moment';
import { WALLET_DEBIT_RESET } from '../../redux/constants/userConstants'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MessageModal from "../Utils/MessageModal"
import { listServiceByName } from '../../redux/actions/serviceActions';
import { useDispatch, useSelector } from "react-redux"
import Message from "../Message"
import Loader from "../Loaders/SimpleLoader"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));


const CourseChangeForm = ({
    name,
    setName,
    email,
    setEmail,
    dateOfBirth,
    setDateOfBirth,
    password,
    setPassword,
    activeStep,
    setActiveStep,
}) => {
    const classes = useStyles();
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listServiceByName('jamb password reset'))
        dispatch({ type: WALLET_DEBIT_RESET })
    }, [dispatch])

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { service } = useSelector(state => state.serviceByName)

    const onSubmit = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPasswordMismatch(true)
            return
        }
        setActiveStep(activeStep + 1)
    }

    const handleDateChange = (date) => {
        setDateOfBirth(date)
    }

    const jambPasswordResetOrderCreate = useSelector(state => state.jambPasswordResetOrderCreate)
    const { loading: jprLoading, error: jprError, success: jprSuccess } = jambPasswordResetOrderCreate

    return (
        <div>

            {
                jprLoading ? <Loader /> :
                    jprError ?
                        <Message variant="error">
                            {jprError}
                        </Message>
                        :
                        jprSuccess ?
                            <div><Message variant="info">
                                Successful. We'll get back to you soon.
                                </Message> </div>
                            : ''
            }

            <div className="topmainitem">

                <div>
                    <i className="fas fa-tags"></i>
                    <CurrencyFormat
                        value={service && service.cost}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₦'}
                        renderText={value => <h3>{value}</h3>} />
                </div>
            </div>
            <form onSubmit={onSubmit} >
                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-name">Full Name</InputLabel>
                    <Input
                        id="standard-adornment-name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                    />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
                    <Input
                        id="standard-adornment-email"
                        value={email}
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        startAdornment={<InputAdornment position="start"><AlternateEmailIcon /> </InputAdornment>}
                    />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Choose Your Date of Birth"
                            format="DD/MM/YYYY"
                            value={dateOfBirth}
                            onChange={handleDateChange}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">
                                        <EventNoteIcon />
                                    </InputAdornment>

                            }}
                        />


                    </MuiPickersUtilsProvider>

                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        value={password}
                        required
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility tabindex='-1' /> : <VisibilityOff tabindex='-1' />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="standard-adornment-amount">Confirm New Password</InputLabel>
                    <Input
                        id="standard-adornment-confirm-password"
                        value={confirmPassword}
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showConfirmPassword ? <Visibility tabindex='-1' /> : <VisibilityOff tabindex='-1' />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>


                <ButtonSingle>
                    <NextButton
                        variant={colors.darkblue}
                        type="submit" >Next <NavigateNextIcon />
                    </NextButton>
                </ButtonSingle>

            </form>

            <MessageModal
                open={passwordMismatch}
                setOpen={setPasswordMismatch}
                caption="Mismatched Passwords"
                message="Your password confirmation do not match"

            />

        </div>
    )
}

export default CourseChangeForm
