import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Textarea} from '@chakra-ui/react'
import React, {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {typeEnum, widthModal} from '../../../../common/enum'
import {Product} from '../../../../types/Product'
import './style.scss'
import {getError} from '../../../../utils'
import {ApiError} from '../../../../types/ApiError'
import {toast} from 'react-hot-toast'
import apiClient from '../../../../apiClient'
import axios from 'axios'
import {useCreateProductMutation, useUpdateProductMutation} from '../../../../hooks/productHooks'
import {useGetAllCategory} from '../../../../hooks/categoryHooks'
import {Category} from '../../../../types/Category'
import ReactQuill from 'react-quill'

interface IFormInputs {
	name: string
	category: string
	price: number
	countInStock: number
}
type ShowModalType = {
	show: boolean
	type: number
	product: Product
}
type Props = {
	showModal: ShowModalType
	setShowModal: React.Dispatch<React.SetStateAction<ShowModalType>>
	handleRefectchData: () => void
}
const ModalCustomer = ({showModal, setShowModal, handleRefectchData}: Props) => {
	const {mutateAsync: createProduct} = useCreateProductMutation()
	const {mutateAsync: editProduct} = useUpdateProductMutation()
	const {data: allCate} = useGetAllCategory()
	const [categorySelected, setCategorySelected] = useState('')
	const [listCategory, setListCategory] = useState<Category[]>()
	const [description, setDescription] = useState({
		description: '',
		theme: 'snow',
	})
	const finalRef = useRef(null)
	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm<IFormInputs>()
	const [loading, setLoading] = useState(false)
	const [file, setFile] = useState<File>()
	const handleCloseModal = () => {
		setShowModal((state) => {
			return {
				...state,
				show: false,
			}
		})
		setFile(undefined)
		handleRefectchData()
	}
	const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link']

	const modules = {
		toolbar: [[{header: [1, 2, false]}], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}], ['link'], ['clean']],
	}

	useEffect(() => {
		if (showModal.product._id) {
			setValue('name', showModal.product.name)
			setValue('category', showModal.product.category)
			setValue('price', showModal.product.price)
			setValue('countInStock', showModal.product.countInStock)
			setDescription({
				...description,
				description: showModal.product.description,
			})
			setCategorySelected(showModal.product.categoryId + '')
		}
	}, [showModal.product])

	useEffect(() => {
		if (allCate) {
			setListCategory(allCate)
		}
	}, [allCate])

	const onSubmit = (values: IFormInputs) => {
		if (showModal.type === typeEnum.Add) {
			handleAddProduct(values)
			return
		}
		handleEditProduct(values)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.files && setFile(e.target.files[0])
	}

	const handleAddProduct = async (values: IFormInputs) => {
		setLoading(true)
		try {
			if (file) {
				const formData = new FormData()
				formData.append('image', file)
				formData.append('album', 'zsd6meh')
				const resultUploadImg = await axios.post('https://api.imgur.com/3/upload', formData, {
					headers: {Authorization: `Bearer 7fed73eb080a1ed547c7f53a1eca3c4d4e739ee0`, 'Content-Type': 'multipart/form-data'},
				})
				if (resultUploadImg.status == 200) {
					//upload successfully
					const imgLink = resultUploadImg.data.data.link
					const categoryGroup = allCate?.find((item: any) => categorySelected === item._id)
					const payload = {
						...values,
						image: imgLink,
						category: categoryGroup?.name + '',
						categoryId: categorySelected,
						description: description.description!,
					}
					const result = await createProduct(payload)
					if (result) {
						toast.success('Add product successfully')
						handleCloseModal()
					}
				}
			} else {
				toast.error('Please upload product image')
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const handleEditProduct = async (values: IFormInputs) => {
		setLoading(true)
		try {
			if (file) {
				const formData = new FormData()
				formData.append('image', file)
				formData.append('album', 'zsd6meh')
				const resultUploadImg = await axios.post('https://api.imgur.com/3/upload', formData, {
					headers: {Authorization: `Bearer 7fed73eb080a1ed547c7f53a1eca3c4d4e739ee0`, 'Content-Type': 'multipart/form-data'},
				})
				if (resultUploadImg.status == 200) {
					//upload successfully
					const imgLink = resultUploadImg.data.data.link
					const categoryGroup = allCate?.find((item: any) => categorySelected === item._id)
					const payload = {
						_id: showModal.product._id!,
						...values,
						image: imgLink,
						category: categoryGroup?.name + '',
						categoryId: categorySelected,
						description: description.description!,
					}
					const result = await editProduct(payload)
					if (result) {
						toast.success('Edit product successfully')
						handleCloseModal()
					}
				}
			} else {
				const categoryGroup = allCate?.find((item: any) => categorySelected === item._id)
				const payload = {
					_id: showModal.product._id!,
					...values,
					image: showModal.product.image,
					category: categoryGroup?.name + '',
					categoryId: categorySelected,
					description: description.description!,
				}
				const result = await editProduct(payload)
				if (result) {
					toast.success('Edit product successfully')
					handleCloseModal()
				}
			}
		} catch (error) {
			const message: string = getError(error as ApiError)
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	const handleChangeDescription = (html: string) => {
		setDescription({
			...description,
			description: html,
		})
		console.log(description.description)
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
					<ModalHeader>{+showModal.type == typeEnum.Add ? 'Add Product' : 'Edit Product'}</ModalHeader>
					<ModalBody w={{sm: widthModal.sm, md: widthModal.md, lg: widthModal.lg, xl: widthModal.xl}}>
						<FormControl isRequired>
							<FormLabel mt={2} htmlFor='countInStock'>
								Image
							</FormLabel>
							<input type='file' onChange={handleChange} />
							<img
								className='img-preview'
								src={
									file ? URL.createObjectURL(file!) : typeEnum.Edit === showModal.type ? showModal.product.image : 'https://tailieu.nepc.edu.vn/themes/cynoebook/public/images/default-user-image.png'
								}
							/>
							<FormLabel htmlFor='name'>Name</FormLabel>
							<Input
								id='name'
								placeholder='Enter your name'
								isInvalid={!!errors.name}
								{...register('name', {
									required: 'Name is required',
								})}
							/>
							<Text color='red'>{errors.name && errors.name.message}</Text>
							<FormLabel mt={3} htmlFor='Postal Code'>
								Category
							</FormLabel>
							<Select
								placeholder='Select option'
								value={categorySelected}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategorySelected(e.target.value!)}
							>
								{listCategory &&
									listCategory.map((cate: Category, idx: number) => {
										return (
											<option onClick={() => setCategorySelected(cate._id!)} value={cate._id} key={idx}>
												{cate.name}
											</option>
										)
									})}
							</Select>
							<Text color='red'>{errors.category && errors.category.message}</Text>
							<FormLabel mt={2} htmlFor='price'>
								Price
							</FormLabel>
							<Input
								defaultValue={1}
								min={1}
								max={1000000000}
								type='number'
								id='price'
								placeholder='Enter your price'
								isInvalid={!!errors.price}
								{...register('price', {
									required: 'price is required',
								})}
							/>
							<Text color='red'>{errors.price && errors.price.message}</Text>
							<FormLabel mt={2} htmlFor='countInStock'>
								Quantity
							</FormLabel>
							<Input
								defaultValue={1}
								min={1}
								max={1000}
								type='number'
								id='countInStock'
								placeholder='Enter your countInStock'
								isInvalid={!!errors.countInStock}
								{...register('countInStock', {
									required: 'Quantity is required',
								})}
							/>
							<Text color='red'>{errors.countInStock && errors.countInStock.message}</Text>
							<FormLabel mt={2} htmlFor='description'>
								Description
							</FormLabel>
							<ReactQuill theme={description.theme} onChange={handleChangeDescription} value={description.description} modules={modules} formats={formats} />
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
export default React.memo(ModalCustomer)
