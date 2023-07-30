import { Helmet } from 'react-helmet-async'
import SingleProduct from '../../components/Product'
import LoadingBox from '../../components/loadingBox'
import MessageBox from '../../components/messageBox'
import { useGetProductsQuery } from '../../hooks/productHooks'
import { ApiError } from '../../types/ApiError'
import { getError } from '../../utils'
import './style.scss'

export default function Shop() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <section className='shop'>
      {isLoading ? (
        <LoadingBox loadingProps={isLoading} />
      ) : error ? (
        <MessageBox status='error'>{getError(error as ApiError)}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>Shop</title>
          </Helmet>
          <div className='container'>
            <div className='shop-container'>
              <div className='search-column'>
                <p className='filter-title'>Filter & search</p>
                <div className='search-box'>
                  <input type='text' />
                  <i className='fa-solid fa-magnifying-glass'></i>
                </div>
                <p className='filter-title'>Categories</p>
                <ul className='categories-list'>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                  <li className='category-item'>
                    <input type='checkbox' name='' id='test' />
                    <label htmlFor='test'>test</label>
                  </li>
                </ul>
                <p className='filter-title'>Price</p>
                <div className='box-price'>
                  <input type='number' min={0} max={100000000} name='' id='' />
                  <span>-</span>
                  <input type='number' min={0} max={100000000} name='' id='' />
                  <button className='btn-price'>
                    <i className='fa-sharp fa-solid fa-caret-right'></i>
                  </button>
                </div>
              </div>
              <div className='list-product'>
                {products!.map(item => {
                  return <SingleProduct product={item} key={item.slug} />
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
