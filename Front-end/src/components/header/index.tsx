import { Button, Input, Text, useOutsideClick } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import logo from '../../assets/img/logo.png'
import { useGetProductsQuery } from '../../hooks/productHooks'
import { CartItem } from '../../types/Cart'
type Props = {}

export default function Header({}: Props) {
	const navigate = useNavigate()
	const {data: allProduct} = useGetProductsQuery()
	const [showAccountInfo, setShowAccountInfo] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [showCart, setShowCart] = useState(false)
	const [productSearchShow, setProductSearchShow] = useState<any[]>([])
	const [keyWordSearch, setKeyWordSearch] = useState('')
	const ref: any = useRef()
	const refAccount: any = useRef()
	const refSearch: any = useRef()
	const {state, dispatch} = useContext(Store)
	const {
		cart: {cartItems},
		userInfo,
	} = state
	const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
		e.stopPropagation()
		setShowCart(false)
		navigate(url)
	}
	const handleHideCart = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setShowCart(false)
	}
	const handleSignOut = () => {
		dispatch({type: 'USER_SIGNOUT'})
		localStorage.clear()
		window.location.href = '/signin'
	}
	useOutsideClick({
		ref: ref,
		handler: () => setShowCart(false),
	})
	useOutsideClick({
		ref: refAccount,
		handler: () => setShowAccountInfo(false),
	})
	useOutsideClick({
		ref: refSearch,
		handler: () => setShowSearch(false),
	})
	const handleRemoveFromCart = (item: CartItem) => {
		dispatch({type: 'CART_REMOVE_ITEM', payload: item})
	}
	const handleSearch = () => {
		if (keyWordSearch) {
			const productsFind: any[] = []
			allProduct?.forEach((product) => {
				if (product.name.toLowerCase().includes(keyWordSearch.toLowerCase())) {
					productsFind.push(product)
				}
			})
			if (productsFind.length > 0) {
				setProductSearchShow(productsFind)
			}
		} else {
			setProductSearchShow([])
		}
		setShowSearch(true)
	}
	const handleClickNavigate = (link: string) => {
		navigate(link)
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}
	return (
		<header className='sticky top-0 z-50 bg-white shadow-md'>
			<div className='bg-gray-800 text-white py-2'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					<div className='flex space-x-4'>
						<p>Free shipping on orders over $80</p>
						<p>sales@yourstorename.com</p>
					</div>
					<button className='bg-black text-white px-4 py-2 hover:bg-gray-700 transition'>Subscribe & Save</button>
				</div>
			</div>
			<div className='bg-white py-4'>
				<div className='container mx-auto px-4 flex justify-between items-center'>
					<div className='flex items-center space-x-8'>
						<div className='w-48'>
							<a href='/'>
								<img src={logo} alt='Logo' className='w-full' />
							</a>
						</div>
						<div className='relative flex-1 max-w-md'>
							<Input
								type='text'
								placeholder='Search products...'
								className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
								onChange={(e) => setKeyWordSearch(e.target.value)}
							/>
							<i className='fa-solid fa-magnifying-glass absolute right-3 top-3 text-gray-400 cursor-pointer' onClick={handleSearch}></i>
							{showSearch && (
								<div className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10' ref={refSearch}>
									<ul className='p-2'>
										{productSearchShow.length > 0 ? (
											productSearchShow.map((product) => (
												<li key={product._id} className='p-2 hover:bg-gray-100'>
													<a href={`/product/${product.slug}`} className='flex items-center space-x-3'>
														<img src={product.image} alt='' className='w-12 h-12 object-cover' />
														<div>
															<Text className='text-sm font-medium' noOfLines={2}>
																{product.name}
															</Text>
															<p className='text-sm text-gray-600'>${product.price}</p>
														</div>
													</a>
												</li>
											))
										) : (
											<div className='p-2 text-gray-500'>No product found</div>
										)}
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						{userInfo?.token ? (
							<div className='relative'>
								<div className='flex items-center space-x-2 cursor-pointer' onClick={() => setShowAccountInfo((state) => !state)}>
									<i className='fa-regular fa-user'></i>
									<p>Account</p>
								</div>
								{showAccountInfo && (
									<div className='absolute top-full right-0 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-10' ref={refAccount}>
										<p className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => handleClickNavigate('/my-account')}>
											Profile
										</p>
										<p className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => handleClickNavigate('/order-history')}>
											My order
										</p>
										{userInfo?.isAdmin && (
											<p className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => (window.location.href = '/admin')}>
												Admin
											</p>
										)}
										<p className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleSignOut}>
											Sign Out
										</p>
									</div>
								)}
							</div>
						) : (
							<Link to='/signin' className='text-blue-600 hover:underline'>
								Login Now
							</Link>
						)}
						<div className='relative'>
							<div className='flex items-center space-x-2 cursor-pointer' onClick={() => setShowCart(true)}>
								<i className='fa-solid fa-cart-shopping'></i>
								{cartItems.length > 0 && <span className='bg-red-500 text-white text-xs rounded-full px-2 py-1'>{cartItems.length}</span>}
							</div>
							{showCart && (
								<div className='absolute top-full right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 z-10' ref={ref}>
									<div className='flex justify-between items-center mb-4'>
										<h3 className='font-semibold'>Cart</h3>
										<i className='fa-solid fa-xmark cursor-pointer' onClick={handleHideCart}></i>
									</div>
									{cartItems.length > 0 ? (
										<>
											<ul className='space-y-2 mb-4'>
												{cartItems.map((item: CartItem) => (
													<li key={item._id} className='flex items-center space-x-3'>
														<a href={`/product/${item.slug}`}>
															<img src={item.image} alt='' className='w-12 h-12 object-cover' />
														</a>
														<div className='flex-1'>
															<a href={`/product/${item.slug}`} className='text-sm font-medium'>
																{item.name}
															</a>
															<p className='text-sm text-gray-600'>
																{item.quantity} x ${item.price}
															</p>
														</div>
														<i className='fa-solid fa-xmark cursor-pointer text-red-500' onClick={() => handleRemoveFromCart(item)}></i>
													</li>
												))}
											</ul>
											<div className='border-t pt-4'>
												<p className='font-semibold'>
													Subtotal: ${cartItems.reduce((acc: number, val: CartItem) => acc + val.price * val.quantity, 0)}
												</p>
												<Button className='w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700' onClick={(e) => handleNavigate(e, '/cart')}>
													View Cart
												</Button>
											</div>
										</>
									) : (
										<a href='/shop' className='text-blue-600 hover:underline'>
											Shop now
										</a>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='bg-gray-100 py-2'>
				<div className='container mx-auto px-4'>
					<nav>
						<ul className='flex space-x-8'>
							<li>
								<a href='/' className='text-gray-700 hover:text-blue-600 font-medium'>
									Home
								</a>
							</li>
							<li>
								<a href='/shop' className='text-gray-700 hover:text-blue-600 font-medium'>
									Shop
								</a>
							</li>
							<li>
								<a href='/about' className='text-gray-700 hover:text-blue-600 font-medium'>
									About
								</a>
							</li>
							<li>
								<a href='/blog' className='text-gray-700 hover:text-blue-600 font-medium'>
									Blog
								</a>
							</li>
							<li>
								<a href='/contact' className='text-gray-700 hover:text-blue-600 font-medium'>
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
