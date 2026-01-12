import React from 'react'
import {Center, Spinner, Box} from '@chakra-ui/react'

type Props = {
  loadingProps?: boolean
}

export default function LoadingBox({loadingProps = false}: Props) {
  if (!loadingProps) return null
  return (
    <Box role='status' aria-live='polite' py={8}>
      <Center>
        <Spinner thickness='4px' speed='0.65s' size='xl' color='brand.500' />
      </Center>
    </Box>
  )
}
