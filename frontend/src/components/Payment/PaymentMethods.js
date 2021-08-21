import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function PaymentMethods({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className="paymenttitle">
        Choose Payment Methods
      </FormLabel>
      <RadioGroup
        aria-label="payment methods"
        className="paymentitem"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="PayStack"
          control={<Radio />}
          label="PayStack"
        />
        {/* <FormControlLabel value="Flutterwave" control={<Radio />} label="Flutterwave" /> */}
        <FormControlLabel value="Wallet" control={<Radio />} label="Wallet" />
      </RadioGroup>
    </FormControl>
  )
}
