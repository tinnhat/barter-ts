import { Button, Input, Text, Tooltip, Table, Thead, Tbody, Tr, Th, Td, Box, Image } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { typeEnum } from '../../../common/enum'
import { useDeleteProductMutation, useGetProductsQuery } from '../../../hooks/productHooks'
import { ApiError } from '../../../types/ApiError'
import { Product } from '../../../types/Product'
import { getError } from '../../../utils'
import LoadingCenter from '../../components/loadingCenter'
import ModalCustomer from './modalCreateAndEdit'
import ReactPaginate from 'react-paginate'

type Props = {}

type TypeModal = {
	show: boolean
	type: number
	product: Product
}

export default function Products({}: Props) {
	const {data, refetch, isLoading} = useGetProductsQuery()
	const {mutateAsync: deleteProduct} = useDeleteProductMutation()
	const searchRef = useRef<HTMLInputElement>(null)
	const [dataShow, setDataShow] = useState<Product[]>([])
	const [pageNumber, setPageNumber] = useState(0)

	const [showModal, setShowModal] = useState<TypeModal>({
		show: false,
		type: typeEnum.Add,
		product: {
			_id: '',
			name: '',
			slug: '',
			price: 0,
			description: '',
			image: '',
			category: '',
			categoryId: '',
			countInStock: 0,
		},
	})
	

	const handleOpen = () => {
		setShowModal({
			show: true,
			type: typeEnum.Add,
			product: {
				_id: '',
				name: '',
				slug: '',
				price: 0,
				description: '',
				image: '',
				category: '',
				categoryId: '',
				countInStock: 0,
			},
		})
	}
	const handleEdit = (product: Product) => {
		setShowModal({
			show: true,
			type: typeEnum.Edit,
			product: product,
		})
	}

	const handleRefetchData = () => {
		refetch()
	}
  useEffect(() => {
    setDataShow(data!)
  }, [data])
  

	const renderBody = (data: Product[]) => {
		return (
			data &&
			data.map((product: Product, idx: number) => (
				<Tr key={product._id} bg={idx % 2 === 0 ? 'white' : 'gray.50'}>
					<Td>
						<Image src={product.image} alt={product.name} boxSize='48px' objectFit='cover' />
					</Td>
					<Td>
						<Tooltip label={product.name}>
							<Text noOfLines={1}>{product.name}</Text>
						</Tooltip>
					</Td>
					<Td>
						<Tooltip label={product.category}>
							<Text noOfLines={1}>{product.category}</Text>
						</Tooltip>
					</Td>
					<Td>
						<Tooltip label={product.price}>
							<Text noOfLines={1}>$ {product.price}</Text>
						</Tooltip>
					</Td>
					<Td>{product.countInStock}</Td>
					<Td>
						<i className='fa-solid icon-edit fa-pen-to-square' onClick={() => handleEdit(product)}></i>
						<i className='fa-solid icon-delete fa-trash' onClick={() => handleDeleteProduct(product._id!)}></i>
					</Td>
				</Tr>
			))
		)
	}
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		if (newValue === '') {
			setDataShow(data!)
		}
	}
	const handleDeleteProduct = async (id: string) => {
		try {
			const result = await deleteProduct(id)
			if (result) {
				toast.success('Delete product successfully')
				refetch()
			}
		} catch (error) {
			toast.error(getError(error as ApiError))
		}
	}

	const handleSearchByName = () => {
		if (searchRef.current?.value) {
			const productArr: Product[] = []
			data?.forEach((item) => {
				if (item.name.toLowerCase().includes(searchRef.current?.value.toLowerCase()!)) {
					productArr.push(item)
				}
			})
			if (productArr.length > 0) {
				setDataShow(productArr)
			} else {
				toast.error('Product not found')
			}
		}
	}
  const CatePerPage = 10
	const pagesVisited = pageNumber * CatePerPage
	const productShow = dataShow && dataShow.slice(pagesVisited, pagesVisited + CatePerPage)
	const pageCount = dataShow && Math.ceil(dataShow.length / CatePerPage)
	const changePage = ({selected}: {selected: number}) => {
		setPageNumber(selected)
	}

	return (
		<>
			<div className='products'>
				<h1 className='title'>Products</h1>
				<div className='products-grp-button'>
					<Button onClick={handleOpen}>Add</Button>
					<div className='search-box'>
						<Input className='search-box__row' placeholder='Enter search name' type='text' onChange={handleChangeSearch} ref={searchRef} />
						<i className='fa-solid fa-magnifying-glass icon-search' onClick={handleSearchByName}></i>
					</div>
				</div>
				<Box className='products-table'>
					{isLoading ? (
						<Box className='center-table-loading'>
							<LoadingCenter />
						</Box>
					) : (
						<Table variant='simple' size='sm'>
							<Thead bg='gray.50'>
								<Tr>
									<Th>Picture</Th>
									<Th>Name</Th>
									<Th>Category</Th>
									<Th>Price</Th>
									<Th>Quantity</Th>
									<Th>Action</Th>
								</Tr>
							</Thead>
							<Tbody>{renderBody(productShow)}</Tbody>
						</Table>
					)}
				</Box>
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
				{showModal.show && <ModalCustomer showModal={showModal} setShowModal={setShowModal} handleRefectchData={handleRefetchData} />}
			</div>
		</>
	)
}
