// NotFound.jsx – Custom 404 Error page displayed for unhandled routes
//
// Matches the visual layout and variable tokens established in Components.css
// to ensure consistency across both dark and light theme states.

import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="uiverse-notfound">
      <div className="uiverse-notfound-content">
        <h1 className="uiverse-notfound-title">404</h1>
        <p className="uiverse-notfound-text">The page you are looking for has been moved or does not exist.</p>
        <Link to="/" className="uiverse-notfound-btn">
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound