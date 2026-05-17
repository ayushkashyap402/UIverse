// Alert.jsx
// Props:
// type      -> success | error | warning | info
// message   -> alert text
// closable  -> show close button

import React, { useState } from 'react'
import './Alert.css'

function Alert({
  type = 'info',
  message = 'This is an alert message',
  closable = false,
}) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className={`uiverse-alert uiverse-alert-${type}`}>
      <span className="uiverse-alert-message">
        {message}
      </span>

      {closable && (
        <button
          className="uiverse-alert-close"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Alert