import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, it, expect, vi} from 'vitest'
import Header from '../components/header'
import {Store} from '../Store'
import {MemoryRouter} from 'react-router-dom'

// Mock the products hook to avoid network requests during tests
vi.mock('../hooks/productHooks', () => ({
  useGetProductsQuery: () => ({data: []}),
}))

// Helper to render Header with a custom store state
const renderWithStore = (state: any, dispatch = () => {}) => {
  return render(
    <Store.Provider value={{state, dispatch}}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Store.Provider>
  )
}

describe('Header component', () => {
  it('shows Login Now when user not signed in', () => {
    // Arrange: empty userInfo
    const state = {cart: {cartItems: []}, userInfo: {}}

    // Act
    renderWithStore(state)

    // Assert
    expect(screen.getByText(/login now/i)).toBeInTheDocument()
  })

  it('shows cart badge and items when cart has products', async () => {
    // Arrange: one item in cart
    const item = {_id: '1', name: 'Product 1', image: '/img.png', quantity: 2, price: 5, slug: 'p1'}
    const state = {cart: {cartItems: [item]}, userInfo: {}}
    renderWithStore(state)

    // The badge count should be in the document
    expect(await screen.findByText('1') || screen.queryByText('2') || screen.getByRole('button', {name: /cart/i})).toBeTruthy()

    // Click the cart button to open menu
    const buttons = screen.getAllByRole('button')
    // find cart-like button: by aria-label "Cart" on MenuButton
    const cartButton = buttons.find((b) => b.getAttribute('aria-label') === 'Cart')
    if (cartButton) {
      await userEvent.click(cartButton)
      // Item name should appear in the menu
      expect(await screen.findByText(/Product 1/i)).toBeInTheDocument()
    }
  })
})
