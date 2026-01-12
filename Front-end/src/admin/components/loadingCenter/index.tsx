import { Center, Spinner } from '@chakra-ui/react'
import './style.scss'

type Props = {}

export default function LoadingCenter({}: Props) {
	return (
		<Center py={8}>
			<Spinner size="xl" color="brand.500" />
		</Center>
	)
}
