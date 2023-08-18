import axios from 'axios'
import {getDataFromLocalStorage} from './utils'
import jwt_decode from 'jwt-decode'

const apiClient = axios.create({
	baseURL: 'http://localhost:4000/',
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
		if (user) {
			let token = user.token
			let decodedToken: any = jwt_decode(token)
			let currentDate = new Date()
			// JWT exp is in seconds
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				alert('Token is Expire, Please login and try again')
				localStorage.clear()
        //check current location to redirect ?
        const currentLocation = window.location.href
        alert(currentLocation)
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
