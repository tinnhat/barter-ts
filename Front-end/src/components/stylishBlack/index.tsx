import icon1 from "../../assets/img/process-icon1.png"
import icon2 from "../../assets/img/process-icon2.png"
import icon3 from "../../assets/img/process-icon3.png"
import icon4 from "../../assets/img/process-icon4.png"
import bkg from "../../assets/img/section6-img.png"
import "./style.scss"


type Props = {}

export default function StylishBlack({}: Props) {
  return (
    <>
      <section className='bg-black text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-lg mb-4'>New From True Brand</p>
          <h1 className='text-5xl font-bold mb-6'>Stylish black</h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Vestibulum rutrum, ligula non faucibus fringilla, sem erat feugiat
            sapiena rhoncus.
          </p>
          <p className='text-3xl font-bold mb-8'>$ 199.0</p>
          <a href='/shop' className='bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition'>
            Shop now
          </a>
        </div>
      </section>
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <p className='text-blue-600 font-semibold mb-4'>Best Product</p>
              <h1 className='text-4xl font-bold mb-8'>How it works</h1>
              <ul className='space-y-6'>
                <li className='flex items-start space-x-4'>
                  <img src={icon1} alt='' className='w-12 h-12' />
                  <div>
                    <p className='font-semibold mb-2'>Create Account</p>
                    <p className='text-gray-600'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='flex items-start space-x-4'>
                  <img src={icon2} alt='' className='w-12 h-12' />
                  <div>
                    <p className='font-semibold mb-2'>Choose Design</p>
                    <p className='text-gray-600'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='flex items-start space-x-4'>
                  <img src={icon3} alt='' className='w-12 h-12' />
                  <div>
                    <p className='font-semibold mb-2'>Add to Cart</p>
                    <p className='text-gray-600'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='flex items-start space-x-4'>
                  <img src={icon4} alt='' className='w-12 h-12' />
                  <div>
                    <p className='font-semibold mb-2'>Order and Payment</p>
                    <p className='text-gray-600'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img src={bkg} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
