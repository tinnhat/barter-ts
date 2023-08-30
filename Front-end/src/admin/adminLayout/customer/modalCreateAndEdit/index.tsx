import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text} from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {REGEX_PHONE, typeEnum, widthModal} from '../../../../common/enum'
import {UserInfo} from '../../../../types/UserInfo'
import './style.scss'
import {useAdminSignupMutation, useAdminUpdateInforMutation} from '../../../../hooks/userHooks'
import {toast} from 'react-hot-toast'
import {getError} from '../../../../utils'
import {ApiError} from '../../../../types/ApiError'

interface IFormInputs {
	name: string
	email: string
	phone: string
	password: string
	isAdmin: boolean
}
type ShowModalType = {
	show: boolean
	type: number
	customer: UserInfo
}
type Props = {
	showModal: ShowModalType
	setShowModal: React.Dispatch<React.SetStateAction<ShowModalType>>
	handleRefectchData: () => void
}
const ModalCustomer = ({showModal, setShowModal, handleRefectchData}: Props) => {
	const finalRef = useRef(null)
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm<IFormInputs>()
	const {mutateAsync: signup} = useAdminSignupMutation()
	const {mutateAsync: editUser} = useAdminUpdateInforMutation()
	const [loading, setLoading] = useState(false)
	const [role, setRole] = useState('1')
	const handleCloseModal = () => {
		setShowModal((state) => {
			return {
				...state,
				show: false,
			}
		})
		handleRefectchData()
	}
	useEffect(() => {
		if (showModal.customer._id) {
			const {name, email, phone, isAdmin} = showModal.customer
			setValue('name', name)
			setValue('email', email)
			setValue('phone', phone!)
			if (isAdmin) {
				setRole('2')
			} else {
				setRole('1')
			}
		}
	}, [showModal.customer])

	const onSubmit = (values: IFormInputs) => {
		if (showModal.type === typeEnum.Add) {
			handleAddUser(values)
			return
		}
		handleEditUser(values)
	}

	const handleAddUser = async (values: IFormInputs) => {
		setLoading(true)
		try {
			const result = await signup({
				...values,
				isAdmin: role === '1' ? false : true,
			})
			if (result) {
				toast.success('Add User Successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const handleEditUser = async (values: IFormInputs) => {
		setLoading(true)
		try {
			const result = await editUser({
				_id: showModal.customer._id,
				...values,
				isAdmin: role === '1' ? false : true,
			})
			if (result) {
				toast.success('Edit User Successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}
	const handleResetPassword = () => {
		toast.success('Feature is develop,Please try later')
	}

	return (
		<Modal
			finalFocusRef={finalRef}
			closeOnOverlayClick={false}
			isOpen={true}
			onClose={() => {}}
			id='modal-customer'
			size={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}
		>
			<ModalOverlay />
			<ModalContent className='modal-customer-content' w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
				<form className='input-form' onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>{+showModal.type == typeEnum.Add ? 'Add Customer' : 'Edit Customer'}</ModalHeader>
					<ModalBody w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<FormControl isRequired>
							<FormLabel htmlFor='name'>Name</FormLabel>
							<Input
								id='name'
								placeholder='Enter your name'
								isInvalid={!!errors.name}
								{...register('name', {
									required: 'Name is required',
									minLength: {
										value: 10,
										message: 'Name at least 10 characters',
									},
								})}
							/>
							<Text color='red'>{errors.name && errors.name.message}</Text>
						</FormControl>
						<FormControl isRequired>
							<FormLabel mt={2} htmlFor='email'>
								Email
							</FormLabel>
							<Input
								id='email'
								placeholder='Enter your email'
								isInvalid={!!errors.email}
								{...register('email', {
									required: 'Email is required',
								})}
								disabled={showModal.type === typeEnum.Add ? false : true}
							/>
							<Text color='red'>{errors.email && errors.email.message}</Text>
						</FormControl>
						<FormLabel mt={2} htmlFor='phone'>
							Phone
						</FormLabel>
						<Input
							type='tel'
							id='phone'
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

						{showModal.type === typeEnum.Add ? (
							<>
								<FormControl isRequired>
									<FormLabel mt={2} htmlFor='password'>
										Password
									</FormLabel>
									<Input
										className='input-form'
										type='password'
										id='password'
										isInvalid={!!errors.password}
										placeholder='Enter your password'
										{...register('password', {required: 'Password is required'})}
									/>
									<Text color='red'>{errors.password && errors.password.message}</Text>
								</FormControl>
							</>
						) : (
							<>
								<FormLabel mt={2} htmlFor='password'>
									Password
								</FormLabel>
								<Button onClick={handleResetPassword}>Reset Password</Button>
							</>
						)}
						<FormLabel htmlFor='title'>Role</FormLabel>
						<RadioGroup defaultValue='1' onChange={setRole} value={role}>
							<Stack spacing={5} direction='row'>
								<Radio value='1'>User</Radio>
								<Radio value='2'>Admin</Radio>
							</Stack>
						</RadioGroup>
					</ModalBody>
					<ModalFooter w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<Button mr={3} onClick={handleCloseModal}>
							Close
						</Button>
						<Button colorScheme='teal' loadingText='Submitting' isLoading={loading} type='submit'>
							Confirm
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
export default React.memo(ModalCustomer)
