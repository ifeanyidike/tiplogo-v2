import React, { useState, useEffect } from 'react'
import BaseRoot from '../components/Services/BaseRoot'
import { ServiceTypeContainer, ServicePanel } from '../styles/ServiceStyle'
import { firstCardContainerVariants } from '../animationVariants/CardVariants'
import CourseChangeForm from '../components/Services/CourseChangeForm'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import CourseChangeReview from '../components/Services/CourseChangeReview'
import ServicePayment from '../components/Services/ServicePayment'
import { useDispatch, useSelector } from 'react-redux'
import { WALLET_DEBIT_RESET } from '../redux/constants/userConstants'
import { OLEVEL_UPLOAD_CREATE_RESET } from '../redux/constants/oLevelResultUploadConstants'
import { JAMB_PASSWORD_RESET_CREATE_RESET } from '../redux/constants/jambPasswordResetConstants'
import { COCI_CREATE_RESET } from '../redux/constants/changeOfCourseConstants'
import NotLoggedIn from '../components/Utils/NotLoggedIn'
import Meta from '../components/Meta'
import { animateScroll as scroll } from 'react-scroll'

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}))

const steps = ['Form Entry', 'Review your order', 'Payment']

const ChangeOfCourseInstitution = () => {
  const classes = useStyles()
  const [year, setYear] = useState('2020')
  const [type, setType] = useState('UTME')
  const [name, setName] = useState('')
  const [regNo, setRegNo] = useState('')
  const [profileCode, setProfileCode] = useState('')
  const [OTP, setOTP] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [moreInfo, setMoreInfo] = useState('')
  const dispatch = useDispatch()
  const [jambAmountPay, setJambAmountPay] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    dispatch({ type: WALLET_DEBIT_RESET })
    dispatch({ type: OLEVEL_UPLOAD_CREATE_RESET })
    dispatch({ type: JAMB_PASSWORD_RESET_CREATE_RESET })
    dispatch({ type: COCI_CREATE_RESET })
  }, [dispatch])

  const [programme, setProgramme] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
  })

  const [institution, setInstitution] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
  })

  const [course, setCourse] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
  })

  const changeOfCourseOrder = () => {
    return {
      transactionType: 'changeofcourse',
      orderItems: {
        year,
        type,
        fullName: name,
        regNo,
        profileCode,
        otp: OTP,
        choices: [
          {
            preferredProgramme: programme.first,
            institution: institution.first,
            course: course.first,
          },
          {
            preferredProgramme: programme.second,
            institution: institution.second,
            course: course.second,
          },
          programme.third && {
            preferredProgramme: programme.third,
            institution: institution.third,
            course: course.third,
          },
          programme.fourth && {
            preferredProgramme: programme.fourth,
            institution: institution.fourth,
            course: course.fourth,
          },
        ],
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
              <CourseChangeForm
                year={year}
                setYear={setYear}
                type={type}
                setType={setType}
                regNo={regNo}
                setRegNo={setRegNo}
                OTP={OTP}
                setOTP={setOTP}
                profileCode={profileCode}
                setProfileCode={setProfileCode}
                name={name}
                setName={setName}
                programme={programme}
                setProgramme={setProgramme}
                institution={institution}
                setInstitution={setInstitution}
                course={course}
                setCourse={setCourse}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                moreInfo={moreInfo}
                setMoreInfo={setMoreInfo}
                jambAmountPay={jambAmountPay}
                setJambAmountPay={setJambAmountPay}
              />
            ) : activeStep === 1 ? (
              <CourseChangeReview
                year={year}
                type={type}
                name={name}
                profileCode={profileCode}
                OTP={OTP}
                regNo={regNo}
                programme={programme}
                institution={institution}
                course={course}
                moreInfo={moreInfo}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            ) : activeStep === 2 ? (
              <ServicePayment
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                serviceOrder={changeOfCourseOrder}
                jambAmountPay={jambAmountPay}
                type="changeofcourse"
                // handleWalletPayment = {handleSubmit}
              />
            ) : null}
          </ServicePanel>
        </ServiceTypeContainer>
      )}
    </BaseRoot>
  )
}

export default ChangeOfCourseInstitution
