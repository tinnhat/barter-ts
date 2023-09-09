import {ChakraProvider} from '@chakra-ui/react'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {HelmetProvider} from 'react-helmet-async'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import App from './App.tsx'
import {StoreProvider} from './Store.tsx'
import './assets/style/_main.scss'
import {
	About,
	Account,
	AdminLayout,
	Blog,
	Cart,
	Contact,
	Customers,
	DashboardAdmin,
	Homepage,
	Login,
	NotFound,
	OrderHistory,
	OrderPage,
	Orders,
	Payment,
	PlaceOrder,
	PrivateRoute,
	ProductDetail,
	Products,
	Register,
	Shipping,
	Shop,
	SingleBlog,
	CategoryPage,
  ForgotPassword,
} from './pages'
import SpinnerLoading from './components/loadingSuspense/index.tsx'
import LoginAdmin from './admin/adminLayout/login/index.tsx'
import PrivateRouteAdmin from './admin/components/privateRoute/index.tsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='*' element={<App />}>
				<Route index={true} element={<Homepage />} />
				<Route path='product/:slug' element={<ProductDetail />} />
				<Route path='shop' element={<Shop />} />
				<Route path='cart' element={<Cart />} />
				<Route path='*' element={<NotFound />} />
				<Route path='contact' element={<Contact />} />
				<Route path='about' element={<About />} />
				<Route path='blog' element={<Blog />} />
				<Route path='signin' element={<Login />} />
				<Route path='signup' element={<Register />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='blog/:id' element={<SingleBlog />} />
				<Route path='' element={<PrivateRoute />}>
					<Route path='shipping' element={<Shipping />} />
					<Route path='payment' element={<Payment />} />
					<Route path='placeorder' element={<PlaceOrder />} />
					<Route path='order/:id' element={<OrderPage />} />
					<Route path='order-history' element={<OrderHistory />} />
					<Route path='my-account' element={<Account />} />
				</Route>
			</Route>
			<Route path='admin/signin' element={<LoginAdmin />} />
			<Route path='' element={<PrivateRouteAdmin />}>
				{/* <Route path='dashboard' element={<AdminLayout />} /> */}
				<Route path='admin' element={<AdminLayout />}>
					<Route index={true} element={<DashboardAdmin />} />
					<Route path='customers' element={<Customers />} />
					<Route path='products' element={<Products />} />
					<Route path='orders' element={<Orders />} />
					<Route path='category' element={<CategoryPage />} />
				</Route>
			</Route>
		</>
	)
)
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<StoreProvider>
				<PayPalScriptProvider options={{'client-id': 'sb'}} deferLoading={true}>
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<Suspense fallback={<SpinnerLoading />}>
								<RouterProvider router={router} />
							</Suspense>
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</HelmetProvider>
				</PayPalScriptProvider>
			</StoreProvider>
		</ChakraProvider>
	</React.StrictMode>
)
