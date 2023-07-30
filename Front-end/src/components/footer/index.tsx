import logoFooter from "../../assets/img/barter-footer-logo.png"
import "./style.scss"
const Footer = () => {
  return (
    <>
      <div className='bags'>
        <a href='#'>
          <img src={logoFooter} alt='' />
        </a>
      </div>
      <footer className='footer'>
        <div className='container-lg'>
          <ul className='footer-container'>
            <li className='footer-column'>
              <h2 className='footer-title'>Contact Info</h2>
              <p className='footer-text'>
                Street 238,52 tempor Donec ultricies mattis nulla.
              </p>
              <p className='footer-text'>Phone: +1 234 567 890</p>
              <p className='footer-text'>Fax: +1 234 567 890</p>
              <p className='footer-text'>Email: info@example.com</p>
            </li>
            <li className='footer-column'>
              <h2 className='footer-title'>My Account</h2>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                My Account
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Login
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Cart
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Checkout
              </p>
            </li>
            <li className='footer-column'>
              <h2 className='footer-title'>Information</h2>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                About Us
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Careers
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Privacy Policy
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Delivery Information
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Terms & Condition
              </p>
            </li>
            <li className='footer-column'>
              <h2 className='footer-title'>Customer Services</h2>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Shipping Policy
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Return Policy
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Refunds & Compensation
              </p>
              <p className='footer-item'>
                <span>
                  <i className='fa-solid fa-chevron-right'></i>
                </span>
                Guarantee
              </p>
            </li>
          </ul>
        </div>
      </footer>
      <div className='copyright'>
        <p>Copyright &copy; 2023 By NT99</p>
      </div>
    </>
  )
}

export default Footer
