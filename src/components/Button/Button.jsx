// Button.jsx – Reusable Button component
//
// Props:
//   text     (string)  – Label displayed inside the button
//   variant  (string)  – Visual style: "primary" | "secondary" | "danger"
//   onClick  (func)    – Optional click handler
//
// Usage:
//   <Button text="Click me" variant="primary" onClick={() => alert('Hi!')} />
//
// To add a new variant:
//   1. Add the variant name to the prop below
//   2. Add a matching CSS class in Button.css

import React from 'react'
import './Button.css'

function Button({ text = 'Button', variant = 'primary', onClick }) {
  return (
    <button
      className={`uiverse-btn uiverse-btn--${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
