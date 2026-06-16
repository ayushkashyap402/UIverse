// Input.jsx
// Props:
// label       -> input label
// placeholder -> placeholder text
// value       -> controlled value
// onChange    -> change handler
// type        -> text | email | password | number
// variant     -> default | success | error

import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

function Input({
  label = 'Label',
  placeholder = 'Enter text...',
  value = '',
  onChange,
  type = 'text',
  variant = 'default',
}) {
  return (
    <div className="uiverse-input-wrapper">
      {label && <label className="uiverse-input-label">{label}</label>}

      <input
        className={`uiverse-input uiverse-input--${variant}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  variant: PropTypes.oneOf(['default', 'success', 'error']),
}

export default Input
