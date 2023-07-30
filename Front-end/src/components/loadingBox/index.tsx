import ClipLoader from 'react-spinners/ClipLoader'
import './style.scss'
type Props = {
  loadingProps: boolean
}

export default function LoadingBox({ loadingProps = false }: Props) {
  return (
    <div className='loadingBox'>
      <ClipLoader
        color={'#a88057'}
        loading={loadingProps}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}
