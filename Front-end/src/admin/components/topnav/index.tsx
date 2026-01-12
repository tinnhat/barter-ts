import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Box, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { getDataFromLocalStorage } from '../../../utils'

function Topnav() {
	const adminInfo = getDataFromLocalStorage('userInfo')
	const handleLogout = () => {
		localStorage.clear()
		window.location.href = '/admin/signin'
	}

	return (
		<Flex as="header" align="center" justify="space-between" px={4} py={3} bg="white" boxShadow="sm">
			<Box />
			<Flex align="center" gap={4}>
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
						<Text>Welcome, {adminInfo?.name}</Text>
					</MenuButton>
					<MenuList>
						<MenuItem onClick={() => (window.location.href = '/')}>Homepage</MenuItem>
						<MenuItem onClick={handleLogout}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	)
}

export default Topnav
