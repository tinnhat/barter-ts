import {Button, Input} from '@chakra-ui/react'
import {useContext, useRef} from 'react'
import {Helmet} from 'react-helmet-async'
import {useParams} from 'react-router-dom'
import {Store} from '../../Store'
import LoadingBox from '../../components/loadingBox'
import MessageBox from '../../components/messageBox'
import {useGetProductDetailBySlugQuery} from '../../hooks/productHooks'
import {ApiError} from '../../types/ApiError'
import {convertProductToCartItem, getError} from '../../utils'
import './style.scss'
import parse from 'html-react-parser'
import {toast} from 'react-hot-toast'

export default function ProductDetail() {
	const params = useParams()
	const {slug} = params
	const {data: product, isLoading, error} = useGetProductDetailBySlugQuery(slug!)
	const quantityRef = useRef<HTMLInputElement>(null)
	const {state, dispatch} = useContext(Store)
	const {cart} = state

	const handleAddProductToCart = () => {
		const existItem = cart.cartItems.find((x) => x._id === product!._id)
		const quantity = existItem ? existItem.quantity + Number(quantityRef.current?.value!) : quantityRef.current?.value
		if (product!.countInStock < Number(quantity)) {
			toast.error('product is out of stock')
			// quantityRef.current?.value = 1
			return
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: {
				...convertProductToCartItem(product!),
				quantity: Number(quantity),
			},
		})
		toast.success(`Add product successfully`)
	}

	const renderDescription = () => {
		return (
			<div className='review'>
				<div className='ql-editor'>{product && parse(product.description)}</div>
			</div>
		)
	}
	return (
		<>
			{isLoading ? (
				<LoadingBox loadingProps={isLoading} />
			) : error ? (
				<MessageBox status='error'>{getError(error as ApiError)}</MessageBox>
			) : !product ? (
				<MessageBox status='error'>Product not found</MessageBox>
			) : (
				<>
					<Helmet>
						<title>{product.name}</title>
					</Helmet>
					<section className='product'>
						<div className='container'>
							<div className='product-container'>
								<div className='picture'>
									<img src={product.image} alt='' />
								</div>
								<div className='product-info'>
									<h2 className='product-name'>{product.name}</h2>
									<p className='price'>
										Price: <span>${product.price}</span>
									</p>

									<p className='count-in-stock'>
										In stock:
										<span className={product.countInStock ? 'inStock' : 'outStock'}>{product.countInStock}</span>
									</p>
									<div className='product-action'>
										<Input type='number' name='' id='' min={1} max={999} defaultValue={1} ref={quantityRef} />
										{product.countInStock ? (
											<Button className='btn-add-cart' onClick={handleAddProductToCart}>
												Add to cart
											</Button>
										) : (
											<Button className='btn-add-cart disabled-btn'>Add to cart</Button>
										)}
									</div>
									<p className='category'>
										Category: <span>{product.category}</span>
									</p>
								</div>
							</div>
							<div className='product-des-box'>
								<p className='description-title'>Description: </p>
								<p className='product-desr'>{renderDescription()}</p>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	)
}
