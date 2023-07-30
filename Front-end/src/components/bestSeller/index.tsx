import productImg from "../../assets/img/product.jpg"
import "./style.scss"
type Props = {}

export default function BestSeller({}: Props) {
  return (
    <section className='bestSeller'>
      <div className='container'>
        <div className='container-bestSeller'>
          <h1 className='title'>Our Best Sellers</h1>
          <p className='sub-title'>Best Selling Products</p>
          <div className='product-list'>
            <a href="" className='product-box'>
              <div className="box-img-add-cart">
                <img src={productImg} alt="" />
                <button className="btn-add">Add to cart</button>
              </div>
              <p className="product-tag">Double Pouch</p>
              <p className="product-name">Leathery Bee</p>
              <p className="product-price">$65.00</p>
            </a>
            <a href="" className='product-box'>
              <div className="box-img-add-cart">
                <img src={productImg} alt="" />
                <button className="btn-add">Add to cart</button>
              </div>
              <p className="product-tag">Leather Bag</p>
              <p className="product-name">Silky Brown</p>
              <p className="product-price">$99.00</p>
            </a>
            <a href="" className='product-box'>
              <div className="box-img-add-cart">
                <img src={productImg} alt="" />
                <button className="btn-add">Add to cart</button>
              </div>
              <p className="product-tag">Parties</p>
              <p className="product-name">Black Gold</p>
              <p className="product-price">$123.00</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
