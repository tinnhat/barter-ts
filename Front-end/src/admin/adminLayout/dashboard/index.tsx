import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { useChartDashboardMutation, useStatusDashboardMutation } from '../../../hooks/dashboardHooks'
import StatusCard from '../../components/status-card'
import TableCus from '../../components/table'
import './style.scss'

function DashboardAdmin() {
	const {mutateAsync: getAllStatus} = useStatusDashboardMutation()
	const {mutateAsync: getDataChart} = useChartDashboardMutation()
	const [status, setStatus] = useState([])
	const [dataChart, setDataChart] = useState({
		series: [
			{
				name: 'Order create',
				data: [],
			},
			{
				name: 'Order paid',
				data: [],
			},
		],
		options: {
			color: ['#6ab04c', '#2980b9'],
			chart: {
				background: 'transparent',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
			},
			legend: {
				position: 'top',
			},
			grid: {
				show: false,
			},
			theme: {mode: 'light'},
		},
	})
	useEffect(() => {
		const allStatus = async () => {
			const result = await getAllStatus()
			if (result) {
				setStatus(result)
			}
		}
		allStatus()
	}, [])
	useEffect(() => {
		const dataForChart = async () => {
			const result = await getDataChart()
			if (result) {
				setDataChart({
					...dataChart,
					series: result,
				})
			}
		}
		dataForChart()
	}, [])

	return (
		<div className='dashboard-admin'>
			<div className='row'>
				<div className='col-6'>
					<div className='row'>
						{status &&
							status.map((item: any, idx: number) => (
								<div className='col-6' key={idx}>
									<StatusCard icon={item.icon} count={item.count} title={item.title} />
								</div>
							))}
					</div>
				</div>
				<div className='col-6'>
					<div className='card full-height'>
						<Chart options={dataChart} series={dataChart.series} type='line' height='100%' />
					</div>
				</div>
				<div className='col-5'>
					<div className='card'>
						<div className='card__header'>
							<h3>Top Customers</h3>
							<TableCus />
						</div>
						<div className='card__body'></div>
						<div className='card__footer'>
							<Link to={'/'}>View all</Link>
						</div>
					</div>
				</div>
				<div className='col-7'>
					<div className='card'>
						<div className='card__header'>
							<h3>Top Products</h3>
							<TableCus />
						</div>
						<div className='card__body'></div>
						<div className='card__footer'>
							<Link to={'/'}>View All</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardAdmin
