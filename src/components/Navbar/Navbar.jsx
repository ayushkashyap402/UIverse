// Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

/* ================= ICONS ================= */

// Hamburger menu icon
const BarsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

// Close / X icon
const TimesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
)

// Sun icon for light mode
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
  </svg>
)

// Moon icon for dark mode
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

// GitHub icon
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
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

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  /* ================= HANDLERS ================= */

  const toggleTheme = (e) => {
    const x = e.clientX
    const y = e.clientY
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    if (!document.startViewTransition) {
      setDark(d => !d)
      return
    }
    document.documentElement.style.setProperty('--vt-x', `${x}px`)
    document.documentElement.style.setProperty('--vt-y', `${y}px`)
    document.documentElement.style.setProperty('--vt-r', `${radius}px`)
    document.startViewTransition(() => setDark(d => !d))
  }

  const handleOpenNavbar = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  /* ================= JSX ================= */

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

        {/* LOGO */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <LogoIcon />
          UIverse
        </Link>

        {/* DESKTOP LINKS - visible on larger screens */}
        <div className="navbar-links-desktop">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>

          <Link to="/components" className={`navbar-link ${location.pathname === '/components' ? 'active' : ''}`}>
            Components
          </Link>

          <a
            href="https://github.com/ayushkashyap402/UIverse"
            target="_blank"
            rel="noreferrer"
            className="navbar-link navbar-github"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>

          {/* Theme Toggle in Desktop Navbar */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="theme-text">{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button onClick={handleOpenNavbar} className="nav-btn">
          <BarsIcon />
        </button>
      </nav>

      {/* MOBILE DRAWER - Left Side Full Height */}
      <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className={`drawer ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          
          {/* Drawer Header */}
          <div className="drawer-header">
            <Link to="/" className="drawer-logo" onClick={closeMenu}>
              <LogoIcon />
              UIverse
            </Link>
            <button className="drawer-close-btn" onClick={closeMenu}>
              <TimesIcon />
            </button>
          </div>

          {/* Drawer Links - No Icons */}
          <div className="drawer-links">
            <Link to="/" onClick={closeMenu} className={`drawer-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>

            <Link to="/components" onClick={closeMenu} className={`drawer-link ${location.pathname === '/components' ? 'active' : ''}`}>
              Components
            </Link>

            <a
              href="https://github.com/ayushkashyap402/UIverse"
              target="_blank"
              rel="noreferrer"
              className="drawer-link drawer-github"
              onClick={closeMenu}
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>

            {/* Theme Toggle in Drawer - Mobile (Same as desktop style) */}
            <button className="drawer-theme-btn" onClick={toggleTheme}>
              {dark ? <SunIcon /> : <MoonIcon />}
              <span>{dark ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
