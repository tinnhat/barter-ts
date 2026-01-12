import { Button, FormControl, FormLabel, Input, Text, Box, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useSigninAdminMutation } from '../../../hooks/userHooks'
import { ApiError } from '../../../types/ApiError'
import { getDataFromLocalStorage, getError, saveDataFromLocalStorage } from '../../../utils'
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
			<Box minH="100vh" display="grid" placeItems="center" bg="gray.50">
				<Box bg="white" p={8} rounded="md" boxShadow="sm" w={{ base: '90%', md: '420px' }}>
					<Heading size="lg" mb={4}>Admin Login</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<Input
								id="email"
								placeholder="Enter your email"
								isInvalid={!!errors.email}
								{...register('email', { required: 'Email is required' })}
							/>
							<Text color="red">{errors.email && errors.email.message}</Text>
							<FormLabel mt={3} htmlFor="password">Password</FormLabel>
							<Input
								type="password"
								id="password"
								placeholder="Enter your password"
								isInvalid={!!errors.password}
								{...register('password', { required: 'Password is required' })}
							/>
							<Text color="red">{errors.password && errors.password.message}</Text>
							<Button mt={4} width="full" type="submit">Login</Button>
						</FormControl>
					</form>
				</Box>
			</Box>
			<Toaster position="bottom-right" reverseOrder={false} />
		</>
	)
}
