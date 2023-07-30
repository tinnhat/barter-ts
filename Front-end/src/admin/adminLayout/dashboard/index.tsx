
import Chart from 'react-apexcharts'
import {Link} from 'react-router-dom'
import statusCards from '../../assets/JsonData/status-card-data.json'
import StatusCard from '../../components/status-card'
import './style.scss'
import TableCus from '../../components/table'
const chartOptions = {
	series: [
		{
			name: 'Online Customers',
			data: [30, 60, 62, 45, 12, 67, 97, 43, 12],
		},
		{
			name: 'Store Customers',
			data: [30, 60, 62, 45, 12, 67, 97, 55, 21, 45, 86],
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
	},
}

function DashboardAdmin() {
	const options: any = {
		...chartOptions.options,
		theme: {mode: 'light'},
	}
	return (
		<div className='dashboard-admin'>
			<div className='row'>
				<div className='col-6'>
					<div className='row'>
						{statusCards.map((item,idx) => (
							<div className='col-6' key={idx}>
								<StatusCard icon={item.icon} count={item.count} title={item.title} />
							</div>
						))}
					</div>
				</div>
				<div className='col-6'>
					<div className='card full-height'>
						<Chart options={options} series={chartOptions.series} type='line' height='100%' />
					</div>
				</div>
				<div className='col-5'>
					<div className='card'>
						<div className='card__header'>
							<h3>top customers</h3>
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
							<h3>lastest orders</h3>
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
