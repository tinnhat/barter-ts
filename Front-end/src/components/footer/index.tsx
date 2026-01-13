import logoFooter from "../../assets/img/barter-footer-logo.png"
import "./style.scss"
const Footer = () => {
  return (
    <>
      <div className='bg-gray-100 py-8'>
        <div className='container mx-auto px-4 text-center'>
          <a href='#'>
            <img src={logoFooter} alt='Logo' className='mx-auto' />
          </a>
        </div>
      </div>
      <footer className='bg-gray-800 text-white py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h2 className='text-lg font-semibold mb-4'>Contact Info</h2>
              <p className='mb-2'>Street 238,52 tempor Donec ultricies mattis nulla.</p>
              <p className='mb-2'>Phone: +1 234 567 890</p>
              <p className='mb-2'>Fax: +1 234 567 890</p>
              <p className='mb-2'>Email: info@example.com</p>
            </div>
            <div>
              <h2 className='text-lg font-semibold mb-4'>My Account</h2>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  My Account
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Login
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Cart
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Checkout
                </li>
              </ul>
            </div>
            <div>
              <h2 className='text-lg font-semibold mb-4'>Information</h2>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  About Us
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Careers
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Privacy Policy
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Delivery Information
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Terms & Condition
                </li>
              </ul>
            </div>
            <div>
              <h2 className='text-lg font-semibold mb-4'>Customer Services</h2>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Shipping Policy
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Return Policy
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Refunds & Compensation
                </li>
                <li className='flex items-center'>
                  <i className='fa-solid fa-chevron-right mr-2'></i>
                  Guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className='bg-gray-900 text-white py-4 text-center'>
        <p>Copyright &copy; 2023 By NT99</p>
      </div>
    </>
  )
}

export default Footer
