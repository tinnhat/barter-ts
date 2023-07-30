import { useEffect, useState } from 'react'
import Banner from '../../components/banner'
import BestSeller from '../../components/bestSeller'
import DiscountForm from '../../components/discountForm'
import StylishBlack from '../../components/stylishBlack'


export default function Homepage({}) {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const position = window.scrollY
        setScrollPosition(position)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <Banner />
      <BestSeller />
      <StylishBlack />
      <DiscountForm />
      {scrollPosition > 500 ? (
        <button onClick={() => window.scrollTo(0, 0)} className='scrollTop'>
          <i className='fa-sharp fa-solid fa-arrow-up'></i>
        </button>
      ) : null}
    </>
  )
}
