import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSigninAdminMutation } from '../../../hooks/userHooks'
import { ApiError } from '../../../types/ApiError'
import { getDataFromLocalStorage, getError, saveDataFromLocalStorage } from '../../../utils'
import './style.scss'
type Props = {}
interface IFormInputs {
	email: string
	password: string
}
export default function LoginAdmin({}: Props) {
	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm<IFormInputs>()
	const userInfo = getDataFromLocalStorage('userInfo')
	const navigate = useNavigate()
	const {mutateAsync: signin} = useSigninAdminMutation()

	const onSubmit = async (values: IFormInputs) => {
		try {
			const result = await signin(values)
			if (result) {
				saveDataFromLocalStorage('userInfo', result)
				navigate('/admin')
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		}
	}
	useEffect(() => {
		if (userInfo?.token && userInfo.isAdmin) {
			navigate('/admin')
		}
	}, [userInfo])
	return (
		<>
			<main className='admin-login'>
				<div className='admin-login-container'>
					<div className='box-login'>
						<h1 className='box-login__title'>Login</h1>
						<form className='login-form' onSubmit={handleSubmit(onSubmit)}>
							<FormControl>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<Input
									id='email'
									placeholder='Enter your email'
									isInvalid={!!errors.email}
									{...register('email', {
										required: 'Email is required',
									})}
								/>
								<Text color='red'>{errors.email && errors.email.message}</Text>
								<FormLabel mt={3} htmlFor='password'>
									Password
								</FormLabel>
								<Input
									type='password'
									id='password'
									placeholder='Enter your password'
									isInvalid={!!errors.password}
									{...register('password', {
										required: 'Password is required',
									})}
								/>
								<Text color='red'>{errors.password && errors.password.message}</Text>
								<Button mt={4} className='btn-admin-login' type='submit'>
									Login
								</Button>
							</FormControl>
						</form>
					</div>
				</div>
			</main>
			<Toaster position='bottom-right' reverseOrder={false} />
		</>
	)
}
