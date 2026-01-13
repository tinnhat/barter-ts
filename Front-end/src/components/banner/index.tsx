import fastDelivery from "../../assets/img/fast-delivery.png"
import returnPolicy from "../../assets/img/return-policy.png"
import secure from "../../assets/img/secure-checkout.png"
import specicalDiscount from "../../assets/img/special-discount.png"
import "./style.scss"

type Props = {}

export default function Banner({}: Props) {
  return (
    <section className='bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <p className='text-lg mb-4'>Get ready for</p>
          <h1 className='text-5xl font-bold mb-6'>Stylish Bags</h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Vestibulum rutrum, ligula non faucibus fringilla, sem erat feugiat
            sapiena rhoncus.
          </p>
          <a href='/shop' className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition'>
            Buy Now
          </a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='text-center'>
            <img src={fastDelivery} alt='' className='mx-auto mb-4' />
            <p className='font-semibold'>Fast Delivery</p>
          </div>
          <div className='text-center'>
            <img src={specicalDiscount} alt='' className='mx-auto mb-4' />
            <p className='font-semibold'>Special Discount</p>
          </div>
          <div className='text-center'>
            <img src={secure} alt='' className='mx-auto mb-4' />
            <p className='font-semibold'>Secure Checkout</p>
          </div>
          <div className='text-center'>
            <img src={returnPolicy} alt='' className='mx-auto mb-4' />
            <p className='font-semibold'>30 days Returns Policy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
