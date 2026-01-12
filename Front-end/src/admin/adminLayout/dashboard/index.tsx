import CardTotalInfo from './cardTotalInfo'
import ChartDashboard from './chart'
import TableCustomers from './tableCustomer'
import TableProducts from './tableProduct'
import { SimpleGrid, Box, Heading } from '@chakra-ui/react'

function DashboardAdmin() {
	return (
		<Box p={4}>
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
				<Box>
					<CardTotalInfo />
				</Box>
				<Box>
					<ChartDashboard />
				</Box>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
				<Box bg="white" p={4} rounded="md" boxShadow="sm">
					<Heading size="sm" mb={3}>Top Customers</Heading>
					<TableCustomers />
				</Box>
				<Box bg="white" p={4} rounded="md" boxShadow="sm">
					<Heading size="sm" mb={3}>Top Products</Heading>
					<TableProducts />
				</Box>
			</SimpleGrid>
		</Box>
	)
}

export default DashboardAdmin
