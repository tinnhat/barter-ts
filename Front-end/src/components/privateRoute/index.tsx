import {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {Store} from '../../Store'

type Props = {}

export default function PrivateRoute({}: Props) {
	const { state } = useContext(Store)
	const { userInfo } = state

	if (userInfo && Object.keys(userInfo).length > 0) {
		return <Outlet />
	} else {
		return <Navigate to="/signin" />
	}
}
