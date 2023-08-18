import React from 'react'
import {BeatLoader} from 'react-spinners'
import './style.scss'
type Props = {}

export default function LoadingCenter({}: Props) {
	return (
		<div className='loading-center'>
			<BeatLoader color='#a88057' />
		</div>
	)
}
