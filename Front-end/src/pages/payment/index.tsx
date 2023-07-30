import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { Helmet } from 'react-helmet-async'
import { saveDataFromLocalStorage } from '../../utils'
import { Button } from '@chakra-ui/react'
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
              <div className='radio-item'>
                <label htmlFor='vanilla'>
                  <input
                    type='radio'
                    id='vanilla'
                    name='flavor'
                    value='Paypal'
                    onClick={() => setPaymentName('Paypal')}
                  />
                  <span>Paypal</span>
                </label>
              </div>
              <div className='radio-item'>
                <label htmlFor='chocolate'>
                  <input
                    type='radio'
                    id='chocolate'
                    name='flavor'
                    value='COD'
                    onClick={() => setPaymentName('COD')}
                  />
                  <span>COD</span>
                </label>
              </div>
            </div>
          </fieldset>
          <Button className='btn-continue' onClick={handleSubmit}>Continue</Button>
        </div>
      </section>
    </>
  )
}
