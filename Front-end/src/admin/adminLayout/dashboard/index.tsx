import CardTotalInfo from './cardTotalInfo'
import ChartDashboard from './chart'
import './style.scss'
import TableCustomers from './tableCustomer'
import TableProducts from './tableProduct'

function DashboardAdmin() {
	return (
		<div className='dashboard-admin'>
			<div className='row'>
				<div className='col-6'>
					<CardTotalInfo />
				</div>
				<div className='col-6'>
					<ChartDashboard />
				</div>
				<div className='col-6'>
					<div className='card'>
						<div className='card__header'>
							<h3>Top Customers</h3>
							<TableCustomers />
						</div>
					</div>
				</div>
				<div className='col-6'>
					<div className='card'>
						<div className='card__header'>
							<h3>Top Products</h3>
							<TableProducts />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardAdmin
