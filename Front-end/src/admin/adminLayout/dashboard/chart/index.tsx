import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useChartDashboardMutation } from '../../../../hooks/dashboardHooks'
import LoadingCenter from '../../../components/loadingCenter'

type Props = {}

export default function ChartDashboard({}: Props) {
	const {mutateAsync: getDataChart, isLoading} = useChartDashboardMutation()
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
	return <div className='card full-height'>{isLoading ? <LoadingCenter/> : <Chart options={dataChart} series={dataChart.series} type='line' height='100%' />}</div>
}
