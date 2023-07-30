import { Button } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { useCreateOrderMutation } from '../../hooks/orderHooks'
import { ApiError } from '../../types/ApiError'
import { getError } from '../../utils'
import './style.scss'
type Props = {}
const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23
export default function PlaceOrder({}: Props) {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  cart.taxPrice = round2(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const { mutateAsync: createOrder } = useCreateOrderMutation()

  const handleSubmitOrder = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
      dispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('cartItems')
      navigate(`/order/${data.order._id}`)
    } catch (err) {
      alert(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart])

  return (
    <section className='placeorder'>
      <div className='container'>
        <h1 className='placeorder-title'>Preview Order</h1>
        <div className='placeorder-container'>
          <div className='info-box'>
            <div className='shipping-box'>
              <p className='title'>Shipping</p>
              <p className='text'>
                Name: <span>{cart.shippingAddress.fullName}</span>
              </p>
              <p className='text'>
                Address:
                <span>{cart.shippingAddress.address}</span>
              </p>
              <p className='text'>
                Postal Code:
                <span>{cart.shippingAddress.postalCode}</span>
              </p>
              <p className='text'>
                Note:
                <span>{cart.shippingAddress.note}</span>
              </p>
              <p className='edit'>edit</p>
            </div>
            <div className='payment-box'>
              <p className='title'>Payment</p>
              <p className='text'>
                Method: <span>{cart.paymentMethod}</span>
              </p>
              <p className='edit'>edit</p>
            </div>
            <div className='item-box'>
              <p className='title'>Items</p>
              {cart.cartItems.map(item => {
                return (
                  <div className='item-info' key={item._id}>
                    <div className='img-name'>
                      <img src={item.image} alt='' />
                      <div className='name'>{item.name}</div>
                    </div>
                    <p className='quantity'>{item.quantity}</p>
                    <p className='price'>${item.price}</p>
                  </div>
                )
              })}
              <p className='edit'>edit</p>
            </div>
          </div>
          <div className='price-box'>
            <p className='title'>Order Summary</p>
            <p className='text'>
              Items <span>${cart.itemsPrice}</span>
            </p>
            <p className='text'>
              Shipping <span>${cart.shippingPrice}</span>
            </p>
            <p className='text'>
              Tax <span>${cart.taxPrice}</span>
            </p>
            <p className='total'>
              Total <span>${cart.totalPrice}</span>
            </p>
            <Button className='btn-placeOrder' onClick={handleSubmitOrder}>Place Order</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
