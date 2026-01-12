/** @jsxImportSource react */
import {Box, Container, Heading, Text, Button, HStack, VStack, Image} from '@chakra-ui/react'
import fastDelivery from '../../assets/img/fast-delivery.png'
import returnPolicy from '../../assets/img/return-policy.png'
import secure from '../../assets/img/secure-checkout.png'
import specicalDiscount from '../../assets/img/special-discount.png'

export default function Banner() {
  return (
    <Box as='section' bg='linear-gradient(180deg, rgba(255,255,255,0.0), rgba(250,250,250,1))' py={12}>
      <Container maxW='container.xl'>
        <VStack align='start' spacing={4} mb={8}>
          <Text color='gray.500' fontSize='lg'>Get ready for</Text>
          <Heading as='h1' size='2xl'>Stylish Bags</Heading>
          <Text color='gray.600' maxW='xl'>Vestibulum rutrum, ligula non faucibus fringilla, sem erat feugiat sapiena rhoncus.</Text>
          <Button as='a' href='/shop' colorScheme='brand' size='lg'>Buy Now</Button>
        </VStack>

        <HStack spacing={8} justify='space-between'>
          <HStack spacing={4} align='center'>
            <Image src={fastDelivery} boxSize='48px' />
            <Text>Fast Delivery</Text>
          </HStack>
          <HStack spacing={4} align='center'>
            <Image src={specicalDiscount} boxSize='48px' />
            <Text>Special Discount</Text>
          </HStack>
          <HStack spacing={4} align='center'>
            <Image src={secure} boxSize='48px' />
            <Text>Secure Checkout</Text>
          </HStack>
          <HStack spacing={4} align='center'>
            <Image src={returnPolicy} boxSize='48px' />
            <Text>30 days Returns Policy</Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
