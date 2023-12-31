import {Button, Checkbox, Input, Text, Tooltip} from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'
import {toast} from 'react-hot-toast'
import {typeEnum} from '../../../common/enum'
import {useDeleteUserMutation, useGetAllUsersQuery} from '../../../hooks/userHooks'
import {ApiError} from '../../../types/ApiError'
import {UserInfo} from '../../../types/UserInfo'
import {getError} from '../../../utils'
import LoadingCenter from '../../components/loadingCenter'
import ModalCustomer from './modalCreateAndEdit'
import './style.scss'
import ReactPaginate from 'react-paginate'

type Props = {}

type TypeModal = {
	show: boolean
	type: number
	customer: UserInfo
}

export default function Customers({}: Props) {
	const {data, refetch, isLoading} = useGetAllUsersQuery()
	const {mutateAsync: deleteUser} = useDeleteUserMutation()
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<UserInfo[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [showModal, setShowModal] = useState<TypeModal>({
		show: false,
		type: typeEnum.Add,
		customer: {
			_id: '',
			email: '',
			name: '',
			phone: '',
			isAdmin: false,
			isDelete: false,
		},
	})

	const handleOpen = () => {
		setShowModal({
			show: true,
			type: typeEnum.Add,
			customer: {
				_id: '',
				email: '',
				name: '',
				phone: '',
				isAdmin: false,
			},
		})
	}
	const handleEdit = (user: UserInfo) => {
		setShowModal({
			show: true,
			type: typeEnum.Edit,
			customer: user,
		})
	}

	const handleRefetchData = () => {
		refetch()
	}

	const renderBody = (data: UserInfo[]) => {
		return (
			data &&
			data.map((user: UserInfo, idx: number) => {
				return (
					<tr className={`row-table ${idx % 2 === 0 ? 'row-even' : ''} ${user.isDelete ? 'user-deleted' : ''}`} key={user._id}>
						<td className='table-column__id'>
							<Tooltip label={user._id}>
								<Text noOfLines={1}>{user._id}</Text>
							</Tooltip>
						</td>
						<td className='table-column__email'>
							<Tooltip label={user.email}>
								<Text noOfLines={1}>{user.email}</Text>
							</Tooltip>
						</td>
						<td className='table-column__name'>
							<Tooltip label={user.name}>
								<Text noOfLines={1}>{user.name}</Text>
							</Tooltip>
						</td>
						<td className='table-column__phone'>
							<Tooltip label={user.phone}>
								<Text noOfLines={1}>{user.phone}</Text>
							</Tooltip>
						</td>
						<td className='table-column__role'>
							<Checkbox isChecked={user.isAdmin ? true : false} readOnly />
						</td>
						<td className='table-column__action'>
							{user.isDelete ? (
								<>
									<i className='fa-solid  fa-pen-to-square not-action'></i>
									<i className='fa-solid fa-trash not-action'></i>
								</>
							) : (
								<>
									<i className='fa-solid icon-edit fa-pen-to-square' onClick={() => handleEdit(user)}></i>
									<i className='fa-solid icon-delete fa-trash' onClick={() => handleDeleteUser(user._id)}></i>
								</>
							)}
						</td>
					</tr>
				)
			})
		)
	}
	const handleSearchByEmail = () => {
		if (searchRef.current?.value) {
			const userArr: UserInfo[] = []
			data?.forEach((user) => {
				if (user.email.toLocaleLowerCase().includes(searchRef.current?.value.toLocaleLowerCase()!)) {
					userArr.push(user)
				}
			})
			if (userArr.length > 0) {
				setDataShow(userArr)
			} else {
				toast.error('User not found')
			}
		}
	}
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (newValue === '') {
			setDataShow(data!)
		}
	}
	const handleDeleteUser = async (id: string) => {
		try {
			const result = await deleteUser(id)
			if (result) {
				toast.success('Delete user successfully')
				refetch()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		}
	}
	useEffect(() => {
		setDataShow(data!)
	}, [data])
	const customerPerPage = 10
	const pagesVisited = pageNumber * customerPerPage
	const userShow = dataShow && dataShow.slice(pagesVisited, pagesVisited + customerPerPage)
	const pageCount = dataShow && Math.ceil(dataShow.length / customerPerPage)
	const changePage = ({selected}: {selected: number}) => {
		setPageNumber(selected)
	}
	return (
		<>
			<div className='customers'>
				<h1 className='title'>Customers</h1>
				<div className='customers-grp-button'>
					<Button onClick={handleOpen}>Add</Button>
					<div className='search-box'>
						<Input className='search-box__row' placeholder='Enter search email' type='text' onChange={handleChangeSearch} ref={searchRef} />
						<i className='fa-solid fa-magnifying-glass icon-search' onClick={handleSearchByEmail}></i>
					</div>
				</div>
				<div className='customers-table'>
					<div className='table-header'>
						<table cellPadding='0' cellSpacing='0'>
							<thead>
								<tr>
									<th className='table-column__id'>ID</th>
									<th className='table-column__email'>Email</th>
									<th className='table-column__name'>Name</th>
									<th className='table-column__phone'>Phone</th>
									<th className='table-column__role'>Admin</th>
									<th className='table-column__action'>Action</th>
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
									renderBody(userShow)
								)}
							</tbody>
						</table>
					</div>
					<ReactPaginate
						previousLabel={<i className='fa-solid fa-chevron-left'></i>}
						nextLabel={<i className='fa-solid fa-chevron-right'></i>}
						pageCount={pageCount}
						onPageChange={changePage}
						containerClassName='paginationBttns'
						previousLinkClassName='previousBttns'
						nextLinkClassName='nextBttn'
						disabledClassName='nextBttn'
						activeClassName='paginationActive'
					/>
				</div>
				{showModal.show && <ModalCustomer showModal={showModal} setShowModal={setShowModal} handleRefectchData={handleRefetchData} />}
			</div>
		</>
	)
}
