export type Product = {
  _id?: string
  name: string
  slug: string
  price: number
  description: string
  image: string
  category: string
  countInStock: number
  quantity?:number
}
