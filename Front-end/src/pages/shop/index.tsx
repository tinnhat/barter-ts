import {Button, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack} from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import SingleProduct from '../../components/Product'
import LoadingBox from '../../components/loadingBox'
import MessageBox from '../../components/messageBox'
import {useGetAllCategory} from '../../hooks/categoryHooks'
import {useGetProductsQuery} from '../../hooks/productHooks'
import {ApiError} from '../../types/ApiError'
import {Product} from '../../types/Product'
import {getError} from '../../utils'
import './style.scss'
import ReactPaginate from 'react-paginate'

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
	const [dataShow, setDataShow] = useState<Product[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [rangePrice, setRangePrice] = useState([0, 999])
	const searchRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (categories) {
			setShowCate(categories.map((item) => ({...item, checked: false})))
		}
	}, [categories])
	useEffect(() => {
		setDataShow(products!)
	}, [products])

	const handleApplyFilter = () => {
		const productFilter: Product[] = []
		let searchKey = ''
		if (searchRef.current) {
			searchKey = searchRef.current.value
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
		changePage({selected: 0})
		setDataShow(productFilter)
	}
	const handleResetFilter = () => {
		setRangePrice([0, 999])
		setShowCate(showCate?.map((item) => ({...item, checked: false})))
		if (searchRef.current) {
			searchRef.current.value = ''
		}
		setDataShow(products!)
	}

	const handleChangeCategory = (e: any, item: CateShow) => {
		const idx = showCate?.findIndex((val) => val._id === item._id)
		if (idx !== -1) {
			const cloneShowCate = JSON.parse(JSON.stringify(showCate))
			cloneShowCate[idx!].checked = e.target.checked
			setShowCate(cloneShowCate)
		}
	}
	const productPerPage = 12
	const pagesVisited = pageNumber * productPerPage
	const productShow =
		dataShow &&
		dataShow.slice(pagesVisited, pagesVisited + productPerPage).map((item) => {
			return <SingleProduct product={item} key={item._id} />
		})
	const pageCount = dataShow && Math.ceil(dataShow.length / productPerPage)
	const changePage = ({selected}: {selected: number}) => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
		setPageNumber(selected)
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
							<div className='list-product'>{productShow}</div>
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
				</>
			)}
		</section>
	)
}
