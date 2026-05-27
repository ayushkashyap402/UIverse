import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from './Badge.jsx'

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge />)
    const badge = screen.getByText(/Badge/i)
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('uiverse-badge--primary')
    expect(badge).not.toHaveClass('uiverse-badge--pill')
  })

  it('applies variant and pill props correctly', () => {
    render(<Badge text="New" variant="success" pill />)
    const badge = screen.getByText(/New/i)
    expect(badge).toHaveClass('uiverse-badge--success')
    expect(badge).toHaveClass('uiverse-badge--pill')
  })
})
