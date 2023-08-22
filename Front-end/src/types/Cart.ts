export type CartItem = {
  image: string|undefined
  slug: string
  category: string
  quantity: number
  countInStock: number
  price: number
  _id?: string
  name: string
}

export type ShippingAddress = {
  fullName: string
  address: string
  postalCode: string
  note?:string
  _id?: string
}
export type Cart = {
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  cartItems: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
}

