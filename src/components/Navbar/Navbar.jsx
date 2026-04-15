// Navbar.jsx – Shared top navigation bar
// Used on both Home and Components pages

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar-logo">
        <span className="navbar-logo-icon">⬡</span>
        UIverse
      </Link>

      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/components" className={`navbar-link ${location.pathname === '/components' ? 'active' : ''}`}>
          Components
        </Link>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="navbar-link navbar-github"
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}

export default Navbar
