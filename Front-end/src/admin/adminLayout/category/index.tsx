import { Button, Checkbox, Input, Text, Tooltip } from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { typeEnum } from '../../../common/enum'
import Pagination from '../../../components/pagination'
import { useDeleteCategoryMutation, useGetAllCategory } from '../../../hooks/categoryHooks'
import { ApiError } from '../../../types/ApiError'
import { Category } from '../../../types/Category'
import { getError } from '../../../utils'
import ModalCategory from './modalCreateAndEdit'
import './style.scss'

type TypeModal = {
	show: boolean
	type: number
	category: Category
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

export default function CategoryPage() {
	const {data, refetch} = useGetAllCategory()
	const {mutateAsync: deleteCategory} = useDeleteCategoryMutation()
	const [currentPage, setCurrentPage] = useState(1)
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<Category[]>([])
	const [showModal, setShowModal] = useState<TypeModal>({
		show: false,
		type: typeEnum.Add,
		category: {
			_id: '',
			name: '',
			isUse: false,
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
			category: {
				_id: '',
				name: '',
				isUse: false,
			},
		})
	}
	const handleEdit = (category: Category) => {
		setShowModal({
			show: true,
			type: typeEnum.Edit,
			category,
		})
	}

	const handleRefetchData = () => {
		refetch()
	}

	const renderBody = (data: Category[]) => {
		return (
			data &&
			data.map((category: Category, idx: number) => {
				return (
					<tr className={`row-table ${idx % 2 === 0 ? 'row-even' : ''} ${category.isUse ? 'category-disabled' : ''}`} key={category._id}>
						<td className='table-column__id'>
							<Tooltip label={category._id}>
								<Text noOfLines={1}>{category._id}</Text>
							</Tooltip>
						</td>
						<td className='table-column__name'>
							<Tooltip label={category.name}>
								<Text noOfLines={1}>{category.name}</Text>
							</Tooltip>
						</td>
						<td className='table-column__use'>
							<Checkbox isChecked={category.isUse ? true : false} readOnly />
						</td>
						<td className='table-column__action'>
							<i className='fa-solid icon-edit fa-pen-to-square' onClick={() => handleEdit(category)}></i>
							<i className='fa-solid icon-delete fa-trash' onClick={() => handleDeleteCategory(category._id)}></i>
						</td>
					</tr>
				)
			})
		)
	}
	const handleSearchByName = () => {
		if (searchRef.current?.value) {
			const categoryArr: Category[] = []
			data?.forEach((category) => {
				if (category.name.includes(searchRef.current?.value!)) { 
					categoryArr.push(category)
				}
			}) 
			if (categoryArr.length > 0) {
				setDataShow(categoryArr)
			} else {
				toast.error('Category not found')
			}
		}
	}
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (newValue === '') {
			setDataShow(currentTableData!)
		}
	}
	const handleDeleteCategory = async (id: string) => {
		try {
			const result = await deleteCategory(id)
			if (result) {
				toast.success('Delete category successfully')
				refetch()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		}
	}

	return (
		<>
			<div className='category'>
				<h1 className='title'>Categories</h1>
				<div className='category-grp-button'>
					<Button onClick={handleOpen}>Add</Button>
					<div className='search-box'>
						<Input className='search-box__row' placeholder='Enter search by name' type='text' onChange={handleChangeSearch} ref={searchRef} />
						<i className='fa-solid fa-magnifying-glass icon-search' onClick={handleSearchByName}></i>
					</div>
				</div>
				<div className='category-table'>
					<div className='table-header'>
						<table cellPadding='0' cellSpacing='0'>
							<thead>
								<tr>
									<th className='table-column__id'>ID</th>
									<th className='table-column__name'>Name</th>
									<th className='table-column__use'>In Use</th>
									<th className='table-column__action'>Action</th>
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
				{showModal.show && <ModalCategory showModal={showModal} setShowModal={setShowModal} handleRefetchData={handleRefetchData} />}
			</div>
		</>
	)
}
