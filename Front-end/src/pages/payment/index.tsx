import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'
import { saveDataFromLocalStorage } from '../../utils'
import { Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
type Props = {}

export default function Payment({}: Props) {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { shippingAddress, paymentMethod },
  } = state
  const [paymentName, setPaymentName] = useState(paymentMethod)
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress])
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentName })
    saveDataFromLocalStorage('paymentMethod', paymentName)
    navigate('/placeorder')
  }
  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <section className='payment'>
        <div className='payment-container'>
          <h1 className='title'>Payment Method</h1>
          <fieldset>
            <div className='radio-item-container'>
            <RadioGroup defaultValue='1' onChange={setPaymentName} value={paymentName}>
								<Stack spacing={5} direction='row'>
									<Radio value='Paypal'>Paypal</Radio>
									<Radio value='COD'>COD</Radio>
								</Stack>
							</RadioGroup>
            </div>
          </fieldset>
          <Button className='btn-continue' onClick={handleSubmit}>Continue</Button>
        </div>
      </section>
    </>
  )
}
