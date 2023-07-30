import { Alert } from '@chakra-ui/react'
import './style.scss'
export default function MessageBox({
  status = 'info',
  children,
}: {
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
  children: React.ReactNode
}) {
  return (
    <div className='messageBox'>
      <Alert status={status}>{children}</Alert>
    </div>
  )
}
