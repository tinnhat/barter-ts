import { Button, Checkbox, Input, Text, Tooltip } from '@chakra-ui/react'
import moment from 'moment'
import { useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { typeEnum } from '../../../common/enum'
import Pagination from '../../../components/pagination'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../hooks/orderHooks'
import { Order } from '../../../types/Order'
import ModalCustomer from './modalCreateAndEdit'
import './style.scss'
import { getError } from '../../../utils'
import { ApiError } from '../../../types/ApiError'

type Props = {}

type TypeModal = {
	show: boolean
	type: number
	order: Order
}

const sortByAlphabetical = (data: any, key: string) => {
	const newDataSort = [...data]
	newDataSort.sort(function (a: any, b: any) {
		if (a[key] < b[key]) {
			return -1
		}
		if (a[key] > b[key]) {
			return 1
		}
		return 0
	})
	return newDataSort
}
let PageSize = 10

export default function Orders({}: Props) {
	const {data, refetch} = useGetAllOrdersQuery()
	const {mutateAsync: deleteOrder} = useDeleteOrderMutation()
	const [currentPage, setCurrentPage] = useState(1)
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<Order[]>([])
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

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		if (data) {
			const dataInTable = data.slice(firstPageIndex, lastPageIndex)
			const dataAfterSort = sortByAlphabetical(dataInTable, 'name')
			dataAfterSort.sort((x) => (x.isDelete ? 1 : -1))
			setDataShow(dataAfterSort)
			return dataAfterSort
		}
		return []
	}, [currentPage, data])

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

	const handleRefetchData = () => {
		refetch()
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
							<Checkbox defaultChecked={order.isPaid ? true : false} readOnly />
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
			setDataShow(currentTableData!)
		}
	}
	const handleDeleteOrder = async (id: string) => {
		try {
      const result = await deleteOrder(id)
      if(result){
        toast.success("Delete Order successfully")
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
									<th className='table-column__method'>Payment method</th>
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
							<tbody>{renderBody(dataShow)}</tbody>
						</table>
					</div>
					<div className='table__pagination'>
						<Pagination siblingCount={1} currentPage={currentPage} totalCount={data ? data.length : 0} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
					</div>
				</div>
				{showModal.show && <ModalCustomer showModal={showModal} setShowModal={setShowModal} handleRefectchData={handleRefetchData} />}
			</div>
		</>
	)
}
