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
