import {Alert, AlertIcon, Box} from '@chakra-ui/react'
import React from 'react'

export default function MessageBox({
  status = 'info',
  children,
}: {
  status?: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined
  children: React.ReactNode
}) {
  return (
    <Box role='status' aria-live='polite' my={3}>
      <Alert status={status} borderRadius='md'>
        <AlertIcon />
        {children}
      </Alert>
    </Box>
  )
}
