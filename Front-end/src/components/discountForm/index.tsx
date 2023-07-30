import { Input } from '@chakra-ui/react'
import "./style.scss"

const DiscountForm = () => {
  return (
    <>
      <section className='discountForm'>
        <div className='discountForm-container'>
          <h1 className='title'>Get Discount 30% off</h1>
          <div className='box-discount'>
            <Input type='email' name='' id='' placeholder='Your Email' className='input-discount' />
            <button className='btn-subscribe'>Subscribe</button>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default DiscountForm
