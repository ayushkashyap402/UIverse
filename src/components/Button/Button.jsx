// Button.jsx – Reusable Button component
//
// Props:
//   text     (string)  – Label displayed inside the button
//   variant  (string)  – "primary" | "secondary" | "danger"
//   size     (string)  – "sm" | "md" (default) | "lg"
//   onClick  (func)    – Optional click handler
//
// To add a new variant: add CSS class uiverse-btn--<name> in Button.css
// To add a new size:    add CSS class uiverse-btn--<size> in Button.css

import React from 'react'
import './Button.css'

function Button({ text = 'Button', variant = 'primary', size = 'md', onClick }) {
  return (
    <button
      className={`uiverse-btn uiverse-btn--${variant} uiverse-btn--${size}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
