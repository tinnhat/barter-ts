import { useEffect, useState } from 'react'
import { useStatusDashboardMutation } from '../../../../hooks/dashboardHooks'
import LoadingCenter from '../../../components/loadingCenter'
import StatusCard from '../../../components/status-card'

type Props = {}

export default function CardTotalInfo({}: Props) {
	const {mutateAsync: getAllStatus, isLoading} = useStatusDashboardMutation()
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
	return (
		<div className='row'>
			{isLoading ? (
				<LoadingCenter />
			) : (
				status &&
				status.map((item: any, idx: number) => (
					<div className='col-6' key={idx}>
						<StatusCard icon={item.icon} count={item.count} title={item.title} />
					</div>
				))
			)}
		</div>
	)
}
