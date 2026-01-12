import { Stat, StatNumber, StatLabel, Box, Tooltip, Text } from '@chakra-ui/react'

type Props = {
	icon: string
	count: string
	title: string
}

export default function StatusCard({ icon, count, title }: Props) {
	return (
		<Box bg="white" p={4} rounded="md" boxShadow="sm">
			<Stat>
				<StatNumber>
					<Tooltip label={count}>
						<Text as="span">{count}</Text>
					</Tooltip>
				</StatNumber>
				<StatLabel>{title}</StatLabel>
			</Stat>
		</Box>
	)
}
