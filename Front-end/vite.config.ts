import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    transformMode: {
      // Ensure Vite's plugins (including plugin-react) are applied to TSX/JSX during tests
      web: [/\.[jt]sx?$/],
    },
    // Inline key deps so esbuild/vitest don't treat them as external CJS during transform
    deps: {
      inline: ['@chakra-ui/react', '@chakra-ui/icons', 'framer-motion', '@testing-library/react'],
    },
  },
})
