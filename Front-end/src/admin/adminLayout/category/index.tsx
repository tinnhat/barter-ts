import { Button, Checkbox, Input, Text, Tooltip } from '@chakra-ui/react'
import { useRef, useState,useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { typeEnum } from '../../../common/enum'
import { useDeleteCategoryMutation, useGetAllCategory } from '../../../hooks/categoryHooks'
import { ApiError } from '../../../types/ApiError'
import { Category } from '../../../types/Category'
import { getError } from '../../../utils'
import LoadingCenter from '../../components/loadingCenter'
import ModalCategory from './modalCreateAndEdit'
import './style.scss'
import ReactPaginate from 'react-paginate'

type TypeModal = {
	show: boolean
	type: number
	category: Category
}

export default function CategoryPage() {
	const {data, refetch, isLoading} = useGetAllCategory()
	const {mutateAsync: deleteCategory} = useDeleteCategoryMutation()
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<Category[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [showModal, setShowModal] = useState<TypeModal>({
		show: false,
		type: typeEnum.Add,
		category: {
			_id: '',
			name: '',
			isUse: false,
		},
	})

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
							<i className='fa-solid icon-delete fa-trash' onClick={() => handleDeleteCategory(category._id!)}></i>
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
				if (category.name.toLowerCase().includes(searchRef.current?.value.toLowerCase()!)) {
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
			setDataShow(data!)
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
	useEffect(() => {
		setDataShow(data!)
	}, [data])
  const CatePerPage = 10
	const pagesVisited = pageNumber * CatePerPage
	const cateShow = dataShow && dataShow.slice(pagesVisited, pagesVisited + CatePerPage)
	const pageCount = dataShow && Math.ceil(dataShow.length / CatePerPage)
	const changePage = ({selected}: {selected: number}) => {
		setPageNumber(selected)
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
							<tbody>
								{isLoading ? (
									<div className='center-table-loading'>
										<LoadingCenter />
									</div>
								) : (
									renderBody(cateShow)
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
				{showModal.show && <ModalCategory showModal={showModal} setShowModal={setShowModal} handleRefetchData={handleRefetchData} />}
			</div>
		</>
	)
}
