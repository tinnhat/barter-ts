import {useContext} from 'react'
import {Store} from '../../Store'
import {CartItem} from '../../types/Cart'
import {Product as ProductType} from '../../types/Product'
import {convertProductToCartItem} from '../../utils'
import './style.scss'
import {Button, Text, Tooltip} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'

export default function SingleProduct({product}: {product: ProductType}) {
	const {state, dispatch} = useContext(Store)
	const {
		cart: {cartItems},
	} = state

	const handleAddtoCart = (item: CartItem) => {
		const existItem = cartItems.find((val) => val._id === product._id)
		const quantity = existItem ? existItem.quantity + 1 : 1
		if (product.countInStock < quantity) {
			toast.error('Sorry. Product is out of stock')
			return
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: {...item, quantity},
		})
		toast.success('Add product successfully')
	}
	return (
		<>
			<a href={`/product/${product.slug}`} className='product-box'>
				<div className='box-img-add-cart'>
					<img src={product.image} alt='' />

					{!product.countInStock ? (
						<Button className='btn-disable' disabled>
							Out of stock
						</Button>
					) : (
						<Button
							className='btn-add'
							onClick={(e) => {
								e.preventDefault()
								handleAddtoCart(convertProductToCartItem(product))
							}}
						>
							Add to cart
						</Button>
					)}
				</div>

				<Tooltip label={product.category}>
					<Text className='product-tag' noOfLines={1}>
						{product.category}
					</Text>
				</Tooltip>

				<Tooltip label={product.name}>
					<Text className='product-name' noOfLines={1}>
						{product.name}
					</Text>
				</Tooltip>

				<p className='product-price'>${product.price}</p>
			</a>
		</>
	)
}
