import {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {Store} from '../../Store'

type Props = {}

export default function PrivateRoute({}: Props) {
	const {state: userInfo} = useContext(Store)

	if (JSON.stringify(userInfo.userInfo) !== '{}') {
		return <Outlet />
	} else {
		return <Navigate to='/signin' />
	}
}
