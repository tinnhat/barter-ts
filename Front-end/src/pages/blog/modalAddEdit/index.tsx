import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea} from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import apiClient from '../../../apiClient'
import {BlogType} from '../../../types/Blog'
import {getDataFromLocalStorage} from '../../../utils'
import {typeEnum, widthModal} from '../../../common/enum'

type ShowModalType = {
	show: boolean
	type: number
	blog:
		| BlogType
		| {
				_id: ''
				author: ''
				content: ''
				user: ''
				title: ''
		  }
}
type Props = {
	isShowModal: ShowModalType
	setShowModal: React.Dispatch<React.SetStateAction<ShowModalType>>
	handleRefectchData: () => void
}
interface IFormInputs {
	title: string
	content: string
}

export default function ModalEditAddBlog({isShowModal, setShowModal, handleRefectchData}: Props) {
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors,},
	} = useForm<IFormInputs>()
	const finalRef = useRef(null)
	const userInfo = getDataFromLocalStorage('userInfo')
	const [isLoading, setIsLoading] = useState(false)
	const handleCloseModal = () => {
		setShowModal((state) => {
			return {
				...state,
				show: false,
			}
		})
		handleRefectchData()
	}
	const handleAddBlog = async (value: IFormInputs) => {
		setIsLoading(true)
		const payload = {
			title: value.title,
			content: value.content,
			user: userInfo._id,
		}
		try {
			const result = await apiClient.post('/api/blogs', payload)
			if (result) {
				toast.success('Add Blog Successfully')
				handleCloseModal()
			}
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Unknown error.'
			toast.error(message)
			throw error
		} finally {
			setIsLoading(false)
		}
	}
	const handleEditBlog = async (values: IFormInputs) => {
		setIsLoading(true)
		const payload = {
			title: values.title,
			content: values.content,
		}
		try {
			const result = await apiClient.patch(`/api/blogs/${isShowModal.blog._id}`, payload)
			if (result) {
				toast.success('Edit Blog Successfully')
				handleCloseModal()
			}
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Unknown error.'
			toast.error(message)
			throw error
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		if (isShowModal.blog.title) {
			setValue('title', isShowModal.blog.title)
		}
		if (isShowModal.blog.content) {
			setValue('content', isShowModal.blog.content)
		}
	}, [isShowModal.blog])

	const onSubmit = (values: IFormInputs) => {
		if (isShowModal.type === typeEnum.Add) {
			handleAddBlog(values)
			return
		}
		handleEditBlog(values)
	}
  
	return (
		<Modal
			finalFocusRef={finalRef}
			closeOnOverlayClick={false}
			isOpen={isShowModal.show}
			onClose={handleCloseModal}
			id='modal-blog'
			size={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}
		>
			<ModalOverlay />
			<ModalContent w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>{+isShowModal.type == typeEnum.Add ? 'Add Blog' : 'Edit Blog'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<FormControl>
							<FormLabel htmlFor='title'>Title</FormLabel>
							<Input
								id='title'
								placeholder='Enter your title'
								isInvalid={!!errors.title}
								{...register('title', {
									required: 'Title is required',
									minLength: {
										value: 20,
										message: 'Title at least 20 characters',
									},
								})}
							/>
							<Text color='red'>{errors.title && errors.title.message}</Text>
							<FormLabel htmlFor='content' mt={2}>
								Content
							</FormLabel>
							<Textarea
								id='content'
								isInvalid={!!errors.content}
								placeholder='Enter your content'
								{...register('content', {
									required: 'Content is required',
									minLength: {
										value: 200,
										message: 'Content at least 200 characters',
									},
								})}
							/>
							<Text color='red'>{errors.content && errors.content.message}</Text>
						</FormControl>
					</ModalBody>
					<ModalFooter w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<Button mr={3} onClick={handleCloseModal}>
							Close
						</Button>
						<Button colorScheme='teal' isLoading={isLoading} loadingText='Submitting' type='submit'>
							Submit
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
