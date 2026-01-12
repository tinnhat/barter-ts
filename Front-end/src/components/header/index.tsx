/** @jsxImportSource react */
import React, {useContext, useState} from 'react'
import {
	Box,
	Flex,
	Image,
	Input,
	IconButton,
	Badge,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	VStack,
	HStack,
	Text,
	Divider,
	Button,
} from '@chakra-ui/react'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {Store} from '../../Store'
import logo from '../../assets/img/logo.png'
import {useGetProductsQuery} from '../../hooks/productHooks'

export default function Header() {
  const navigate = useNavigate()
  const {data: allProduct} = useGetProductsQuery()
  const [keyword, setKeyword] = useState('')
  const {state, dispatch} = useContext(Store)
  const {
	cart: {cartItems},
	userInfo,
  } = state

  const handleSearch = () => {
	// for now, navigate to shop with query param
	if (keyword) navigate(`/shop?search=${encodeURIComponent(keyword)}`)
  }

  const handleSignOut = () => {
	dispatch({type: 'USER_SIGNOUT'})
	localStorage.clear()
	window.location.href = '/signin'
  }

  return (
	<Box as='header' bg='white' boxShadow='sm' pos='sticky' top='0' zIndex={50}>
	  <Flex align='center' justify='space-between' px={{base: 4, md: 8}} py={3}>
		<HStack spacing={6} align='center'>
		  <RouterLink to='/'>
			<Image src={logo} alt='logo' boxSize='48px' objectFit='contain' />
		  </RouterLink>
					<Input
			placeholder='Search products...'
			value={keyword}
			onChange={(e) => setKeyword(e.target.value)}
			width={{base: '160px', md: '360px'}}
			bg='gray.50'
			_placeholder={{color: 'gray.400'}}
		  />
					<IconButton
						aria-label='search'
						onClick={handleSearch}
						icon={<svg viewBox='0 0 24 24' width='18' height='18'><path d='M21 21l-4.35-4.35' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/><circle cx='11' cy='11' r='6' stroke='currentColor' strokeWidth='2' fill='none'/></svg>}
					/>
		</HStack>

		<HStack spacing={4} align='center'>
		  {userInfo && Object.keys(userInfo).length ? (
			<Menu>
						<MenuButton as={Button} rightIcon={<svg viewBox='0 0 24 24' width='16' height='16'><path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none'/></svg>}>
				Account
			  </MenuButton>
			  <MenuList>
				<MenuItem as={RouterLink} to='/my-account'>Profile</MenuItem>
				<MenuItem as={RouterLink} to='/order-history'>My orders</MenuItem>
				{userInfo?.isAdmin ? <MenuItem as='a' href='/admin'>Admin</MenuItem> : null}
				<Divider />
				<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
			  </MenuList>
			</Menu>
		  ) : (
			<Button as={RouterLink} to='/signin' colorScheme='brand' variant='ghost'>
			  Login Now
			</Button>
		  )}

		  <Menu>
			<MenuButton as={IconButton} aria-label='Cart' icon={<svg viewBox='0 0 24 24' width='20' height='20'><path d='M7 4h-2l-1 2v2h2l3 6h8l3-6h2v-2l-1-2h-2l-1 2h-10z' fill='currentColor' /></svg>}>
			  {cartItems.length > 0 ? (
				<Badge ml='-3' mt='-6' colorScheme='red' borderRadius='full'>
				  {cartItems.length}
				</Badge>
			  ) : null}
			</MenuButton>
			<MenuList minW='300px'>
			  <VStack align='stretch' spacing={2} px={3} py={2}>
				{cartItems.length === 0 ? (
				  <Text>No items in cart</Text>
				) : (
				  cartItems.map((it: any) => (
					<HStack key={it._id} justify='space-between'>
					  <HStack>
						<Image src={it.image} boxSize='48px' objectFit='cover' />
						<VStack align='start' spacing={0}>
						  <Text fontSize='sm'>{it.name}</Text>
						  <Text fontSize='xs' color='gray.500'>
							{it.quantity} x ${it.price}
						  </Text>
						</VStack>
					  </HStack>
					  <Button size='sm' variant='ghost' onClick={() => dispatch({type: 'CART_REMOVE_ITEM', payload: it})}>
						Remove
					  </Button>
					</HStack>
				  ))
				)}
				{cartItems.length > 0 ? (
				  <Button as={RouterLink} to='/cart' colorScheme='brand' width='full'>
					View Cart
				  </Button>
				) : null}
			  </VStack>
			</MenuList>
		  </Menu>
		</HStack>
	  </Flex>

	  <Box bg='gray.50' py={2}>
		<Flex px={{base: 4, md: 8}}>
		  <HStack spacing={6}>
			<RouterLink to='/'>Home</RouterLink>
			<RouterLink to='/shop'>Shop</RouterLink>
			<RouterLink to='/about'>About</RouterLink>
			<RouterLink to='/blog'>Blog</RouterLink>
			<RouterLink to='/contact'>Contact</RouterLink>
		  </HStack>
		</Flex>
	  </Box>
	</Box>
  )
}
