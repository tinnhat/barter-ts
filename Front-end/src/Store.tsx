import React from 'react'
import { Cart, CartItem, ShippingAddress } from './types/Cart'
import { UserInfo } from './types/UserInfo'
import { getDataFromLocalStorage, saveDataFromLocalStorage } from './utils'

type AppState = {
  cart: Cart
  userInfo?: UserInfo
}

const initialState: AppState = {
  cart: {
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    cartItems: getDataFromLocalStorage('cartItems') ?? [],
    shippingAddress: getDataFromLocalStorage('shippingAddress') ?? {},
    paymentMethod: getDataFromLocalStorage('paymentMethod') ?? 'Paypal',
  },
  userInfo: getDataFromLocalStorage('userInfo') ?? {},
}

type Action =
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: 'CART_CLEAR' }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      saveDataFromLocalStorage('cartItems', cartItems)
      return { ...state, cart: { ...state.cart, cartItems } }
    case 'CART_REMOVE_ITEM':
      const newCartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      )
      saveDataFromLocalStorage('cartItems', newCartItems)
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return {
        cart: {
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
          cartItems: [],
          shippingAddress: {
            fullName: '',
            address: '',
            note: '',
            postalCode: '',
          },
          paymentMethod: 'Paypal',
        },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }
    default:
      return state
  }
}
const defaultDispatch: React.Dispatch<Action> = () => initialState
const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }

