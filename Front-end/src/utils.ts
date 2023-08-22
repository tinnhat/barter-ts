import { ApiError } from './types/ApiError'
import { CartItem } from './types/Cart'
import { Product } from './types/Product'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const getDataFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key)!)
}

export const saveDataFromLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    category: product.category,
    countInStock: product.countInStock,
    slug: product.slug,
    image: product.image,
    quantity: 1,
    price: product.price,
  }
  return cartItem
}
