import React, { useEffect } from 'react'
import BaseRoot from '../components/Services/BaseRoot'
import { ServicesContainer } from '../styles/ServiceStyle'
import ServicesItems from '../components/Services/ServicesItems'
import { useSelector } from 'react-redux'
import Loader from '../components/Loaders/SimpleLoader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import JambServiceHowTo from '../components/Services/JambServiceHowTo'
import { animateScroll as scroll } from 'react-scroll'

const AllServices = () => {
  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  const changeOfCourseOrderCreate = useSelector(
    (state) => state.changeOfCourseOrderCreate,
  )
  const {
    loading: cocLoading,
    error: cocError,
    success: cocSuccess,
  } = changeOfCourseOrderCreate

  const oLevelUploadOrderCreate = useSelector(
    (state) => state.oLevelUploadOrderCreate,
  )
  const {
    loading: oluLoading,
    error: oluError,
    success: oluSuccess,
  } = oLevelUploadOrderCreate

  const jambPasswordResetOrderCreate = useSelector(
    (state) => state.jambPasswordResetOrderCreate,
  )
  const {
    loading: jprLoading,
    error: jprError,
    success: jprSuccess,
  } = jambPasswordResetOrderCreate

  const walletDebit = useSelector((state) => state.walletDebit)
  const { loading: walletLoading, error: walletError } = walletDebit

  return (
    <BaseRoot topText="Data Correction">
      <Meta />

      {walletLoading ? (
        <Loader />
      ) : walletError ? (
        <Message variant="error">
          {walletError}
          Try again
        </Message>
      ) : null}
      {cocLoading ? (
        <Loader />
      ) : cocError ? (
        <Message variant="error">{cocError}</Message>
      ) : cocSuccess ? (
        <div>
          <Message variant="info">
            Successful. We'll get back to you soon.
          </Message>
        </div>
      ) : (
        ''
      )}

      {oluLoading ? (
        <Loader />
      ) : oluError ? (
        <Message variant="error">{oluError}</Message>
      ) : oluSuccess ? (
        <Message variant="info">
          Successful. We'll get back to you soon.
        </Message>
      ) : (
        ''
      )}

      {jprLoading ? (
        <Loader />
      ) : jprError ? (
        <Message variant="error">{jprError}</Message>
      ) : jprSuccess ? (
        <div>
          <Message variant="info">
            Successful. We'll get back to you soon.
          </Message>{' '}
        </div>
      ) : (
        ''
      )}

      <ServicesContainer>
        <div className="items">
          <ServicesItems />
        </div>
        <JambServiceHowTo />
      </ServicesContainer>
    </BaseRoot>
  )
}

export default AllServices
