import {useContext, useEffect} from 'react'
import {Toaster} from 'react-hot-toast'
import {Outlet} from 'react-router-dom'
import {Store} from '../../Store.js'
import apiClient from '../../apiClient.js'
import {getDataFromLocalStorage} from '../../utils.js'
import '../assets/boxicons-2.0.7/css/boxicons.min.css'
import '../assets/css/_index.scss'
import Sidebar from '../components/sidebar/index.js'
import Topnav from '../components/topnav/index.js'
type Props = {}

const userInfo = getDataFromLocalStorage('userInfo')

export default function AdminLayout({}: Props) {
	//not use when implement for admin
	// const {dispatch} = useContext(Store)
	// const checkTokenExpired = async () => {
	// 	try {
	// 		const result = await apiClient.post('api/users/me', {token: userInfo.token})
  //     console.log(result);
      
	// 		if (!result.data.hasOwnProperty('user') || result.data === 'Token expired') {
	// 			dispatch({type: 'USER_SIGNOUT'})
	// 			localStorage.clear()
	// 			window.location.reload
	// 		}
	// 	} catch (error) {
  //     console.log(error);

	// 		dispatch({type: 'USER_SIGNOUT'})
	// 		localStorage.clear()
	// 		window.location.reload
	// 		throw error
	// 	}
	// }
	// useEffect(() => {
	// 	if (userInfo) {
	// 		checkTokenExpired()
	// 	}
	// }, [])
	return (
		<>
			<div className={`layout`}>
				<Sidebar />
				<div className='layout__content'>
					<Topnav />
					<div className='layout__content-main'>
						<Outlet />
					</div>
				</div>
			</div>
			<p className='information-showDashboard'>Admin Dashboard only use in Desktop</p>
			<Toaster position='bottom-right' reverseOrder={false} />
		</>
	)
}
