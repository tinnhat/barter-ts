import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import { Helmet } from 'react-helmet-async'
import { VStack, Box, Text, HStack, Icon } from '@chakra-ui/react'

function Sidebar() {
	const [activeItem, setActiveItem] = useState(0)
	const path = window.location.pathname
	useEffect(() => {
		if (path === '/admin' || path === '/admin/') {
			setActiveItem(0)
		} else {
			const result = sidebar_items.findIndex((item) => item.route === path)
			setActiveItem(result)
		}
	}, [])
	const handleClick = (id: number) => {
		setActiveItem(id)
	}

	return (
		<>
			<Helmet>
				<title>Admin</title>
			</Helmet>
			<Box as="nav" bg="white" w="64" minH="100vh" borderRightWidth="1px" p={4}>
				<Box mb={6}>
					<Text fontSize="xl" fontWeight="bold">Barter</Text>
				</Box>
				<VStack align="stretch" spacing={1}>
					{sidebar_items.map((item, idx) => (
						<Link to={item.route} key={idx} onClick={() => handleClick(idx)}>
							<HStack
								spacing={3}
								p={3}
								borderRadius="md"
								bg={idx === activeItem ? 'gray.100' : 'transparent'}
								_hover={{ bg: 'gray.50' }}
							>
								<Icon as={() => <i className={item.icon} />} />
								<Text>{item.display_name}</Text>
							</HStack>
						</Link>
					))}
				</VStack>
			</Box>
		</>
	)
}

export default Sidebar
