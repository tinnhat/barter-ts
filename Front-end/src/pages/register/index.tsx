import React, {useContext, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import {useSignupMutation} from '../../hooks/userHooks'
import './style.scss'
import {getError, saveDataFromLocalStorage} from '../../utils'
import {ApiError} from '../../types/ApiError'
import {Helmet} from 'react-helmet-async'
import {Button, Input} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
type Props = {}

export default function Register({}: Props) {
	const {state, dispatch} = useContext(Store)
	const {userInfo} = state
	const {mutateAsync: signup} = useSignupMutation()
	const navigate = useNavigate()
	const {search} = useLocation()
	const redirectInUrl = new URLSearchParams(search).get('redirect')
	const redirect = redirectInUrl ?? '/'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
			return
		}
		try {
			const data = await signup({
				name,
				email,
				phone,
				password,
			})
			dispatch({type: 'USER_SIGNIN', payload: data})
			saveDataFromLocalStorage('userInfo', data)
			navigate(redirect)
		} catch (error) {
			toast.error(getError(error as ApiError))
		}
	}

	useEffect(() => {
		if (userInfo?.token) {
			navigate(redirect)
		}
	}, [userInfo, redirect])

	return (
		<>
			<Helmet>
				<title>Sign Up</title>
			</Helmet>
			<section className='login'>
				<div className='container'>
					<div className='register-container'>
						<form onSubmit={handleSubmit}>
							<p className='title'>Register</p>
							<label htmlFor='name' className='label-input'>
								Name
							</label>
							<Input type='text' name='' id='name' onChange={(e) => setName(e.target.value)} />
							<label htmlFor='email' className='label-input'>
								Email
							</label>
							<Input type='email' name='' id='email' onChange={(e) => setEmail(e.target.value)} />
							<label htmlFor='phone' className='label-input'>
								Phone Number
							</label>
							<Input type='text' name='' id='phone' onChange={(e) => setPhone(e.target.value)} />
							<label htmlFor='password' className='label-input'>
								Password
							</label>
							<Input type='password' name='' id='password' onChange={(e) => setPassword(e.target.value)} />
							<label htmlFor='confirmPass' className='label-input'>
								Re-Password
							</label>
							<Input type='password' name='' id='confirmPass' onChange={(e) => setConfirmPassword(e.target.value)} />
							<Button type='submit' className='btn-login'>
								Register
							</Button>
							<p className='link-create'>
								Already have an account
								<span onClick={() => navigate(`/signin?redirect=${redirect}`)}>Sign in now</span>
							</p>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}
