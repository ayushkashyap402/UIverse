// Input.jsx – Reusable Input component with labels and error handling
//
// Props:
//   label       (string)   – The input title text displayed above the field
//   type        (string)   – Input text type (e.g., "text", "password", "email", "number")
//   placeholder (string)   – Placeholder text displayed inside the field
//   value       (string)   – Current controlled state value
//   onChange    (function) – Callback to update value state on type
//   error       (string)   – Optional error text message. Renders input borders in red.
//   id          (string)   – Optional input id (binds <label htmlFor> automatically)
//
// Features:
//   - Fully accessible label-to-input id linking
//   - Self-contained, simple validation visual states
//   - Native React controlled-state pattern

import React from 'react'
import './Input.css'

function Input({
  label,
  type = 'text',
  placeholder = 'Type here...',
  value,
  onChange,
  error,
  id
}) {
  // Generate a fallback id from label to satisfy accessibility if not provided
  const inputId = id || (label ? `uiverse-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  return (
    <div className={`uiverse-input-group ${error ? 'uiverse-input-group--error' : ''}`}>
      {/* Label linked via htmlFor for accessibility */}
      {label && (
        <label htmlFor={inputId} className="uiverse-input-label">
          {label}
        </label>
      )}

      {/* Controlled Input field */}
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="uiverse-input-field"
      />

      {/* Dynamic validation error text */}
      {error && (
        <span className="uiverse-input-error-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
