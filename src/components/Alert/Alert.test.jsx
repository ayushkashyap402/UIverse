import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Alert from './Alert.jsx'

describe('Alert Component', () => {
  it('renders with default props', () => {
    render(<Alert />)
    const alertMsg = screen.getByText(/This is an alert message/i)
    expect(alertMsg).toBeInTheDocument()
    expect(alertMsg.parentElement).toHaveClass('uiverse-alert-info')
  })

  it('renders custom message and type', () => {
    render(<Alert type="error" message="Error occurred!" />)
    const alertMsg = screen.getByText(/Error occurred!/i)
    expect(alertMsg.parentElement).toHaveClass('uiverse-alert-error')
  })

  it('can be closed if closable is true', () => {
    render(<Alert message="Close me" closable />)
    const closeBtn = screen.getByRole('button', { name: /×/i })
    expect(closeBtn).toBeInTheDocument()
    fireEvent.click(closeBtn)
    expect(screen.queryByText(/Close me/i)).not.toBeInTheDocument()
  })
})
