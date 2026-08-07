// ForgotPassword.jsx – Password reset page for UIverse
// Matches existing purple/indigo/violet brand theme, supports light + dark mode

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPassword.css'

/* ── Icons ── */

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#fp-logo-grad)" strokeWidth="1.8">
    <defs>
      <linearGradient id="fp-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
  </svg>
)

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#shield-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="url(#check-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="check-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

const MailSentIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="mail-sent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="url(#mail-sent-grad)" strokeWidth="1.5"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="url(#mail-sent-grad)" strokeWidth="1.5"/>
    <circle cx="18" cy="6" r="4" fill="url(#mail-sent-grad)" stroke="none"/>
    <path d="M16.5 6l1 1 2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Component ── */

function ForgotPassword() {
  const [email, setEmail]       = useState('')
  const [error, setError]       = useState('')
  const [touched, setTouched]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [sent, setSent]         = useState(false)

  const validate = (val) => {
    if (!val.trim())                                 return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))   return 'Enter a valid email address'
    return ''
  }

  const handleBlur = () => {
    setTouched(true)
    setError(validate(email))
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (touched) setError(validate(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    const err = validate(email)
    setError(err)
    if (err) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1600)
  }

  const handleResend = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <div className="fp-page">

      {/* Ambient blobs */}
      <div className="fp-blob fp-blob--1" aria-hidden />
      <div className="fp-blob fp-blob--2" aria-hidden />
      <div className="fp-blob fp-blob--3" aria-hidden />

      {/* Grid overlay */}
      <div className="fp-grid" aria-hidden />

      <div className="fp-card">

        {/* Back link */}
        <Link to="/login" className="fp-back">
          <ArrowLeftIcon />
          <span>Back to sign in</span>
        </Link>

        {!sent ? (
          /* ── Request form ── */
          <>
            <div className="fp-card__header">
              <Link to="/" className="fp-logo">
                <LogoIcon />
                <span>UIverse</span>
              </Link>

              <div className="fp-icon-wrap" aria-hidden>
                <ShieldIcon />
              </div>

              <h1 className="fp-title">Forgot your password?</h1>
              <p className="fp-subtitle">
                No worries — enter your email and we'll send you a reset link right away.
              </p>
            </div>

            <form className="fp-form" onSubmit={handleSubmit} noValidate>

              <div className={`fp-field ${touched && error ? 'fp-field--error' : ''} ${touched && !error && email ? 'fp-field--valid' : ''}`}>
                <label className="fp-label" htmlFor="fp-email">Email address</label>
                <div className="fp-input-wrap">
                  <span className="fp-field-icon"><MailIcon /></span>
                  <input
                    id="fp-email"
                    type="email"
                    className="fp-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    aria-describedby={error ? 'fp-email-error' : undefined}
                  />
                </div>
                {touched && error && (
                  <p className="fp-error" id="fp-email-error" role="alert">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className={`fp-submit ${loading ? 'fp-submit--loading' : ''}`}
                disabled={loading}
              >
                {loading ? <span className="spinner" aria-hidden /> : null}
                <span>{loading ? 'Sending link…' : 'Send reset link'}</span>
              </button>

            </form>

            {/* Security note */}
            <div className="fp-security-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>The link expires in 15 minutes for your security.</span>
            </div>

            <p className="fp-card__footer">
              Remember your password?{' '}
              <Link to="/login" className="fp-footer-link">Sign in</Link>
            </p>
          </>
        ) : (
          /* ── Success state ── */
          <div className="fp-success">
            <div className="fp-success__icon">
              <MailSentIcon />
            </div>
            <h2 className="fp-success__title">Check your inbox</h2>
            <p className="fp-success__body">
              We've sent a password reset link to{' '}
              <strong className="fp-success__email">{email}</strong>.
              Check your spam folder if it doesn't arrive within a minute.
            </p>

            <div className="fp-success__steps">
              <div className="fp-step">
                <span className="fp-step__num">1</span>
                <span className="fp-step__text">Open the email from UIverse</span>
              </div>
              <div className="fp-step">
                <span className="fp-step__num">2</span>
                <span className="fp-step__text">Click "Reset my password"</span>
              </div>
              <div className="fp-step">
                <span className="fp-step__num">3</span>
                <span className="fp-step__text">Create a new strong password</span>
              </div>
            </div>

            <button
              type="button"
              className={`fp-resend ${loading ? 'fp-resend--loading' : ''}`}
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? <span className="spinner spinner--sm" aria-hidden /> : null}
              <span>{loading ? 'Resending…' : 'Resend email'}</span>
            </button>

            <p className="fp-success__footer">
              <Link to="/login" className="fp-footer-link">← Back to sign in</Link>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword
