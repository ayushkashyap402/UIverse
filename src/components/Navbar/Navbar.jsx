// Navbar.jsx – Shared top navigation bar
// Used on both Home and Components pages

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const[isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleOpenNavbar = () =>{
    setIsOpen(prev=> !prev)
  }
  const closeMenu =() =>{
    setIsOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <span className="navbar-logo-icon">⬡</span>
        UIverse
      </Link>
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
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
      <button onClick = {handleOpenNavbar}
        className = "nav-btn"
        aria-label='toggle navigation button'>
          {isOpen ? <FaTimes />:<FaBars/> }
        </button>
    </nav>
  )
}

export default Navbar
