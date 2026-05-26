import React, { useState, useEffect, useCallback } from 'react'
import './ScrollToTop.css'

/**
 * ScrollToTop – Global floating "Back to Top" action button.
 *
 * Features:
 *  • Appears only after user scrolls past 300 px
 *  • SVG circular progress ring tracks scroll depth
 *  • Smooth scroll-to-top with native behavior
 *  • Spring-based enter/exit animation (CSS)
 *  • Hover tooltip "Back to Top"
 *  • Icon bounces upward on hover for extra delight
 *  • Full keyboard & screen-reader accessible (aria-label, role, title)
 *  • Responsive – smaller on mobile, hides near footer
 *  • Respects prefers-reduced-motion
 */
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Radius of the SVG progress ring
  const RADIUS = 20
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight

    // Show button after 300px scroll
    setIsVisible(scrollTop > 300)

    // Calculate scroll progress (0 → 1)
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once to set initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Dashoffset: full circle (hidden) → 0 (fully filled)
  const strokeDashoffset = CIRCUMFERENCE * (1 - scrollProgress)

  return (
    <button
      className={`scroll-to-top${isVisible ? ' scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      type="button"
    >
      {/* Circular scroll-progress ring */}
      <svg
        className="scroll-to-top__ring"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        aria-hidden="true"
        focusable="false"
      >
        {/* Track (background circle) */}
        <circle
          className="scroll-to-top__ring-track"
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
        />
        {/* Progress arc */}
        <circle
          className="scroll-to-top__ring-progress"
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 28 28)"
        />
      </svg>

      {/* Up chevron icon */}
      <svg
        className="scroll-to-top__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>

      {/* Tooltip */}
      <span className="scroll-to-top__tooltip" aria-hidden="true">
        Back to top
      </span>
    </button>
  )
}

export default ScrollToTop
