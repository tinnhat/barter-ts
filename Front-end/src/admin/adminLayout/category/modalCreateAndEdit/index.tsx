import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { typeEnum, widthModal } from '../../../../common/enum'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../../hooks/categoryHooks'
import { ApiError } from '../../../../types/ApiError'
import { Category } from '../../../../types/Category'
import { getError } from '../../../../utils'
import './style.scss'

interface IFormInputs {
	name: string
}
type ShowModalType = {
	show: boolean
	type: number
	category: Category
}
type Props = {
	showModal: ShowModalType
	setShowModal: React.Dispatch<React.SetStateAction<ShowModalType>>
	handleRefetchData: () => void
}
const ModalCategory = ({showModal, setShowModal, handleRefetchData}: Props) => {
	const {mutateAsync: createCategory} = useCreateCategoryMutation()
	const {mutateAsync: editCategory} = useUpdateCategoryMutation()
	const finalRef = useRef(null)
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm<IFormInputs>()
	const [loading, setLoading] = useState(false)
	const [isUse, setIsUse] = useState('1')
	const handleCloseModal = () => {
		setShowModal((state) => {
			return {
				...state,
				show: false,
			}
		})
		handleRefetchData()
	}
	useEffect(() => {
		if (showModal.category._id) {
			setValue('name', showModal.category.name)
			if (showModal.category.isUse) {
				setIsUse('1')
			} else {
				setIsUse('2')
			}
		}
	}, [showModal.category])

	const onSubmit = (values: IFormInputs) => {
		if (showModal.type === typeEnum.Add) {
			handleAddCategory(values)
			return
		}
		handleEditCategory(values)
	}

	const handleAddCategory = async (values: IFormInputs) => {
		setLoading(true)
		try {
			const result = await createCategory({
				...values,
				isUse: isUse === '1' ? true : false,
			})
			if (result) {
				toast.success('Add category Successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const handleEditCategory = async (values: IFormInputs) => {
		setLoading(true)
		try {
			const result = await editCategory({
				_id: showModal.category._id!,
				...values,
				isUse: isUse === '1' ? true : false,
			})
			if (result) {
				toast.success('Edit category Successfully')
				handleCloseModal()
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
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
			<ModalContent className='modal-category-content' w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
				<form className='input-form' onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>{+showModal.type == typeEnum.Add ? 'Add Category' : 'Edit Category'}</ModalHeader>
					<ModalBody w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<FormControl isRequired>
							<FormLabel htmlFor='name'>Name</FormLabel>
							<Input
								id='name'
								placeholder='Enter name of category'
								isInvalid={!!errors.name}
								{...register('name', {
									required: 'Name is required',
									minLength: {
										value: 4,
										message: 'Name at least 4 characters',
									},
								})}
							/>
							<Text color='red'>{errors.name && errors.name.message}</Text>
							<FormLabel mt={3} htmlFor='isUse'>
								Is Use
							</FormLabel>
							<RadioGroup defaultValue='1' onChange={setIsUse} value={isUse}>
								<Stack spacing={5} direction='row'>
									<Radio value='1'>In Use</Radio>
									<Radio value='2'>Not Use</Radio>
								</Stack>
							</RadioGroup>
						</FormControl>
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
export default React.memo(ModalCategory)
