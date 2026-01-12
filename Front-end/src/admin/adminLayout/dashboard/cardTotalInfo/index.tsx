import { useEffect, useState } from 'react'
import { useStatusDashboardMutation } from '../../../../hooks/dashboardHooks'
import LoadingCenter from '../../../components/loadingCenter'
import StatusCard from '../../../components/status-card'
import { SimpleGrid, Box } from '@chakra-ui/react'

type Props = {}

export default function CardTotalInfo({}: Props) {
	const { mutateAsync: getAllStatus, isLoading } = useStatusDashboardMutation()
	const [status, setStatus] = useState([])

	useEffect(() => {
		const allStatus = async () => {
			const result = await getAllStatus()
			if (result) {
				setStatus(result)
			}
		}
		allStatus()
	}, [])

	if (isLoading) return <LoadingCenter />

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
			{status && status.map((item: any, idx: number) => (
				<Box key={idx}>
					<StatusCard icon={item.icon} count={item.count} title={item.title} />
				</Box>
			))}
		</SimpleGrid>
	)
}
