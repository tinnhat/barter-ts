import {Helmet} from 'react-helmet-async'
import SingleProduct from '../../components/Product'
import LoadingBox from '../../components/loadingBox'
import MessageBox from '../../components/messageBox'
import {useGetProductsQuery} from '../../hooks/productHooks'
import {ApiError} from '../../types/ApiError'
import {getError} from '../../utils'
import './style.scss'
import {useMemo, useState, useEffect, useRef} from 'react'
import {PAGE_SIZE_SHOP} from '../../common/enum'
import {Product} from '../../types/Product'
import Pagination from '../../components/pagination'
import {Button, Input} from '@chakra-ui/react'
import {useGetAllCategory} from '../../hooks/categoryHooks'
import {Category} from '../../types/Category'
import {RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb} from '@chakra-ui/react'
type FilterType = {
	name: string
	categories: string[]
	price: number[]
}
type CateShow = {
	_id?: string
	name: string
	isUse: boolean
	checked?: boolean
}
export default function Shop() {
	const {data: products, isLoading, error} = useGetProductsQuery()
	const {data: categories} = useGetAllCategory()
	const [showCate, setShowCate] = useState<CateShow[]>()
	const [currentPage, setCurrentPage] = useState(1)
	const [dataShow, setDataShow] = useState<Product[]>([])
	const [rangePrice, setRangePrice] = useState([0, 999])
	const currentDataShow = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE_SHOP
		const lastPageIndex = firstPageIndex + PAGE_SIZE_SHOP
		if (products) {
			const dataInTable = products.slice(firstPageIndex, lastPageIndex)
			setDataShow(dataInTable)
			return dataInTable
		}
		return []
	}, [currentPage, products])
	const searchRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (categories) {
			setShowCate(categories.map((item) => ({...item, checked: false})))
		}
	}, [categories])

	const handleApplyFilter = () => {
		const productFilter: Product[] = []
		let searchKey = ''
		if (searchRef.current) {
			searchKey = searchRef.current.value
		}
    if(!searchKey){
      return;
    }
		products?.forEach((product) => {
			if (product.name.includes(searchKey)) {
				const categoryFilter = showCate?.filter((val) => val.checked)
				if (categoryFilter?.length === 0) {
					if (product.price <= rangePrice[1] && product.price >= rangePrice[0]) {
						productFilter.push(product)
					}
				} else {
					categoryFilter?.forEach((val) => {
						if (product.category === val.name) {
							productFilter.push(product)
						}
					})
				}
			}
		})
		setDataShow(productFilter)
	}
	const handleResetFilter = () => {
		if (searchRef.current) {
			searchRef.current.value = ''
		}
		setRangePrice([0, 999])
		setShowCate(showCate?.map((item) => ({...item, checked: false})))
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE_SHOP
		const lastPageIndex = firstPageIndex + PAGE_SIZE_SHOP
		if (products) {
			const dataInTable = products.slice(firstPageIndex, lastPageIndex)
			setDataShow(dataInTable)
		}
	}

	const handleChangeCategory = (e: any, item: CateShow) => {
		const idx = showCate?.findIndex((val) => val._id === item._id)
		if (idx !== -1) {
			const cloneShowCate = JSON.parse(JSON.stringify(showCate))
			cloneShowCate[idx!].checked = e.target.checked
			setShowCate(cloneShowCate)
		}
	}

	return (
		<section className='shop'>
			{isLoading ? (
				<LoadingBox loadingProps={isLoading} />
			) : error ? (
				<MessageBox status='error'>{getError(error as ApiError)}</MessageBox>
			) : (
				<>
					<Helmet>
						<title>Shop</title>
					</Helmet>
					<div className='container'>
						<div className='shop-container'>
							<div className='search-column'>
								<p className='filter-title'>Filter & search</p>
								<div className='search-box'>
									<Input type='text' ref={searchRef} />
									<i className='fa-solid fa-magnifying-glass'></i>
								</div>
								<p className='filter-title'>Categories</p>
								<ul className='categories-list'>
									{showCate &&
										showCate.map((item) => (
											<li className='category-item' key={item._id}>
												<input type='checkbox' checked={item.checked} value={item.name} id={item._id} onChange={(e) => handleChangeCategory(e, item)} />
												<label htmlFor={item._id}>{item.name}</label>
											</li>
										))}
								</ul>
								<p className='filter-title'>Price</p>
								<div className='box-price'>
									<p className='price-range'>
										From: ${rangePrice && rangePrice[0]} - To: ${rangePrice && rangePrice[1]}
									</p>
									<RangeSlider step={2} aria-label={['min', 'max']} value={rangePrice} onChange={(val: any) => setRangePrice(val)}>
										<RangeSliderTrack>
											<RangeSliderFilledTrack />
										</RangeSliderTrack>
										<RangeSliderThumb index={0} />
										<RangeSliderThumb index={1} />
									</RangeSlider>
								</div>
								<div className='grp-btn-actions'>
									<Button className='btn-reset-filter' onClick={handleApplyFilter}>
										Apply Filter
									</Button>
									<Button className='btn-reset-filter' onClick={handleResetFilter}>
										Reset Filter
									</Button>
								</div>
							</div>
							<div className='list-product'>
								{dataShow &&
									dataShow.map((item) => {
										return <SingleProduct product={item} key={item._id} />
									})}
							</div>
						</div>
						<div className='table__pagination'>
							<Pagination siblingCount={1} currentPage={currentPage} totalCount={products ? products.length : 0} pageSize={PAGE_SIZE_SHOP} onPageChange={(page) => setCurrentPage(page)} />
						</div>
					</div>
				</>
			)}
		</section>
	)
}
