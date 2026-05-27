// Navbar.jsx – Reusable Navbar component
//
// Props:
//   brand       (string)  – Brand / logo text displayed on the left
//   links       (array)   – Array of { label, href } objects for nav links
//   variant     (string)  – "default" | "transparent" | "solid" | "gradient"
//   sticky      (boolean) – Whether the navbar sticks to the top on scroll (default: true)
//   cta         (object)  – Optional CTA button: { label, href }
//   onLinkClick (func)    – Optional callback when a link is clicked
//
// To add a new variant: add CSS class uiverse-navbar--<name> in Navbar.css

import React, { useState, useEffect } from 'react'
import './Navbar.css'

/* ================= ICONS ================= */

const BarsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const TimesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
)

const DefaultBrandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>
  </svg>
)

/* ================= COMPONENT ================= */

function Navbar({
  brand = 'Brand',
  links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  variant = 'default',
  sticky = true,
  cta = null,
  onLinkClick = null,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!sticky) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [sticky])

  const handleLinkClick = (link) => {
    setIsOpen(false)
    if (onLinkClick) onLinkClick(link)
  }

  const navClasses = [
    'uiverse-navbar',
    `uiverse-navbar--${variant}`,
    sticky ? 'uiverse-navbar--sticky' : '',
    scrolled ? 'uiverse-navbar--scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav className={navClasses}>
      {/* BRAND */}
      <div className="uiverse-navbar-brand">
        <DefaultBrandIcon />
        <span className="uiverse-navbar-brand-text">{brand}</span>
      </div>

      {/* LINKS */}
      <div className={`uiverse-navbar-links ${isOpen ? 'uiverse-navbar-links--open' : ''}`}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            className="uiverse-navbar-link"
            onClick={() => handleLinkClick(link)}
          >
            {link.label}
          </a>
        ))}

        {cta && (
          <a
            href={cta.href}
            className="uiverse-navbar-cta"
            onClick={() => handleLinkClick(cta)}
          >
            {cta.label}
          </a>
        )}
      </div>

      {/* MOBILE TOGGLE */}
      <button
        className="uiverse-navbar-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <TimesIcon /> : <BarsIcon />}
      </button>
    </nav>
  )
}

export default Navbar