import { Text, Tooltip } from '@chakra-ui/react'
import './style.scss'
type Props = {
	isCustomer: boolean
  data?: any[]
}

export default function TableCus({isCustomer,data}: Props) {
	const renderBody = (data: any[]) => {
		return (
			data &&
			data.map((item: any, idx: number) => {
				return (
					<tr className={`row-table ${idx % 2 === 0 ? 'row-even' : ''}`} key={item._id}>
						<td className='table-column__name'>
							<Tooltip label={item.name}>
								<Text noOfLines={1}>{item.name}</Text>
							</Tooltip>
						</td>
						{!isCustomer ? (
							<td className='table-column__quantity'>
								<Tooltip label={item.quantity}>
									<Text noOfLines={1}>{item.quantity}</Text>
								</Tooltip>
							</td>
						) : null}
						<td className='table-column__price'>
							<Tooltip label={item.price}>
								<Text noOfLines={1}>${item.price}</Text>
							</Tooltip>
						</td>
					</tr>
				)
			})
		)
	}
	return (
		<div className='table-cus'>
			<div className='dashboard-cus-table'>
				<div className='table-header'>
					<table cellPadding='0' cellSpacing='0'>
						<thead>
							<tr>
								<th className='table-column__name'>{isCustomer ? 'Customer' : 'Product'}</th>
								{!isCustomer ? <th className='table-column__quantity'>Quantity</th> : null}
								<th className='table-column__price'>Price</th>
							</tr>
						</thead>
					</table>
				</div>
				<div className='table-content'>
					<table cellPadding='0' cellSpacing='0'>
						<tbody>{renderBody(data!)}</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
