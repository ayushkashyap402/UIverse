import React from 'react'
import PropTypes from 'prop-types'
import './Badge.css'

function Badge({ text = 'Badge', variant = 'primary', pill = false }) {
  return (
    <span
      className={`uiverse-badge uiverse-badge--${variant} ${pill ? 'uiverse-badge--pill' : ''}`}
    >
      {text}
    </span>
  )
}

Badge.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
  pill: PropTypes.bool,
}

export default Badge
