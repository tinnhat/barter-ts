import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
	Tooltip,
} from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {typeEnum, widthModalForModal} from '../../../../common/enum'
import {useGetAllUsersQuery} from '../../../../hooks/userHooks'
import {ApiError} from '../../../../types/ApiError'
import {CartItem} from '../../../../types/Cart'
import {Order} from '../../../../types/Order'
import {UserInfo} from '../../../../types/UserInfo'
import {getError} from '../../../../utils'
import './style.scss'
import {useGetProductsQuery} from '../../../../hooks/productHooks'
import {Product} from '../../../../types/Product'
import {useCreateOrderAdminMutation, useUpdateOrderAdminMutation} from '../../../../hooks/orderHooks'

interface IFormInputs {
	fullName: string
	address: string
	postalCode: string
	note?: string
	totalPrice: number
	taxPrice: number
	shippingPrice: number
}
type ShowModalType = {
	show: boolean
	type: number
	order: Order
}
type Props = {
	showModal: ShowModalType
	setShowModal: React.Dispatch<React.SetStateAction<ShowModalType>>
	handleRefetchData: () => void
}
const ModalCustomer = ({showModal, setShowModal, handleRefetchData}: Props) => {
	const {mutateAsync: createOrderAdmin} = useCreateOrderAdminMutation()
	const {mutateAsync: updateOrderAdmin} = useUpdateOrderAdminMutation()

	const {data: allProduct} = useGetProductsQuery()
	const {data: allUser} = useGetAllUsersQuery()
	const finalRef = useRef(null)
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		watch,
		formState: {errors},
	} = useForm<IFormInputs>()
	const [products, setProducts] = useState(allProduct)
	const [showBoxAllProducts, setShowBoxAllProducts] = useState(false)
	const [dataShow, setDataShow] = useState(showModal.order)
	const [loading, setLoading] = useState(false)
	const [listUsers, setListUsers] = useState<UserInfo[]>()
	const [userSelected, setUserSelected] = useState('')
	const [isPaid, setIsPaid] = useState('1')
	const [isDelivered, setIsDelivered] = useState('1')
	const [paymentMethod, setPaymentMethod] = useState('1')

	const handleCloseModal = () => {
		handleRefetchData()
		setShowModal((state) => {
			return {
				...state,
				show: false,
			}
		})
	}
	useEffect(() => {
		allProduct?.forEach((item) => {
			item.quantity = 0
		})
		setProducts(allProduct)
	}, [allProduct])
	useEffect(() => {
		if (showModal.order._id) {
			setValue('taxPrice', showModal.order.taxPrice)
			setValue('shippingPrice', showModal.order.shippingPrice)
			setValue('fullName', showModal.order.shippingAddress.fullName)
			setValue('address', showModal.order.shippingAddress.address)
			setValue('postalCode', showModal.order.shippingAddress.postalCode)
			setValue('note', showModal.order.shippingAddress.note)
			setUserSelected(showModal.order.user + '')
			if (showModal.order.paymentMethod == 'COD') {
				setPaymentMethod('1')
			} else setPaymentMethod('2')
			if (showModal.order.isPaid) {
				setIsPaid('1')
			} else setIsPaid('2')
			if (showModal.order.isDelivered) {
				setIsDelivered('1')
			} else setIsDelivered('2')
		}
	}, [showModal.order])
	useEffect(() => {
		if (allUser) {
			setListUsers(allUser)
		}
	}, [allUser])
	const onSubmit = (values: IFormInputs) => {
		if (values.fullName.trim() === '') {
			toast.error('Please enter your full name')
			return
		}
		if (values.address.trim() === '') {
			toast.error('Please enter your address for shipping')
			return
		}
		if (values.postalCode.trim() === '') {
			toast.error('Please enter your postal code')
			return
		}
		if (!userSelected) {
			toast.error('Please choose your owner of order')
			return
		}
		const itemAllPrice = dataShow.orderItems.reduce((acc, val) => {
			return acc + val.price * val.quantity
		}, 0)
		const payload = {
			orderItems: dataShow.orderItems,
			shippingAddress: {
				note: values.note ? values.note.trim() : '',
				address: values.address.trim(),
				fullName: values.fullName.trim(),
				postalCode: values.postalCode.trim(),
			},
			paymentMethod: paymentMethod === '1' ? 'COD' : 'Paypal',
			itemsPrice: itemAllPrice, //calculator
			shippingPrice: +values.shippingPrice,
			taxPrice: +values.taxPrice,
			totalPrice: itemAllPrice + +values.shippingPrice + +values.taxPrice, //calculator
			isPaid: isPaid === '1' ? true : false,
			isDelivered: isDelivered === '1' ? true : false,
			user: userSelected,
		}
		if (showModal.type === typeEnum.Add) {
			handleAddOrder(payload)
			handleRefetchData()
			return
		}
		handleEditOrder(payload)
		handleRefetchData()
	}

	const handleAddOrder = async (values: Order) => {
		if (values.orderItems.length === 0) {
			toast.error('Please add item in order')
			return
		}
		setLoading(true)
		try {
			const result = await createOrderAdmin(values)
			console.log(result)
			if (result) {
				toast.success('Create order successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const handleEditOrder = async (values: Order) => {
		if (values.orderItems.length === 0) {
			toast.error('Please add item in order')
			return
		}
		setLoading(true)
		try {
			const result = await updateOrderAdmin({...values, _id: showModal.order._id!})
			if (result) {
				toast.success('Edit order successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const renderTableProduct = (data: Order) => {
		return (
			data.orderItems &&
			data.orderItems.map((product, idx: number) => {
				return (
					<tr className={`row-table ${idx % 2 === 0 ? 'row-even' : ''}`} key={idx}>
						<td className='table-column__pic'>
							<img src={product.image} alt='' />
						</td>
						<td className='table-column__name'>
							<Tooltip label={product.name}>
								<Text noOfLines={1}>{product.name}</Text>
							</Tooltip>
						</td>
						<td className='table-column__cate'>
							<Tooltip label={product.category}>
								<Text noOfLines={1}>{product.category}</Text>
							</Tooltip>
						</td>
						<td className='table-column__quantity'>
							<div className='quantity-flex'>
								<p className='count-in-stock-quantity'>In stock: {product.countInStock}</p>
								<div className='count-in-order'>
									<Input type='number' value={product.quantity} min={1} max={999999} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeQuantity(e, product)} />
								</div>
							</div>
						</td>
						<td className='table-column__price'>$ {product.price}</td>
						<td className='table-column__total-price'>$ {product.price * product.quantity}</td>
						<td className='table-column__action'>
							<i className='fa-solid fa-trash' onClick={() => handleDeleteItem(product)}></i>
						</td>
					</tr>
				)
			})
		)
	}

	const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>, item: CartItem) => {
		const cloneDataShow = JSON.parse(JSON.stringify(dataShow))
		const findItem: CartItem | undefined = cloneDataShow.orderItems.find((val: CartItem) => val._id === item._id)
		if (findItem) {
			if (+e.target.value > item.countInStock) {
				toast.error('Quantity must be less than Count in stock')
				e.target.value = item.quantity + ''
			} else {
				findItem.quantity = +e.target.value
			}
			setDataShow(cloneDataShow)
		}
	}
	const handleDeleteItem = (product: CartItem) => {
		const cloneDataShow = JSON.parse(JSON.stringify(dataShow))
		cloneDataShow.orderItems = cloneDataShow.orderItems.filter((val: CartItem) => val._id !== product._id)
		setDataShow(cloneDataShow)
	}
	const handleChangeAddToOrder = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
		if (e.target.value) {
			if (+e.target.value > product.countInStock) {
				toast.error(`Quantity must be less than Count in stock: ${product.countInStock}`)
				e.target.value = '0'
				product.quantity = 0
				return
			} else {
				const newProducts = [...products!]
				const idxProducts = newProducts.findIndex((item) => item._id === product._id)
				newProducts[idxProducts].quantity = +e.target.value
				setProducts(newProducts)
			}
		}
	}
	const handleAddItemOrder = (product: Product) => {
		if (product.quantity === 0) {
			return
		}
		const idxProduct = dataShow.orderItems.findIndex((item) => item._id === product._id)
		const newDataShow = {...dataShow!}
		if (idxProduct === -1) {
			const convertProductToCartItem: CartItem = {
				image: product.image,
				slug: product.slug,
				category: product.category,
				quantity: product.quantity!,
				countInStock: product.countInStock,
				price: product.price,
				_id: product._id!,
				name: product.name,
			}
			newDataShow.orderItems = [...newDataShow.orderItems, convertProductToCartItem]
		} else {
			newDataShow.orderItems[idxProduct].quantity += product.quantity!
		}
		const newProducts = [...products!]
		const idxProducts = newProducts.findIndex((item) => item._id === product._id)
		newProducts[idxProducts].quantity = product.quantity!
		setProducts(newProducts)
		setDataShow(newDataShow)
	}
	useEffect(() => {
		const allPrice = dataShow.orderItems.reduce((acc, val) => {
			return acc + val.price * val.quantity
		}, 0)
		setValue('totalPrice', allPrice)
	}, [dataShow])
	return (
		<Modal
			finalFocusRef={finalRef}
			closeOnOverlayClick={false}
			isOpen={true}
			onClose={() => {}}
			id='modal-order'
			size={{sm: widthModalForModal.sm, md: widthModalForModal.md, lg: widthModalForModal.lg, xl: widthModalForModal.xl}}
		>
			<ModalOverlay />
			<ModalContent className='modal-order-content' w={{sm: widthModalForModal.sm, md: widthModalForModal.md, lg: widthModalForModal.lg, xl: widthModalForModal.xl}}>
				<form className='input-form' onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>{+showModal.type == typeEnum.Add ? 'Add order' : 'Edit order'}</ModalHeader>
					<ModalBody w={{sm: widthModalForModal.sm, md: widthModalForModal.md, lg: widthModalForModal.lg, xl: widthModalForModal.xl}}>
						<FormControl>
							<Tabs isFitted variant='enclosed'>
								<TabList mb='1em'>
									<Tab>Items</Tab>
									<Tab>Shipping Adress</Tab>
									<Tab>Payment and another</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										<FormLabel htmlFor=''>Items</FormLabel>
										<Box overflowY='auto' maxHeight='400px'>
											<div className='customers-table'>
												<div className='table-header'>
													<table cellPadding='0' cellSpacing='0'>
														<thead>
															<tr>
																<th className='table-column__pic'>Picture</th>
																<th className='table-column__name'>Name</th>
																<th className='table-column__cate'>Category</th>
																<th className='table-column__quantity'>Quantity</th>
																<th className='table-column__price'>Price</th>
																<th className='table-column__total-price'>Total Price</th>
																<th className='table-column__action'>Actions</th>
															</tr>
														</thead>
													</table>
												</div>
												<div className='table-content'>
													<table cellPadding='0' cellSpacing='0'>
														<tbody>{renderTableProduct(dataShow)}</tbody>
													</table>
												</div>
											</div>
										</Box>
										<div className='box-all-product'>
											{showBoxAllProducts ? (
												<>
													<Button onClick={() => setShowBoxAllProducts(false)}>
														<i className='fa-solid fa-minus'></i>
													</Button>
													<div className='all-products'>
														<ul className='list-products'>
															{products &&
																products.map((product) => {
																	return (
																		<li className='product-item' key={product._id}>
																			<div className='item-image'>
																				<img src={product.image} alt='' />
																			</div>
																			<div className='item-name'>
																				<Text noOfLines={1}>{product.name}</Text>
																			</div>
																			<div className='item-category'>
																				<Text noOfLines={1}>{product.category}</Text>
																			</div>
																			<div className='item-quantity'>
																				<Input defaultValue={product.quantity} onChange={(e) => handleChangeAddToOrder(e, product)} type='number' min={0} max={9999} />
																			</div>
																			<div className='item-price'>$ {product.price}</div>
																			<div className='item-action'>
																				<i className='fa-solid fa-plus' onClick={() => handleAddItemOrder(product)}></i>
																			</div>
																		</li>
																	)
																})}
														</ul>
													</div>
												</>
											) : (
												<Button onClick={() => setShowBoxAllProducts(true)}>
													<i className='fa-solid fa-plus'></i>
												</Button>
											)}
										</div>
										<FormLabel htmlFor='shippingPrice'>Shipping Price</FormLabel>
										<Input min={0} max={999999} defaultValue={0} type='number' id='shippingPrice' isInvalid={!!errors.shippingPrice} {...register('shippingPrice')} />
										<Text color='red'>{errors.shippingPrice && errors.shippingPrice.message}</Text>

										<FormLabel htmlFor='taxPrice'>Tax Price</FormLabel>
										<Input min={0} max={999999} defaultValue={0} type='number' id='taxPrice' isInvalid={!!errors.taxPrice} {...register('taxPrice')} />
										<Text color='red'>{errors.taxPrice && errors.taxPrice.message}</Text>

										<FormLabel htmlFor='totalPrice'>Total Items Price</FormLabel>
										<Input disabled type='number' id='totalPrice' isInvalid={!!errors.totalPrice} {...register('totalPrice')} />
										<Text color='red'>{errors.totalPrice && errors.totalPrice.message}</Text>
									</TabPanel>
									<TabPanel>
										<FormLabel htmlFor='fullName'>Full Name</FormLabel>
										<Input id='fullName' placeholder='Enter your fullName' isInvalid={!!errors.fullName} {...register('fullName')} />
										<Text color='red'>{errors.fullName && errors.fullName.message}</Text>
										<FormLabel htmlFor='address'>Address</FormLabel>
										<Input id='address' placeholder='Enter your address' isInvalid={!!errors.address} {...register('address')} />
										<Text color='red'>{errors.address && errors.address.message}</Text>

										<FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
										<Input id='postalCode' placeholder='Enter your Postal Code' isInvalid={!!errors.postalCode} {...register('postalCode')} />
										<Text color='red'>{errors.postalCode && errors.postalCode.message}</Text>

										<FormLabel htmlFor='note'>Note</FormLabel>
										<Textarea id='note' placeholder='Enter your note' isInvalid={!!errors.note} {...register('note')} />
										<Text color='red'>{errors.note && errors.note.message}</Text>
									</TabPanel>
									<TabPanel>
										<FormLabel htmlFor='Postal Code'>User Owner</FormLabel>
										<Select
											placeholder='Select option'
											disabled={showModal.type == typeEnum.Edit}
											value={userSelected}
											onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserSelected(e.target.value!)}
										>
											{listUsers &&
												listUsers.map((user, idx) => {
													return (
														<option onClick={() => setUserSelected(user._id)} value={user._id} key={idx}>
															{user.name} - {user.email}
														</option>
													)
												})}
										</Select>
										<FormLabel htmlFor='Postal Code'>Payment Method</FormLabel>
										<RadioGroup defaultValue='1' onChange={setPaymentMethod} value={paymentMethod}>
											<Stack spacing={5} direction='row'>
												<Radio value='1'>COD</Radio>
												<Radio value='2'>Paypal</Radio>
											</Stack>
										</RadioGroup>
										<FormLabel htmlFor='paid'>Paid</FormLabel>
										<RadioGroup defaultValue='1' onChange={setIsPaid} value={isPaid}>
											<Stack spacing={5} direction='row'>
												<Radio value='1'>Paid</Radio>
												<Radio value='2'>Not Paid</Radio>
											</Stack>
										</RadioGroup>
										<FormLabel htmlFor='delivery'>Delivery</FormLabel>
										<RadioGroup defaultValue='1' onChange={setIsDelivered} value={isDelivered}>
											<Stack spacing={5} direction='row'>
												<Radio value='1'>Delivered</Radio>
												<Radio value='2'>Not Delivered</Radio>
											</Stack>
										</RadioGroup>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</FormControl>
					</ModalBody>
					<ModalFooter w={{sm: widthModalForModal.sm, md: widthModalForModal.md, lg: widthModalForModal.lg, xl: widthModalForModal.xl}}>
						<Button mr={3} onClick={handleCloseModal}>
							Close
						</Button>
						<Button colorScheme='teal' loadingText='Submitting' isLoading={loading} type='submit'>
							Confirm
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
export default React.memo(ModalCustomer)
