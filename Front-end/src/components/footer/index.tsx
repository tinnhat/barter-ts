/** @jsxImportSource react */
import {Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Image, Link} from '@chakra-ui/react'
import logoFooter from '../../assets/img/barter-footer-logo.png'

const Footer = () => {
  return (
    <Box as='footer' bg='gray.50' mt={12}>
      <Container maxW='container.xl' py={8}>
        <HStack spacing={8} align='start'>
          <VStack align='start'>
            <Image src={logoFooter} alt='logo' boxSize='120px' objectFit='contain' />
            <Text color='gray.600'>Street 238,52 tempor Donec ultricies mattis nulla.</Text>
            <Text color='gray.600'>Phone: +1 234 567 890</Text>
            <Text color='gray.600'>Email: info@example.com</Text>
          </VStack>

          <Grid templateColumns={{base: 'repeat(1,1fr)', md: 'repeat(3,1fr)'}} gap={6} flex='1'>
            <GridItem>
              <Heading as='h3' size='sm' mb={3}>
                My Account
              </Heading>
              <VStack align='start' spacing={2}>
                <Link href='#'>My Account</Link>
                <Link href='/signin'>Login</Link>
                <Link href='/cart'>Cart</Link>
                <Link href='/checkout'>Checkout</Link>
              </VStack>
            </GridItem>
            <GridItem>
              <Heading as='h3' size='sm' mb={3}>
                Information
              </Heading>
              <VStack align='start' spacing={2}>
                <Link href='/about'>About Us</Link>
                <Link href='/careers'>Careers</Link>
                <Link href='/privacy'>Privacy Policy</Link>
                <Link href='/delivery'>Delivery Information</Link>
                <Link href='/terms'>Terms & Condition</Link>
              </VStack>
            </GridItem>
            <GridItem>
              <Heading as='h3' size='sm' mb={3}>
                Customer Services
              </Heading>
              <VStack align='start' spacing={2}>
                <Link href='/shipping'>Shipping Policy</Link>
                <Link href='/returns'>Return Policy</Link>
                <Link href='/refunds'>Refunds & Compensation</Link>
                <Link href='/guarantee'>Guarantee</Link>
              </VStack>
            </GridItem>
          </Grid>
        </HStack>
      </Container>
      <Box bg='gray.100' py={3}>
        <Container maxW='container.xl'>
          <Text fontSize='sm' color='gray.600'>Copyright © 2023 By NT99</Text>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
