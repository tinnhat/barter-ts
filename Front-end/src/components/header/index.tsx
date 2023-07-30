import { Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import logo from '../../assets/img/logo.png'
import { CartItem } from '../../types/Cart'
import './style.scss'
type Props = {}

export default function Header({}: Props) {
  const navigate = useNavigate()
  const [showAccountInfo, setShowAccountInfo] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
    userInfo
  } = state
  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation()
    setShowCart(false)
    navigate(url)
  }
  const handleHideCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowCart(false)
  }
  const handleSignOut = () => {
    dispatch({type: "USER_SIGNOUT"})
    localStorage.clear()
    window.location.href = '/signin'
  }
  return (
    <header className='header'>
      <div className='header-info-container'>
        <div className='container-lg'>
          <div className='header-box-info'>
            <div className='box-text'>
              <p className='header-box-info-text'>
                Free shipping on orders over $80
              </p>
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
              <Input
                type='text'
                name=''
                id=''
                className='header-search-input'
              />
              <i className='fa-solid fa-magnifying-glass icon-search'></i>
            </div>
            {/* search on mobile */}
            <div className='header-search-input-mobile'>
              <i className='fa-solid fa-magnifying-glass icon-search'></i>
            </div>
            <div className='header-user'>
              {!(JSON.stringify(userInfo) === '{}') ? <div
                className='account'
                onClick={() => setShowAccountInfo(state => !state)}
              >
                <i className='fa-regular fa-user'></i>
                <p className='title-account'>account</p>
                {showAccountInfo ? (
                  <div className='account-sub'>
                    <p className='account-item' onClick={() => navigate('/my-account')}>Profile</p>
                    <p className='account-item' onClick={() => navigate('/signin?redirect=/order-history')}>My order</p>
                    <p className='account-item' onClick={handleSignOut}>Sign Out</p>
                  </div>
                ) : null}
              </div> : <Link className='account-link-header' to={'/signin'}>Login Now</Link>}
              
              <div className='cart' onClick={() => setShowCart(true)}>
                <i className='fa-solid fa-cart-shopping'></i>
                {cartItems.length ? (
                  <p className='item-add-cart'>{cartItems.length}</p>
                ) : null}
                {showCart ? (
                  <div className='cart-info'>
                    <div className='close'>
                      <i
                        className='fa-solid fa-xmark'
                        onClick={handleHideCart}
                      ></i>
                    </div>
                    <p className='cart-info__title'>Cart</p>
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
                              <i className='fa-solid fa-xmark'></i>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                    <div className='cart-info__price'>
                      <p className='subtotal'>
                        Subtotal:
                        <span>
                          $
                          {cartItems.reduce(
                            (acc: number, val: CartItem) =>
                              acc + val.price * val.quantity,
                            0
                          )}
                        </span>
                      </p>
                    </div>
                    <button
                      className='btn-view-cart'
                      onClick={e => handleNavigate(e, '/cart')}
                    >
                      View Cart
                    </button>
                    <button className='btn-check-out'>Checkout</button>
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
                <Link className='header-navbar-item__link' to='/'>
                  Home
                </Link>
              </li>
              <li className='header-navbar-item'>
                <Link className='header-navbar-item__link' to='/shop'>
                  Shop
                </Link>
              </li>
              <li className='header-navbar-item'>
                <Link className='header-navbar-item__link' to='/about'>
                  About
                </Link>
              </li>
              <li className='header-navbar-item'>
                <Link className='header-navbar-item__link' to='/blog'>
                  Blog
                </Link>
              </li>
              <li className='header-navbar-item'>
                <Link className='header-navbar-item__link' to='/contact'>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
