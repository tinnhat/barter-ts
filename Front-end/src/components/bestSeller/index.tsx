import { useGetProductsQuery } from '../../hooks/productHooks'
import { Product } from '../../types/Product'
import productImg from "../../assets/img/product.jpg"

type Props = {}

export default function BestSeller({}: Props) {
  const { data: products } = useGetProductsQuery()
  const bestSellers = products?.slice(0, 3) || []

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Our Best Sellers</h1>
          <p className='text-gray-600'>Best Selling Products</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {bestSellers.map((product: Product) => (
            <a key={product._id} href={`/product/${product.slug}`} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group'>
              <div className='relative'>
                <img src={product.image || productImg} alt={product.name} className='w-full h-64 object-cover' />
                <button className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition'>
                  Add to cart
                </button>
              </div>
              <div className='p-4'>
                <p className='text-sm text-gray-500 mb-1'>{product.category}</p>
                <p className='font-semibold mb-2'>{product.name}</p>
                <p className='text-lg font-bold text-blue-600'>${product.price}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
