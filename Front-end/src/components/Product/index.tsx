/** @jsxImportSource react */
import React, {useContext} from 'react'
import {Store} from '../../Store'
import {CartItem} from '../../types/Cart'
import {Product as ProductType} from '../../types/Product'
import {convertProductToCartItem} from '../../utils'
import {Box, Image, Text, Tooltip, Button, VStack, HStack, Link} from '@chakra-ui/react'
import {toast} from 'react-hot-toast'
import {Link as RouterLink} from 'react-router-dom'

export default function SingleProduct({product}: {product: ProductType}) {
	const {state, dispatch} = useContext(Store)
	const {
		cart: {cartItems},
	} = state

	const handleAddtoCart = (item: CartItem) => {
		const existItem = cartItems.find((val: any) => val._id === product._id)
		const quantity = existItem ? existItem.quantity + 1 : 1
		if (product.countInStock < quantity) {
			toast.error('Sorry. Product is out of stock')
			return
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: {...item, quantity},
		})
		toast.success('Add product successfully')
	}

	return (
		<Link as={RouterLink} to={`/product/${product.slug}`} _hover={{textDecor: 'none'}}>
			<Box borderWidth='1px' borderRadius='md' overflow='hidden' p={3} bg='white'>
				<VStack spacing={3} align='start'>
					<Box position='relative' width='100%'>
						<Image src={product.image} alt={product.name} objectFit='cover' width='100%' height='200px' />
						{product.countInStock === 0 ? (
							<Button size='sm' pos='absolute' top='2' right='2' colorScheme='red' disabled>
								Out of stock
							</Button>
						) : (
							<Button
								size='sm'
								pos='absolute'
								top='2'
								right='2'
								colorScheme='brand'
								onClick={(e) => {
									e.preventDefault()
									handleAddtoCart(convertProductToCartItem(product))
								}}
							>
								Add
							</Button>
						)}
					</Box>

					<Tooltip label={product.category}>
						<Text fontSize='sm' color='gray.500' noOfLines={1}>
							{product.category}
						</Text>
					</Tooltip>

					<Tooltip label={product.name}>
						<Text fontWeight='semibold' noOfLines={1}>
							{product.name}
						</Text>
					</Tooltip>

					<HStack justify='space-between' width='100%'>
						<Text fontSize='lg' color='gray.700'>${product.price}</Text>
					</HStack>
				</VStack>
			</Box>
		</Link>
	)
}
