// Input.jsx

import React, { useState } from 'react'
import './Input.css'

function Input({
  label = '',
  type = 'text',
  placeholder = '',

  // Controlled props
  value,
  onChange,

  // Other props
  disabled = false,
  required = false,
  error = false,
  helperText = '',

  ...rest
}) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState('')

  const isControlled = value !== undefined

  const handleChange = (e) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="input-component">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <input
        className={`input-field ${error ? 'input-error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        {...rest}
      />

      {helperText && (
        <small className={`input-helper ${error ? 'error-text' : ''}`}>{helperText}</small>
      )}
    </div>
  )
}

export default Input
