import React from 'react'
import './style.scss'
import { BeatLoader } from 'react-spinners'
type Props = {}

export default function SpinnerLoading({}: Props) {
	return <div className='spinner-loading'>
    <BeatLoader color="#a88057" />
  </div>
}
