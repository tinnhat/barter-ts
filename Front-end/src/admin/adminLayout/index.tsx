import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import '../assets/boxicons-2.0.7/css/boxicons.min.css'
import '../assets/css/_index.scss'
import Sidebar from '../components/sidebar/index.js'
import Topnav from '../components/topnav/index.js'
import { Flex, Box, Text } from '@chakra-ui/react'

type Props = {}

export default function AdminLayout({}: Props) {
	return (
		<>
			<Flex minH="100vh" bg="gray.50">
				<Sidebar />
				<Box flex="1" minH="100vh">
					<Topnav />
					<Box as="main" p={4}>
						<Outlet />
					</Box>
				</Box>
			</Flex>
			<Text display={{ base: 'block', md: 'none' }} textAlign="center" mt={4} color="gray.500">
				Admin Dashboard only use in Desktop
			</Text>
			<Toaster position="bottom-right" reverseOrder={false} />
		</>
	)
}
