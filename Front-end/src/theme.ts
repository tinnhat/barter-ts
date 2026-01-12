import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#e9f8ff',
      100: '#c8efff',
      200: '#a6e6ff',
      300: '#84ddff',
      400: '#62d4ff',
      500: '#3fcafc',
      600: '#2aa1c8',
      700: '#1d788f',
      800: '#13525f',
      900: '#08292f',
    },
  },
  components: {
    Button: {
      baseStyle: {rounded: 'md'},
      defaultProps: {colorScheme: 'brand'},
    },
  },
})

export default theme
