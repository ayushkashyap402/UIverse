// BackToTop.jsx
// Floating action button that appears after scrolling down ~300px.
// Smoothly scrolls the page back to the top on click.
//
// Props:
//   threshold (number) – scroll distance in px before button appears (default: 300)

import React, { useState, useEffect } from 'react'
import './BackToTop.css'

function BackToTop({ threshold = 300 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Check on mount in case the page is already scrolled
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      id="back-to-top-btn"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default BackToTop
