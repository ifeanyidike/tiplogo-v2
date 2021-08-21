import React, { useState } from 'react'
import { ChangeOfCoursePriceContainer } from '../../styles/ServiceStyle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CurrencyFormat from 'react-currency-format'

const ChangeOfCoursePrice = ({ jambAmountPay, setJambAmountPay }) => {
  return (
    <ChangeOfCoursePriceContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={jambAmountPay}
            onChange={(e) => setJambAmountPay(e.target.checked)}
            color="secondary"
          />
        }
        label="Check if you have made the compulsory ₦2500 payment on Jamb portal"
      />
    </ChangeOfCoursePriceContainer>
  )
}

export default ChangeOfCoursePrice
