import {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {getDataFromLocalStorage} from '../../../utils'

type Props = {}

export default function PrivateRouteAdmin({}: Props) {
	const userInfo = getDataFromLocalStorage('userInfo')
	if (userInfo && userInfo.isAdmin) {
		return <Outlet />
	} else {
		return <Navigate to='/admin/signin' />
	}
}
