import React, {useContext, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import {useSignupMutation} from '../../hooks/userHooks'
import {useForm} from 'react-hook-form'
import './style.scss'
import {getError, saveDataFromLocalStorage} from '../../utils'
import {ApiError} from '../../types/ApiError'
import {Helmet} from 'react-helmet-async'
import {Button, FormLabel, Input, Text} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
import {REGEX_PHONE} from '../../common/enum'
type Props = {}

interface IFormInputs {
	name: string
	email: string
	phone: string
	password: string
	rePassword: string
}

export default function Register({}: Props) {
	const {state, dispatch} = useContext(Store)
	const {userInfo} = state
	const {mutateAsync: signup} = useSignupMutation()
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm<IFormInputs>()
	const navigate = useNavigate()
	const {search} = useLocation()
	const redirectInUrl = new URLSearchParams(search).get('redirect')
	const redirect = redirectInUrl ?? '/'
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const onSubmit = async (values: IFormInputs) => {
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
			<section className='register'>
				<div className='container'>
					<div className='register-container'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<p className='title'>Register</p>
							<FormLabel htmlFor='name' className='label-input'>
								Name
							</FormLabel>
							<Input
								id='name'
								placeholder='Enter your name'
								isInvalid={!!errors.name}
								{...register('name', {
									required: 'Name is required',
								})}
								onChange={(e) => setName(e.target.value)}
							/>
							<Text color='red'>{errors.name && errors.name.message}</Text>
							<FormLabel mt={3} htmlFor='name' className='label-input'>
								Email
							</FormLabel>
							<Input
								id='email'
								placeholder='Enter your email'
								isInvalid={!!errors.email}
								{...register('email', {
									required: 'Email is required',
								})}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Text color='red'>{errors.email && errors.email.message}</Text>

							<FormLabel mt={3} htmlFor='name' className='label-input'>
								Phone Number
							</FormLabel>
							<Input type='tel' id='phone' placeholder='Enter your phone' isInvalid={!!errors.phone} {...register('phone')} onChange={(e) => setPhone(e.target.value)} />
							<Text color='red'>{errors.phone && errors.phone.message}</Text>

							<FormLabel mt={3} htmlFor='name' className='label-input'>
								Password
							</FormLabel>
							<Input
								className='input-form'
								type='password'
								id='password'
								isInvalid={!!errors.password}
								placeholder='Enter your password'
								{...register('password', {required: 'Password is required'})}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Text color='red'>{errors.password && errors.password.message}</Text>
							<FormLabel mt={3} htmlFor='name' className='label-input'>
								Re-Password
							</FormLabel>
							<Input
								className='input-form'
								type='password'
								id='rePassword'
								isInvalid={!!errors.rePassword}
								placeholder='Enter your rePassword'
								{...register('rePassword', {required: 'Re-Password is required'})}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Text color='red'>{errors.rePassword && errors.rePassword.message}</Text>
							<Button mt={3} w={'100%'} type='submit' className='btn-login'>
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
