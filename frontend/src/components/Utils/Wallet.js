import React, { useState, useEffect } from 'react'
import { WalletContainer, WalletButton } from '../../styles/ProfileStyle'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import CurrencyFormat from 'react-currency-format'
import Loader from '../Loaders/SimpleLoader'
import MessageModal from '../Utils/MessageModal'
import { creditWallet, getWalletAmount } from '../../redux/actions/userActions'
import PayStack from '../Payment/PayStack'
// import Flutterwave from '../Payment/Flutterwave'

const Wallet = ({ mt, mb, width }) => {
  const dispatch = useDispatch()
  const [pay, setPay] = useState(false)
  const [lowAmount, setLowAmount] = useState(false)
  const [amount, setAmount] = useState(0)
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    dispatch(getWalletAmount())
  }, [dispatch])

  const { wallet } = useSelector((state) => state.userWalletAmount)

  const handleCancelPay = (e) => {
    e.preventDefault()
    setPay(false)
  }

  const onSuccess = (reference) => {
    const paymentResult = {
      id: reference.trxref,
      status: reference.status,
      update_time: String(new Date().getTime()),
      email: userInfo.email,
    }

    dispatch(creditWallet(amount, paymentResult, 'PayStack'))
    setPay(false)
  }

  return (
    <>
      {userInfo && (
        <WalletContainer mt={mt} width={width} mb={mb}>
          {loading ? (
            <Loader />
          ) : error ? (
            error
          ) : (
            <>
              <i className="fas fa-wallet"></i>
              <CurrencyFormat
                value={wallet && wallet.toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₦'}
                renderText={(value) => <h2>{value}</h2>}
              />

              <WalletButton onClick={() => setPay(true)}>
                Fund Wallet
              </WalletButton>
            </>
          )}
        </WalletContainer>
      )}

      <MessageModal
        open={pay}
        setOpen={setPay}
        caption="Add to Your Wallet"
        message={
          <div>
            <FormControl
              fullWidth
              style={{ margin: '15px auto' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                required
                type="number"
                id="outlined-adornment-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">₦</InputAdornment>
                }
                labelWidth={60}
              />
              <div style={{ display: 'flex' }}>
                <PayStack amount={amount} onSuccess={onSuccess} simple={true} />
                {/* <Flutterwave
                                    amount={amount}
                                    service="wallet funding"
                                    onSuccess={onSuccess}
                                    simple={true}
                                /> */}
                <WalletButton ml={10} onClick={handleCancelPay}>
                  Cancel
                </WalletButton>
              </div>
            </FormControl>
          </div>
        }
      />

      <MessageModal
        open={lowAmount}
        setOpen={setLowAmount}
        caption="Error!"
        message={`Amount cannot be less than ${amount}`}
      />
    </>
  )
}

export default Wallet
