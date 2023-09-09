import React, {useState, useContext, useEffect} from 'react'
import './style.scss'
import {useLocation, useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import {getError, saveDataFromLocalStorage} from '../../utils'
import {ApiError} from '../../types/ApiError'
import {useSigninMutation} from '../../hooks/userHooks'
import {Button, Input} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
type Props = {}

export default function Login({}: Props) {
	const {state, dispatch} = useContext(Store)
	const {userInfo} = state
	const {mutateAsync: signin, isLoading} = useSigninMutation()
	const navigate = useNavigate()
	const {search} = useLocation()
	const redirectInUrl = new URLSearchParams(search).get('redirect')
	const redirect = redirectInUrl ?? '/'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			const data = await signin({
				email,
				password,
			})
			if (data) {
			}
			dispatch({type: 'USER_SIGNIN', payload: data})
			saveDataFromLocalStorage('userInfo', data)
			navigate(redirect)
		} catch (err: unknown) {
			toast.error(getError(err as ApiError))
		}
	}

	useEffect(() => {
		if (userInfo?.token) {
			navigate(redirect)
		}
	}, [userInfo, redirect])

	return (
		<section className='login'>
			<div className='container'>
				<div className='login-container'>
					<form action='' onSubmit={handleSubmit}>
						<p className='title'>Sign In</p>
						<p className='label-input'>Email</p>
						<Input required type='email' name='' id='' onChange={(e) => setEmail(e.target.value)} />
						<p className='label-input'>Password</p>
						<Input className='input-password' required type='password' name='' id='' onChange={(e) => setPassword(e.target.value)} />
            <p className='link-forgot'>
							<span onClick={() => navigate('/forgot-password')}>Forgot your password</span>
						</p>
						<Button type='submit' className='btn-login' disabled={isLoading}>
							Sign In
						</Button>
						<p className='link-create'>
							New customer?
							<span onClick={() => navigate('/signup')}>Create your account</span>
						</p>
					</form>
				</div>
			</div>
		</section>
	)
}
