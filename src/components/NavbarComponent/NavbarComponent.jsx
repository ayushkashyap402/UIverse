// NavbarComponent.jsx – A simple, responsive, and beginner-friendly Navbar component
//
// Props:
//   brandName (string)  – The text logo to display on the left (default: "UIverse")
//   links     (array)   – Navigation items: array of { label: "Home", href: "#" }
//   variant   (string)  – Color theme: "light" (default) | "dark" | "primary"
//
// Features:
//   - Self-contained responsive hamburger menu
//   - Easy-to-understand state and event handlers
//   - Vanilla CSS styling

import React, { useState } from 'react'
import './NavbarComponent.css'

function NavbarComponent({ 
  brandName = 'UIverse', 
  links = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' }
  ], 
  variant = 'light' 
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle mobile menu drawer
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`uiverse-navbar uiverse-navbar--${variant}`}>
      <div className="uiverse-navbar-container">
        
        {/* Brand/Logo */}
        <a href="#" className="uiverse-navbar-brand">
          {brandName}
        </a>

        {/* Mobile Hamburger Button */}
        <button 
          className="uiverse-navbar-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            // Close (X) Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger Menu Icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div className={`uiverse-navbar-menu ${isOpen ? 'uiverse-navbar-menu--open' : ''}`}>
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="uiverse-navbar-link"
              onClick={() => setIsOpen(false)} // Close menu on click (mobile UX)
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </nav>
  )
}

export default NavbarComponent
