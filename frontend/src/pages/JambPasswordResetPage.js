import React, { useState, useEffect } from 'react'
import BaseRoot from '../components/Services/BaseRoot'
import { ServiceTypeContainer, ServicePanel } from '../styles/ServiceStyle'
import { firstCardContainerVariants } from '../animationVariants/CardVariants'
import JambPasswordResetForm from '../components/Services/JambPasswordResetForm'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import JambPasswordResetReview from '../components/Services/JambPasswordResetReview'
import ServicePayment from '../components/Services/ServicePayment'
import { WALLET_DEBIT_RESET } from '../redux/constants/userConstants'
import { OLEVEL_UPLOAD_CREATE_RESET } from '../redux/constants/oLevelResultUploadConstants'
import { JAMB_PASSWORD_RESET_CREATE_RESET } from '../redux/constants/jambPasswordResetConstants'
import { COCI_CREATE_RESET } from '../redux/constants/changeOfCourseConstants'
import { useDispatch, useSelector } from 'react-redux'
import NotLoggedIn from '../components/Utils/NotLoggedIn'
import Meta from '../components/Meta'
import { animateScroll as scroll } from 'react-scroll'

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}))

const steps = ['Form Entry', 'Review your order', 'Payment']

const JambPasswordReset = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [password, setPassword] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    dispatch({ type: WALLET_DEBIT_RESET })
    dispatch({ type: OLEVEL_UPLOAD_CREATE_RESET })
    dispatch({ type: JAMB_PASSWORD_RESET_CREATE_RESET })
    dispatch({ type: COCI_CREATE_RESET })
  }, [dispatch])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const passwordResetOrder = () => {
    return {
      transactionType: 'jambpasswordreset',
      orderItems: {
        name,
        email,
        dateOfBirth,
        newPassword: password,
      },
    }
  }

  return (
    <BaseRoot topText="Services">
      <Meta />
      {!userInfo ? (
        <NotLoggedIn />
      ) : (
        <ServiceTypeContainer>
          <ServicePanel
            variants={firstCardContainerVariants}
            initial="initial"
            animate="animate"
            whileHover="onHover"
            variant="lightish"
          >
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 ? (
              <JambPasswordResetForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
                password={password}
                setPassword={setPassword}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ) : activeStep === 1 ? (
              <JambPasswordResetReview
                name={name}
                email={email}
                dateOfBirth={dateOfBirth}
                password={password}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ) : activeStep === 2 ? (
              <ServicePayment
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                serviceOrder={passwordResetOrder}
                type="passwordreset"
              />
            ) : null}
          </ServicePanel>
        </ServiceTypeContainer>
      )}
    </BaseRoot>
  )
}

export default JambPasswordReset
