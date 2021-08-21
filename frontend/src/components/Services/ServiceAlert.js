import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { ServiceAlertContainer } from '../../styles/ServiceStyle'
import Message from "../Message"

const ServiceAlert = () => {
    return (

        <ServiceAlertContainer>
            <Message variant='info'>
                If you are on this page, we expect that you have already made a successful payment
                 of <CurrencyFormat
                    value={2500}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₦'}
                    renderText={value => <span className='amount'>{value}</span>} /> on the Jamb portal
            </Message>
        </ServiceAlertContainer>
    )
}

export default ServiceAlert
