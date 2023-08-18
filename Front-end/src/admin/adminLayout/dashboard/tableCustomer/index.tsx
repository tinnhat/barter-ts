import React, {useEffect, useState} from 'react'
import TableCus from '../../../components/table'
import {useTableCustomerMutation} from '../../../../hooks/dashboardHooks'
import LoadingCenter from '../../../components/loadingCenter'

type Props = {}

export default function TableCustomers({}: Props) {
	const {mutateAsync: getDataTableCusomters, isLoading} = useTableCustomerMutation()
	const [dataCustomer, setDataCustomer] = useState([])
	useEffect(() => {
		const allCustomer = async () => {
			const result = await getDataTableCusomters()
			if (result) {
				setDataCustomer(result)
			}
		}
		allCustomer()
	}, [])
	return isLoading ? <LoadingCenter /> : <TableCus isCustomer data={dataCustomer} />
}
