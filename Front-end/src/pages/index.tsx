import PrivateRoute from '../components/privateRoute'
import AdminLayout from '../admin/adminLayout'
import {lazy} from 'react'

const Homepage = lazy(() => import('./home'))
const Blog = lazy(() => import('./blog'))
const SingleBlog = lazy(() => import('../components/singleBlog'))
const NotFound = lazy(() => import('./404'))
const About = lazy(() => import('./about'))
const Account = lazy(() => import('./account'))
const Cart = lazy(() => import('./cart'))
const Contact = lazy(() => import('./contact'))
const Login = lazy(() => import('./login'))
const OrderHistory = lazy(() => import('./orderHistory'))
const OrderPage = lazy(() => import('./orderPage'))
const Payment = lazy(() => import('./payment'))
const PlaceOrder = lazy(() => import('./placeOrder'))
const ProductDetail = lazy(() => import('./product'))
const Register = lazy(() => import('./register'))
const Shipping = lazy(() => import('./shipping'))
const Shop = lazy(() => import('./shop'))
const DashboardAdmin = lazy(() => import('../admin/adminLayout/dashboard'))
const Customers = lazy(() => import('../admin/adminLayout/customer'))
const Products = lazy(() => import('../admin/adminLayout/product'))
const Orders = lazy(() => import('../admin/adminLayout/order'))
const CategoryPage = lazy(() => import('../admin/adminLayout/category'))

export {
	PrivateRoute,
	SingleBlog,
	NotFound,
	About,
	Account,
	Blog,
	Cart,
	Contact,
	Homepage,
	Login,
	OrderHistory,
	OrderPage,
	Payment,
	PlaceOrder,
	ProductDetail,
	Register,
	Shipping,
	Shop,
	DashboardAdmin,
	AdminLayout,
	Customers,
	Products,
	Orders,
  CategoryPage
}
