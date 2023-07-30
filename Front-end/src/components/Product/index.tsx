import { useContext } from 'react'
import { Store } from '../../Store'
import { CartItem } from '../../types/Cart'
import { Product as ProductType } from '../../types/Product'
import { convertProductToCartItem } from '../../utils'
import './style.scss'

export default function SingleProduct({ product }: { product: ProductType }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const handleAddtoCart = (item: CartItem) => {
    const existItem = cartItems.find(val => val._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    alert(`add product ${product.name} to cart`)
  }
  return (
    <>
      <a href={`/product/${product.slug}`} className='product-box'>
        <div className='box-img-add-cart'>
          <img src={product.image} alt='' />

          {!product.countInStock ? (
            <button className='btn-disable' disabled>
              Out of stock
            </button>
          ) : (
            <button
              className='btn-add'
              onClick={e => {
                e.preventDefault()
                handleAddtoCart(convertProductToCartItem(product))
              }}
            >
              Add to cart
            </button>
          )}
        </div>
        <p className='product-tag'>{product.category}</p>
        <p className='product-name'>{product.name}</p>
        <p className='product-price'>${product.price}</p>
      </a>
    </>
  )
}
