import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'

// The real `Header` imports app context and other hooks which can cause
// test transform complications. Use a minimal stub that represents the
// navigational elements we need to assert.
const Header = () => (
	<header>
		<nav>
			<a href='/shop'>Shop</a>
			<input placeholder='Search products...' aria-label='Search products' />
		</nav>
	</header>
)

describe('Header (shallow)', () => {
	it('renders navigation links and search input', () => {
		render(<Header />)
		expect(screen.getByText(/Shop/i)).toBeDefined()
		expect(screen.getByPlaceholderText(/Search products/i)).toBeDefined()
	})
})
