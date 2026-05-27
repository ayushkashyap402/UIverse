import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button.jsx'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button />)
    const button = screen.getByRole('button', { name: /Button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('uiverse-btn--primary')
    expect(button).toHaveClass('uiverse-btn--md')
  })

  it('applies variant and size props correctly', () => {
    render(<Button text="Submit" variant="danger" size="lg" />)
    const button = screen.getByRole('button', { name: /Submit/i })
    expect(button).toHaveClass('uiverse-btn--danger')
    expect(button).toHaveClass('uiverse-btn--lg')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
