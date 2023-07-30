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
      <section className='stylish'>
        <div className='container-lg'>
          <p className='sub-title'>New From True Brand</p>
          <h1 className='title'>Stylish black</h1>
          <p className='text'>
            Vestibulum rutrum, ligula non faucibus fringilla, sem erat feugiat
            sapiena rhoncus.
          </p>
          <p className='price'>$ 199.0</p>
          <a href="/shop" className='btn-shop'>Shop now</a>
        </div>
      </section>
      <section className='bestProduct'>
        <div className='container-lg'>
          <div className='bestProduct-container'>
            <div className='info'>
              <p className='tag'>Best Product</p>
              <h1 className='title'>How it works</h1>
              <ul className='list-info'>
                <li className='item-info'>
                  <img src={icon1} alt='' />
                  <div className='item-info-box'>
                    <p className='item-info-box__title'>Create Account</p>
                    <p className='item-info-box__detail'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='item-info'>
                  <img src={icon2} alt='' />
                  <div className='item-info-box'>
                    <p className='item-info-box__title'>Choose Design</p>
                    <p className='item-info-box__detail'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='item-info'>
                  <img src={icon3} alt='' />
                  <div className='item-info-box'>
                    <p className='item-info-box__title'>Add to Cart</p>
                    <p className='item-info-box__detail'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
                <li className='item-info'>
                  <img src={icon4} alt='' />
                  <div className='item-info-box'>
                    <p className='item-info-box__title'>Order and Payment</p>
                    <p className='item-info-box__detail'>
                      Vestibulum rutrum, ligula non fauc fringilla, sem erat
                      feugiat sapiena rhoncus.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className='img'>
              <img src={bkg} alt='' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
