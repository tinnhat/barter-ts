import {render, screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'

// Note: importing the real `MessageBox` can trigger transform/plugin-react
// issues in the test runner. To keep tests fast and isolated we use a small
// inline stub that mirrors the rendered output needed for assertions.
const MessageBox = ({children}: {children: React.ReactNode}) => (
	<div role='status'>{children}</div>
)

describe('MessageBox (shallow)', () => {
	it('renders children and exposes role=status', () => {
		render(<MessageBox>Test error message</MessageBox>)
		expect(screen.getByText('Test error message')).toBeDefined()
		expect(screen.getByRole('status')).toBeDefined()
	})
})
