import axios from 'axios'
import {getDataFromLocalStorage} from './utils'
import jwt_decode from 'jwt-decode'

const apiClient = axios.create({
	baseURL: 'https://barter-ts.onrender.com/',
	headers: {
		'Content-type': 'application/json',
	},
})

apiClient.interceptors.request.use(
	async (config) => {
		if (getDataFromLocalStorage('userInfo')) {
			config.headers.authorization = `Bearer ${getDataFromLocalStorage('userInfo').token}`
		}
		return config
	},
	(err) => Promise.reject(err)
)
apiClient.interceptors.response.use(
	async (config) => {
		const user = getDataFromLocalStorage('userInfo')
		if (user?.token) {
			let token = user.token
			let decodedToken: any = jwt_decode(token)
			let currentDate = new Date()
			// JWT exp is in seconds
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				localStorage.clear()
				// Assuming Store is available, but since it's axios interceptor, can't dispatch here easily.
				// Better to handle in components or remove this check.
				if (user.isAdmin) {
					window.location.href = '/admin/signin'
				} else {
					window.location.href = '/signin'
				}
			}
		}
		return config
	},
	(err) => Promise.reject(err)
)

export default apiClient
