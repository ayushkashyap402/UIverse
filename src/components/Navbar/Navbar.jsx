import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import './Navbar.css'

/* ================= ICONS ================= */

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3"/>
  </svg>
)

const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" strokeWidth="1.8">
    <defs>
      <linearGradient id="logo-grad">
        <stop offset="0%" stopColor="#4f46e5"/>
        <stop offset="100%" stopColor="#a855f7"/>
      </linearGradient>
    </defs>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
  </svg>
)

/* ================= COMPONENT ================= */

function Navbar() {
  const location = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Theme state
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('uiverse-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  /* ================= EFFECTS ================= */

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('uiverse-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ================= HANDLERS ================= */

  const toggleTheme = () => {
    setDark(prev => !prev)
  }

  const handleOpenNavbar = () => {
    setIsOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  /* ================= JSX ================= */

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      {/* LOGO */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <LogoIcon />
        UIverse
      </Link>

      {/* LINKS */}
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>

        <Link to="/" onClick={closeMenu}
          className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>

        <Link to="/components" onClick={closeMenu}
          className={`navbar-link ${location.pathname === '/components' ? 'active' : ''}`}>
          Components
        </Link>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="navbar-link navbar-github"
        >
          GitHub
        </a>

        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

      </div>

      {/* MOBILE BUTTON */}
      <button
        onClick={handleOpenNavbar}
        className="nav-btn"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

    </nav>
  )
}

export default Navbar