import { Table, Thead, Tbody, Tr, Th, Td, Text, Tooltip, Box } from '@chakra-ui/react'

type Props = {
	isCustomer: boolean
	data?: any[]
}

export default function TableCus({ isCustomer, data }: Props) {
	return (
		<Box overflowX="auto" rounded="md" bg="white" boxShadow="sm">
			<Table variant="simple" size="sm">
				<Thead bg="gray.50">
					<Tr>
						<Th>{isCustomer ? 'Customer' : 'Product'}</Th>
						{!isCustomer ? <Th>Quantity</Th> : null}
						<Th>Price</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data &&
						data.map((item: any, idx: number) => (
							<Tr key={item._id} bg={idx % 2 === 0 ? 'white' : 'gray.50'}>
								<Td>
									<Tooltip label={item.name}>
										<Text noOfLines={1}>{item.name}</Text>
									</Tooltip>
								</Td>
								{!isCustomer ? (
									<Td>
										<Tooltip label={item.quantity}>
											<Text noOfLines={1}>{item.quantity}</Text>
										</Tooltip>
									</Td>
								) : null}
								<Td>
									<Tooltip label={item.price}>
										<Text noOfLines={1}>${item.price}</Text>
									</Tooltip>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</Box>
	)
}
