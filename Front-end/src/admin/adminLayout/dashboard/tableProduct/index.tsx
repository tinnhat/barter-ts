import { useEffect, useState } from 'react'
import { useTableProductsMutation } from '../../../../hooks/dashboardHooks'
import LoadingCenter from '../../../components/loadingCenter'
import TableCus from '../../../components/table'

type Props = {}

export default function TableProducts({}: Props) {
	const {mutateAsync: getDataTableProducts, isLoading} = useTableProductsMutation()

	const [dataProduct, setDataProduct] = useState([])

	useEffect(() => {
		const allProduct = async () => {
			const result = await getDataTableProducts()
			if (result) {
				setDataProduct(result)
			}
		}
		allProduct()
	}, [])
	return isLoading ? <LoadingCenter /> : <TableCus isCustomer={false} data={dataProduct} />
}
