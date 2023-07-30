import fastDelivery from "../../assets/img/fast-delivery.png"
import returnPolicy from "../../assets/img/return-policy.png"
import secure from "../../assets/img/secure-checkout.png"
import specicalDiscount from "../../assets/img/special-discount.png"
import "./style.scss"

type Props = {}

export default function Banner({}: Props) {
  return (
    <section className='banner'>
      <div className='container-lg'>
        <div className='banner-container'>
          <p className='banner-sub-title'>Get ready for</p>
          <h1 className='banner-title'>Stylish Bags</h1>
          <p className='banner-text'>
            Vestibulum rutrum, ligula non faucibus fringilla, sem erat feugiat
            sapiena rhoncus.
          </p>
          <a href="/shop" className='btn-buy-now'>Buy Now</a>
        </div>
      </div>
      <div className='banner-sub'>
        <div className='banner-sub__box'>
          <img src={fastDelivery} alt='' />
          <p className='banner-sub__title'>Fast Delivery</p>
        </div>
        <div className='banner-sub__box'>
          <img src={specicalDiscount} alt='' />
          <p className='banner-sub__title'>Special Discount</p>
        </div>
        <div className='banner-sub__box'>
          <img src={secure} alt='' />
          <p className='banner-sub__title'>Secure Checkout</p>
        </div>
        <div className='banner-sub__box'>
          <img src={returnPolicy} alt='' />
          <p className='banner-sub__title'>30 days Returns Policy</p>
        </div>
      </div>
    </section>
  )
}
