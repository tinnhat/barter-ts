import { Button, Checkbox, Input, Text, Tooltip } from '@chakra-ui/react'
import moment from 'moment'
import { useRef, useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { typeEnum } from '../../../common/enum'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../hooks/orderHooks'
import { ApiError } from '../../../types/ApiError'
import { Order } from '../../../types/Order'
import { getError } from '../../../utils'
import LoadingCenter from '../../components/loadingCenter'
import ModalCustomer from './modalCreateAndEdit'
import './style.scss'
import ReactPaginate from 'react-paginate'

type Props = {}

type TypeModal = {
	show: boolean
	type: number
	order: Order
}

export default function Orders({}: Props) {
	const {data, refetch, isLoading} = useGetAllOrdersQuery()
	const {mutateAsync: deleteOrder} = useDeleteOrderMutation()
	
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<Order[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [showModal, setShowModal] = useState<TypeModal>({
		show: false,
		type: typeEnum.Add,
		order: {
			_id: '',
			orderItems: [],
			shippingAddress: {
				fullName: '',
				address: '',
				postalCode: '',
				note: '',
				_id: '64b39a1be90845d6c8eb712b',
			},
			paymentMethod: '',
			user: '',
			createdAt: '',
			isPaid: false,
			paidAt: '',
			isDelivered: false,
			itemsPrice: 0,
			shippingPrice: 0,
			taxPrice: 0,
			totalPrice: 0,
		},
	})

	const handleOpen = () => {
		setShowModal({
			show: true,
			type: typeEnum.Add,
			order: {
				_id: '',
				orderItems: [],
				shippingAddress: {
					fullName: '',
					address: '',
					postalCode: '',
					note: '',
					_id: '64b39a1be90845d6c8eb712b',
				},
				paymentMethod: '',
				user: '',
				createdAt: '',
				isPaid: false,
				paidAt: '',
				isDelivered: false,
				itemsPrice: 0,
				shippingPrice: 0,
				taxPrice: 0,
				totalPrice: 0,
			},
		})
	}
	const handleEdit = (order: Order) => {
		setShowModal({
			show: true,
			type: typeEnum.Edit,
			order: order,
		})
	}

	const renderBody = (data: Order[]) => {
		return (
			data &&
			data.map((order: Order, idx: number) => {
				return (
					<tr className={`row-table ${idx % 2 === 0 ? 'row-even' : ''}`} key={order._id}>
						<td className='table-column__orderId'>
							<Tooltip label={order._id}>
								<Text noOfLines={1}>{order._id}</Text>
							</Tooltip>
						</td>
						<td className='table-column__ownerId'>
							<Tooltip label={order.user + ''}>
								<Text noOfLines={1}>{order.user + ''}</Text>
							</Tooltip>
						</td>
						<td className='table-column__method'>
							<Tooltip label={order.paymentMethod}>
								<Text noOfLines={1}>{order.paymentMethod}</Text>
							</Tooltip>
						</td>
						<td className='table-column__total'>
							<Tooltip label={order.totalPrice}>
								<Text noOfLines={1}>$ {order.totalPrice}</Text>
							</Tooltip>
						</td>
						<td className='table-column__paid'>
							<Checkbox isChecked={order.isPaid ? true : false} readOnly />
						</td>
						<td className='table-column__createAt'>
							<Tooltip label={moment(order.createdAt).format('MM-DD-YYYY')}>
								<Text noOfLines={1}>{moment(order.createdAt).format('MM-DD-YYYY')} </Text>
							</Tooltip>
						</td>

						<td className='table-column__action'>
							<>
								<i className='fa-solid fa-pen-to-square' onClick={() => handleEdit(order)}></i>
								<i className='fa-solid fa-trash' onClick={() => handleDeleteOrder(order._id!)}></i>
							</>
						</td>
					</tr>
				)
			})
		)
	}
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (newValue === '') {
			setDataShow(data!)
		}
	}

	const handleDeleteOrder = async (id: string) => {
		try {
			const result = await deleteOrder(id)
			if (result) {
				toast.success('Delete Order successfully')
			}
			refetch()
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		}
	}

	const handleSearchById = () => {
		if (searchRef.current?.value) {
			const ordersArr: Order[] = []
			data?.forEach((item) => {
				if (item._id!.includes(searchRef.current?.value!)) {
					ordersArr.push(item)
				}
			})
			if (ordersArr.length > 0) {
				setDataShow(ordersArr)
			} else {
				toast.error('Order not found')
			}
		}
	}
  useEffect(() => {
    setDataShow(data!)
  }, [data])
  const CatePerPage = 10
	const pagesVisited = pageNumber * CatePerPage
	const orderShow = dataShow && dataShow.slice(pagesVisited, pagesVisited + CatePerPage)
	const pageCount = dataShow && Math.ceil(dataShow.length / CatePerPage)
	const changePage = ({selected}: {selected: number}) => {
		setPageNumber(selected)
	}
	return (
		<>
			<div className='orders'>
				<h1 className='title'>Orders</h1>
				<div className='orders-grp-button'>
					<Button onClick={handleOpen}>Add</Button>
					<div className='search-box'>
						<Input className='search-box__row' placeholder='Enter Order Id or User Id' type='text' onChange={handleChangeSearch} ref={searchRef} />
						<i className='fa-solid fa-magnifying-glass icon-search' onClick={handleSearchById}></i>
					</div>
				</div>
				<div className='orders-table'>
					<div className='table-header'>
						<table cellPadding='0' cellSpacing='0'>
							<thead>
								<tr>
									<th className='table-column__orderId'>Order Id</th>
									<th className='table-column__ownerId'>Owner Id</th>
									<th className='table-column__method'>Payment</th>
									<th className='table-column__total'>Total Price</th>
									<th className='table-column__paid'>Paid</th>
									<th className='table-column__createAt'>Create Date</th>
									<th className='table-column__action'>Actions</th>
								</tr>
							</thead>
						</table>
					</div>
					<div className='table-content'>
						<table cellPadding='0' cellSpacing='0'>
							<tbody>
								{isLoading ? (
									<div className='center-table-loading'>
										<LoadingCenter />
									</div>
								) : (
									renderBody(orderShow)
								)}
							</tbody>
						</table>
					</div>
          <ReactPaginate
							previousLabel={<i className="fa-solid fa-chevron-left"></i>}
							nextLabel={<i className="fa-solid fa-chevron-right"></i>}
							pageCount={pageCount}
							onPageChange={changePage}
							containerClassName='paginationBttns'
							previousLinkClassName='previousBttns'
							nextLinkClassName='nextBttn'
							disabledClassName='nextBttn'
							activeClassName='paginationActive'
						/>
				</div>
				{showModal.show && <ModalCustomer showModal={showModal} setShowModal={setShowModal} handleRefetchData={refetch} />}
			</div>
		</>
	)
}
