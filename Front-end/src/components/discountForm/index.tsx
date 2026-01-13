import { Input } from '@chakra-ui/react'
import "./style.scss"

const DiscountForm = () => {
  return (
    <section className='bg-blue-600 text-white py-16'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='text-4xl font-bold mb-8'>Get Discount 30% off</h1>
        <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto'>
          <Input type='email' placeholder='Your Email' className='flex-1 px-4 py-2 rounded-lg text-black' />
          <button className='bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition'>
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

export default DiscountForm
