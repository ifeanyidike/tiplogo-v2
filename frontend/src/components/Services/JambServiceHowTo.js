import React from 'react'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CurrencyFormat from 'react-currency-format'

const JambServiceHowTo = () => {
  return (
    <div className="howto howto_services">
      <h2>How It Works</h2>
      <ul>
        <li>
          <CheckBoxIcon /> Choose the service you want from the cards.
        </li>
        <li>
          <CheckBoxIcon />{' '}
          <p>
            Make sure you have successfully paid the{' '}
            <CurrencyFormat
              value={2500}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'₦'}
              renderText={(value) => <span className="amount">{value}</span>}
            />{' '}
            in Jamb portal.
          </p>
        </li>
        <li>
          <CheckBoxIcon /> Fill the form and upload requisite documents (if
          required). Click next.
        </li>
        <li>
          <CheckBoxIcon /> Go through the overview and ensure your information
          is correct. Click next.
        </li>
        <li>
          <CheckBoxIcon /> Pay either with wallet, or paystack. Fund your wallet
          to use wallet.
        </li>
      </ul>
    </div>
  )
}

export default JambServiceHowTo
