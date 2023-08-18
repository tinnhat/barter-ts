import {Text, Tooltip} from '@chakra-ui/react'
import './style.scss'

type Props = {
	icon: string
	count: string
	title: string
}

export default function StatusCard({icon, count, title}: Props) {
	return (
		<div className='status-card'>
			<div className='status-card__icon'>
				<i className={icon}></i>
			</div>
			<div className='status-card__info'>
				<h4>
					<Tooltip label={count}>
						<Text noOfLines={1}>{count}</Text>
					</Tooltip>
				</h4>
				<span>{title}</span>
			</div>
		</div>
	)
}
