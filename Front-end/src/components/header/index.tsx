import {Button, Input, Text, Tooltip, useOutsideClick} from '@chakra-ui/react'
import React, {useContext, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import logo from '../../assets/img/logo.png'
import {CartItem} from '../../types/Cart'
import './style.scss'
type Props = {}

export default function Header({}: Props) {
	const navigate = useNavigate()
	const [showAccountInfo, setShowAccountInfo] = useState(false)
	const [showSearch, setShowSearch] = useState(false)
	const [showCart, setShowCart] = useState(false)
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
		console.log(keyWordSearch)
		setShowSearch(true)
	}
	return (
		<header className='header'>
			<div className='header-info-container'>
				<div className='container-lg'>
					<div className='header-box-info'>
						<div className='box-text'>
							<p className='header-box-info-text'>Free shipping on orders over $80</p>
							<p className='header-box-info-text'>sales@yourstorename.com</p>
						</div>
						<button className='btn-sub-save'>Subscribe & Save</button>
					</div>
				</div>
			</div>
			<div className='header-main-container'>
				<div className='container-lg'>
					<div className='header-main-box'>
						<div className='logo'>
							<a href='/' rel='noopener noreferrer'>
								<img src={logo} alt='' className='img-log' />
							</a>
						</div>
						<div className='header-search'>
							<Input type='text' name='' id='' className='header-search-input' onChange={(e) => setKeyWordSearch(e.target.value)} />
							<i className='fa-solid fa-magnifying-glass icon-search' onClick={handleSearch}></i>
							{showSearch && (
								<div className='review-search' ref={refSearch}>
									<ul className='list-product-search'>
										<li className='item'>
											<a href='' className='item-link'>
												<img src='https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg' alt='' />

												<Text className='item-name' noOfLines={2}>
													{'123123123131231312312123123123131231312312123123123131231312312123123123131231312312'}
												</Text>

												<p className='item-price'>$45</p>
											</a>
										</li>
										<li className='item'>
											<a href='' className='item-link'>
												<img src='https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg' alt='' />
												<Text className='item-name' noOfLines={2}>
													{'123123123131231312312123123123131231312312123123123131231312312123123123131231312312'}
												</Text>
												<p className='item-price'>$45</p>
											</a>
										</li>
										<li className='item'>
											<a href='' className='item-link'>
												<img src='https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg' alt='' />
												<Text className='item-name' noOfLines={2}>
													{'123123123131231312312123123123131231312312123123123131231312312123123123131231312312'}
												</Text>
												<p className='item-price'>$45</p>
											</a>
										</li>
										<li className='item'>
											<a href='' className='item-link'>
												<img src='https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg' alt='' />
												<Text className='item-name' noOfLines={2}>
													{'123123123131231312312123123123131231312312123123123131231312312123123123131231312312'}
												</Text>
												<p className='item-price'>$45</p>
											</a>
										</li>
									</ul>
								</div>
							)}
						</div>
						{/* search on mobile */}
						<div className='header-search-input-mobile'>
            <i className="fa-solid fa-magnifying-glass"></i>
						</div>
						<div className='header-user'>
							{!(JSON.stringify(userInfo) === '{}') ? (
								<div className='account' onClick={() => setShowAccountInfo((state) => !state)}>
									<i className='fa-regular fa-user'></i>
									<p className='title-account'>account</p>
									{showAccountInfo ? (
										<div className='account-sub' ref={refAccount}>
											<p className='account-item' onClick={() => navigate('/my-account')}>
												Profile
											</p>
											<p className='account-item' onClick={() => navigate('/signin?redirect=/order-history')}>
												My order
											</p>
											{userInfo?.isAdmin ? (
												<p className='account-item' onClick={() => (window.location.href = '/admin')}>
													Admin
												</p>
											) : null}
											<p className='account-item' onClick={handleSignOut}>
												Sign Out
											</p>
										</div>
									) : null}
								</div>
							) : (
								<Link className='account-link-header' to={'/signin'}>
									Login Now
								</Link>
							)}

							<div className='cart' onClick={() => setShowCart(true)}>
								<i className='fa-solid fa-cart-shopping'></i>
								{cartItems.length ? <p className='item-add-cart'>{cartItems.length}</p> : null}
								{showCart ? (
									<div className='cart-info' ref={ref}>
										<div className='close'>
											<i className='fa-solid fa-xmark' onClick={handleHideCart}></i>
										</div>
										{cartItems.length > 0 ? (
											<p className='cart-info__title'>Cart</p>
										) : (
											<a href='/shop' className='text-shopping'>
												Shopping now
											</a>
										)}

										<ul className='list-items'>
											{cartItems.map((item: CartItem) => {
												return (
													<li className='item' key={item._id}>
														<a href={`/product/${item.slug}`}>
															<img src={item.image} alt='' />
														</a>
														<div className='item-info'>
															<a href={`/product/${item.slug}`}>{item.name}</a>
															<p className='item-info__price'>
																<span>{item.quantity}</span>
																<i className='fa-solid fa-xmark'></i>
																<span>${item.price}</span>
															</p>
														</div>
														<div className='remove-item'>
															<i className='fa-solid fa-xmark' onClick={() => handleRemoveFromCart(item)}></i>
														</div>
													</li>
												)
											})}
										</ul>
										{cartItems.length > 0 ? (
											<>
												<div className='cart-info__price'>
													<p className='subtotal'>
														Subtotal:
														<span>${cartItems.reduce((acc: number, val: CartItem) => acc + val.price * val.quantity, 0)}</span>
													</p>
												</div>
												<Button className='btn-view-cart' onClick={(e) => handleNavigate(e, '/cart')}>
													View Cart
												</Button>
											</>
										) : null}
									</div>
								) : null}
							</div>
						</div>
						{/* menu on mobile */}
						<div className='header-menu-mobile'>
							<i className='fa-solid fa-bars'></i>
						</div>
					</div>
				</div>
			</div>
			<div className='header-navbar-container'>
				<div className='container-navbar'>
					<nav className='header-navbar'>
						<ul className='header-navbar-list'>
							<li className='header-navbar-item'>
								<a className='header-navbar-item__link' href='/'>
									Home
								</a>
							</li>
							<li className='header-navbar-item'>
								<a className='header-navbar-item__link' href='/shop'>
									Shop
								</a>
							</li>
							<li className='header-navbar-item'>
								<a className='header-navbar-item__link' href='/about'>
									About
								</a>
							</li>
							<li className='header-navbar-item'>
								<a className='header-navbar-item__link' href='/blog'>
									Blog
								</a>
							</li>
							<li className='header-navbar-item'>
								<a className='header-navbar-item__link' href='/contact'>
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
