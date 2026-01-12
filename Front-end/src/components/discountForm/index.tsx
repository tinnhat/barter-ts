/** @jsxImportSource react */
import {Box, Container, Heading, Input, Button, HStack, VStack, Text} from '@chakra-ui/react'
import React from 'react'

const DiscountForm = () => {
  return (
    <Box as='section' py={8} bg='white'>
      <Container maxW='container.md'>
        <VStack spacing={4} align='start'>
          <Heading size='lg'>Get Discount 30% off</Heading>
          <Text color='gray.600'>Subscribe to our newsletter and get exclusive deals.</Text>
          <HStack width='100%'>
            <Input type='email' placeholder='Your Email' bg='gray.50' />
            <Button colorScheme='brand'>Subscribe</Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default DiscountForm
