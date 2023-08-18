import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from '@chakra-ui/react'
import {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {Store} from '../../Store'
import {REGEX_PASSWORD, REGEX_PHONE} from '../../common/enum'
import {useUpdateInforMutation} from '../../hooks/userHooks'
import {getDataFromLocalStorage} from '../../utils'
import './style.scss'
type Props = {}

interface IFormInputs {
	email: string
	name: string
	phone: string
	password: string
	rePassword: string
}

export default function Account({}: Props) {
	const userInfo = getDataFromLocalStorage('userInfo')
	const {dispatch} = useContext(Store)
	const {mutateAsync: updateInfo, isLoading} = useUpdateInforMutation()
	const [showModalSuccess, setShowModalSuccess] = useState(false)
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm<IFormInputs>()
	const onSubmit = async (values: IFormInputs) => {
		if (values.password) {
			if (REGEX_PASSWORD.test(values.password)) {
				if (values.rePassword === values.password) {
					const payload = {
						_id: userInfo._id,
						name: values.name,
						phone: values.phone,
						password: values.password,
					}
					try {
						const result = await updateInfo(payload)
						if (result) {
							setShowModalSuccess(true)
						}
					} catch (error: unknown) {
						const message = error instanceof Error ? error.message : 'Unknown error.'
						toast.error(message)
						throw error
					}
				} else {
					toast.error('Confirm password not new match password')
				}
			} else {
				toast.error('Password must be at least 8 character include special characters')
			}
		} else {
			//not update password
			const payload = {
				_id: userInfo._id,
				name: values.name,
				phone: values.phone,
			}
			try {
				const result = await updateInfo(payload)
				if (result) {
					setShowModalSuccess(true)
				}
			} catch (error: unknown) {
				const message = error instanceof Error ? error.message : 'Unknown error.'
				toast.error(message)
				throw error
			}
		}
	}
	const handleSignOut = () => {
		dispatch({type: 'USER_SIGNOUT'})
		localStorage.clear()
		window.location.href = '/signin'
	}
	useEffect(() => {
		if (userInfo) {
			setValue('name', userInfo.name)
			setValue('email', userInfo.email)
			setValue('phone', userInfo.phone)
		}
	}, [])

	return (
		<section className='account-info'>
			<div className='container'>
				<p className='title'>My Account</p>
				<div className='account-info-container'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<Input className='input-form' type='email' id='email' readOnly disabled placeholder='Enter your email' isInvalid={!!errors.email} {...register('email')} />
							<Text color='red'>{errors.email && errors.email.message}</Text>
						</FormControl>

						<FormControl isRequired>
							<FormLabel htmlFor='name' mt={2}>
								Name
							</FormLabel>
							<Input
								className='input-form'
								type='name'
								id='name'
								placeholder='Enter your name'
								isInvalid={!!errors.name}
								{...register('name', {
									required: 'Name is required',
								})}
							/>
							<Text color='red'>{errors.name && errors.name.message}</Text>
						</FormControl>
						<FormControl>
							<FormLabel mt={2} htmlFor='phone'>
								Phone
							</FormLabel>
							<Input
								type='tel'
								id='phone'
								className='input-form'
								placeholder='Enter your phone'
								isInvalid={!!errors.phone}
								{...register('phone', {
									required: 'Phone is required',
									pattern: {
										value: REGEX_PHONE,
										message: 'Invalid Phone number',
									},
								})}
							/>
							<Text color='red'>{errors.phone && errors.phone.message}</Text>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='password' mt={2}>
								New Password
							</FormLabel>
							<Input className='input-form' type='password' id='password' placeholder='Enter your password' {...register('password')} />
							<Text color='red'>{errors.password && errors.password.message}</Text>
							<FormLabel htmlFor='password' mt={2}>
								Confirm new password
							</FormLabel>
							<Input className='input-form' type='password' id='rePassword' placeholder='Confirm your new password' {...register('rePassword')} />
							<Text color='red'>{errors.rePassword && errors.rePassword.message}</Text>
						</FormControl>

						<Button isLoading={isLoading} loadingText='Updating' type='submit' className='btn-login'>
							Update Information
						</Button>
					</form>
				</div>
			</div>
			<Modal closeOnOverlayClick={false} onClose={handleSignOut} isOpen={showModalSuccess} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update information</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<p>Update information Successfully ,Please login again</p>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='teal' onClick={handleSignOut}>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	)
}
