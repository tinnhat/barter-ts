import { Button, Input } from '@chakra-ui/react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { CartItem } from '../../types/Cart'
import './style.scss'
type Props = {}

export default function Cart({}: Props) {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const handleUpdateCart = (item: CartItem, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
      alert('remove item from cart')
      return
    }

    if (item.countInStock < quantity) {
      alert('Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  const handleCheckout = () => {
    navigate('/signin?redirect=/shipping')
  }
  const handleRemoveItem = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <section className='cart'>
        <div className='banner'>
          <h1 className='banner-title'>Cart</h1>
        </div>
        <div className='container'>
          {!cartItems.length ? (
            <div className='empty-cart'>
              <p>
                Cart is empty <a href='/shop'>Shopping now</a>
              </p>
            </div>
          ) : (
            <div className='cart-container'>
              <div className='title'>
                <ul className='title-list'>
                  <li className='title-item'></li>
                  <li className='title-item'>Product</li>
                  <li className='title-item'>Price</li>
                  <li className='title-item'>Quantity</li>
                  <li className='title-item'>Subtotal</li>
                </ul>
              </div>
              <div className='item-row'>
                {cartItems.map(item => {
                  return (
                    <ul className='item-info' key={item._id}>
                      <li className='title-item'>
                        <i
                          className='fa-solid fa-trash icon-remove'
                          onClick={() => handleRemoveItem(item)}
                        ></i>

                        <img src={item.image} alt='' />
                      </li>
                      <li className='item-name'>{item.name}</li>
                      <li className='item-price'>${item.price}</li>
                      <li className='item-quantity'>
                        <Button
                          onClick={() =>
                            handleUpdateCart(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className='fa-solid fa-plus'></i>
                        </Button>
                        <span className='box-quantity'>{item.quantity}</span>
                        <Button
                          onClick={() =>
                            handleUpdateCart(item, item.quantity - 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className='fa-solid fa-minus'></i>
                        </Button>
                      </li>
                      <li className='item-price-total'>
                        ${item.quantity * item.price}
                      </li>
                    </ul>
                  )
                })}
              </div>
              <div className='sub-cart-item'>
                <div className='coupon-box'>
                  <Input type='text' className='input-coupon'/>
                  <Button className='btn-coupon'>Apply coupon</Button>
                </div>
                <Button className='btn-update'>Update cart</Button>
              </div>
              <div className='total-box'>
                <p className='total-title'>Cart totals</p>
                <p className='total-price'>
                  Total
                  <span>
                    $
                    {cartItems.reduce(
                      (acc, value) => acc + value.price * value.quantity,
                      0
                    )}
                  </span>
                </p>
                <Button className='btn-checkout' onClick={handleCheckout}>
                  Proceed to checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
