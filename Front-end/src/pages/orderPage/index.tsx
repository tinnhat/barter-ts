import {PayPalButtons, PayPalButtonsComponentProps, SCRIPT_LOADING_STATE, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {useContext, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Store} from '../../Store'
import {useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation} from '../../hooks/orderHooks'
import {ApiError} from '../../types/ApiError'
import {getError} from '../../utils'
import './style.scss'
import {Button, Text, Tooltip} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
type Props = {}

export default function OrderPage({}: Props) {
	const navigate = useNavigate()
	const params = useParams()
	const {state} = useContext(Store)
	const {userInfo} = state
	const {id: orderId} = params
	const {data: order, refetch} = useGetOrderDetailsQuery(orderId!)
	const {mutateAsync: payOrder} = usePayOrderMutation()
	const testPayHandler = async () => {
		await payOrder({orderId: orderId!})
		refetch()
		toast.success('Order is paid')
	}

	const [{}, paypalDispatch] = usePayPalScriptReducer()
	const {data: paypalConfig} = useGetPaypalClientIdQuery()

	useEffect(() => {
		if (paypalConfig && paypalConfig.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypalConfig!.clientId,
						currency: 'USD',
					},
				})
				paypalDispatch({
					type: 'setLoadingStatus',
					value: SCRIPT_LOADING_STATE.PENDING,
				})
			}
			loadPaypalScript()
		}
	}, [paypalConfig])

	const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
		style: {layout: 'vertical'},
		createOrder(data, actions) {
			console.log(data)

			return actions.order
				.create({
					purchase_units: [
						{
							amount: {
								value: order!.totalPrice.toString(),
							},
						},
					],
				})
				.then((orderID: string) => {
					return orderID
				})
		},
		onApprove(data, actions) {
			console.log(data)

			return actions.order!.capture().then(async (details) => {
				try {
					await payOrder({orderId: orderId!, ...details})
					refetch()
					toast.success('Order is paid successfully')
				} catch (err) {
					toast.error(getError(err as ApiError))
				}
			})
		},
		onError: (err) => {
			toast.error(getError(err as ApiError))
		},
	}
	useEffect(() => {
		if (JSON.stringify(userInfo) === '{}') {
			navigate('/signin')
		}
	}, [userInfo])
	return (
		<section className='orderPage'>
			<div className='container'>
				<h1 className='orderPage-title'>Checkout Order</h1>
				<div className='orderPage-container'>
					<div className='info-box'>
						<div className='shipping-box'>
							<p className='title'>Shipping</p>
							<p className='text'>
								Name: <span>{order?.shippingAddress.fullName}</span>
							</p>
							<p className='text'>
								Address:
								<span>{order?.shippingAddress.address}</span>
							</p>
							<p className='text'>
								Postal Code:
								<span>{order?.shippingAddress.postalCode}</span>
							</p>
							<p className='text'>
								Note:
								<span>{order?.shippingAddress.note}</span>
							</p>
						</div>
						<div className='payment-box'>
							<p className='title'>Payment</p>
							<p className='text'>
								Method: <span>{order?.paymentMethod}</span>
							</p>
						</div>
						<div className='item-box'>
							<p className='title'>Items</p>
							{order?.orderItems.map((item) => {
								return (
									<div className='item-info' key={item._id}>
										<div className='img-name'>
											<img src={item.image} alt='' />
											<div className='name'>
												<Tooltip label={item.name}>
													<Text noOfLines={2}>{item.name}</Text>
												</Tooltip>
											</div>
										</div>
										<p className='quantity'>{item.quantity}</p>
										<p className='price'>${item.price}</p>
									</div>
								)
							})}
						</div>
					</div>
					<div className='price-box'>
						<p className='title'>Order Summary</p>
						<p className='text'>
							Items <span>${order?.itemsPrice}</span>
						</p>
						<p className='text'>
							Shipping <span>${order?.shippingPrice}</span>
						</p>
						<p className='text'>
							Tax <span>${order?.taxPrice}</span>
						</p>
						<p className='total'>
							Total <span>${order?.totalPrice}</span>
						</p>
						{order?.isPaid ? (
							<p className='checkout-complete'>Checkout complete</p>
						) : (
							<>
								<PayPalButtons {...paypalbuttonTransactionProps} />
								<Button onClick={testPayHandler}>Checkout test</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
