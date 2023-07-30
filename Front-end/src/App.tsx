import {useContext, useEffect} from 'react'
import {Toaster} from 'react-hot-toast'
import {Outlet} from 'react-router-dom'
import {Store} from './Store'
import apiClient from './apiClient'
import Footer from './components/footer'
import Header from './components/header'
import {getDataFromLocalStorage} from './utils'

const userLocalStorage = getDataFromLocalStorage('userInfo')
function App() {
	const {dispatch} = useContext(Store)
	const checkTokenExpired = async () => {
		try {
			const result = await apiClient.post('api/users/me', {token: userLocalStorage.token})
			if (!result.data.hasOwnProperty('user') || result.data === 'Token expired') {
				dispatch({type: 'USER_SIGNOUT'})
				localStorage.clear()
				window.location.reload
			}
		} catch (error) {
			dispatch({type: 'USER_SIGNOUT'})
			localStorage.clear()
			window.location.reload
			throw error
		}
	}
	useEffect(() => {
		if (userLocalStorage) {
			checkTokenExpired()
		}
	}, [])

	return (
		<>
			<Toaster position='top-right' reverseOrder={false} />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default App
