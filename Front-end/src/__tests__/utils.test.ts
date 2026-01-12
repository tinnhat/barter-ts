import { describe, it, expect, beforeEach } from 'vitest'
import { getError, getDataFromLocalStorage, saveDataFromLocalStorage, convertProductToCartItem } from '../utils'

// Mock types used by utils
import type { ApiError } from '../types/ApiError'
import type { Product } from '../types/Product'

// Each test block below includes a clear comment describing the purpose.

describe('utils functions', () => {
  beforeEach(() => {
    // Reset localStorage before each test to avoid cross-test pollution
    localStorage.clear()
  })

  it('getError returns nested response message when available', () => {
    // Arrange: create an ApiError-like object with nested response.data.message
    const err = { response: { data: { message: 'Nested error' } }, message: 'Fallback' } as unknown as ApiError

    // Act
    const result = getError(err)

    // Assert: should prefer the nested message
    expect(result).toBe('Nested error')
  })

  it('getError returns top-level message when nested message missing', () => {
    // Arrange: ApiError with no response
    const err = { message: 'Top level' } as unknown as ApiError

    // Act
    const result = getError(err)

    // Assert
    expect(result).toBe('Top level')
  })

  it('saveDataFromLocalStorage and getDataFromLocalStorage persist JSON data', () => {
    // Arrange
    const key = 'cart'
    const value = { a: 1, items: [1, 2, 3] }

    // Act
    saveDataFromLocalStorage(key, value)
    const got = getDataFromLocalStorage(key)

    // Assert: deep equality
    expect(got).toEqual(value)
  })

  it('convertProductToCartItem maps Product to CartItem with default quantity', () => {
    // Arrange: minimal Product sample
    const product = {
      _id: 'p1',
      name: 'Test Product',
      category: 'cat',
      countInStock: 5,
      slug: 'test-product',
      image: '/img.png',
      price: 99,
    } as unknown as Product

    // Act
    const cartItem = convertProductToCartItem(product)

    // Assert: mapped fields and default quantity
    expect(cartItem._id).toBe('p1')
    expect(cartItem.name).toBe('Test Product')
    expect(cartItem.quantity).toBe(1)
    expect(cartItem.price).toBe(99)
  })
})
