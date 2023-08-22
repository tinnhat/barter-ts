import { BeatLoader } from 'react-spinners'
import './style.scss'
type Props = {}

export default function SpinnerLoading({}: Props) {
	return <div className='spinner-loading'>
    <BeatLoader color="#a88057" />
  </div>
}
