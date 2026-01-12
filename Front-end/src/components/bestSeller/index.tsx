/** @jsxImportSource react */
import {Box, Container, Heading, Text, SimpleGrid, Image, Button, VStack} from '@chakra-ui/react'
import productImg from '../../assets/img/product.jpg'
import {Link as RouterLink} from 'react-router-dom'

export default function BestSeller() {
  const products = [
    {tag: 'Double Pouch', name: 'Leathery Bee', price: '$65.00'},
    {tag: 'Leather Bag', name: 'Silky Brown', price: '$99.00'},
    {tag: 'Parties', name: 'Black Gold', price: '$123.00'},
  ]

  return (
    <Box as='section' py={8}>
      <Container maxW='container.xl'>
        <Heading size='lg' mb={2}>Our Best Sellers</Heading>
        <Text mb={6} color='gray.500'>Best Selling Products</Text>

        <SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
          {products.map((p) => (
            <Box key={p.name} borderWidth='1px' borderRadius='md' overflow='hidden' p={4} bg='white'>
              <VStack align='start' spacing={3}>
                <Image src={productImg} alt={p.name} boxSize='200px' objectFit='cover' />
                <Text fontSize='sm' color='gray.500'>{p.tag}</Text>
                <Text fontWeight='semibold'>{p.name}</Text>
                <Text color='gray.700'>{p.price}</Text>
                <Button as={RouterLink} to='/cart' colorScheme='brand' size='sm'>Add to cart</Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
