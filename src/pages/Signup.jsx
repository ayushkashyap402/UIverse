// Signup.jsx – Registration page for UIverse
// Matches existing purple/indigo/violet brand theme, supports light + dark mode

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'

/* ── Icons (inline SVG — no extra deps) ── */

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#signup-logo-grad)" strokeWidth="1.8">
    <defs>
      <linearGradient id="signup-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
  </svg>
)

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ── Password Strength ── */
const getStrength = (pwd) => {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthClass = ['', 'strength--weak', 'strength--fair', 'strength--good', 'strength--strong']

/* ── Component ── */

function Signup() {
  const navigate = useNavigate()

  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [showConf, setShowConf]     = useState(false)
  const [agreed, setAgreed]         = useState(false)
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(false)
  const [touched, setTouched]       = useState({})

  const pwdStrength = getStrength(password)

  /* ── Validation ── */
  const validate = () => {
    const e = {}
    if (!name.trim())                              e.name = 'Full name is required'
    else if (name.trim().length < 2)               e.name = 'Name must be at least 2 characters'
    if (!email.trim())                             e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
    if (!password)                                 e.password = 'Password is required'
    else if (password.length < 8)                  e.password = 'Password must be at least 8 characters'
    if (!confirm)                                  e.confirm = 'Please confirm your password'
    else if (confirm !== password)                 e.confirm = 'Passwords do not match'
    if (!agreed)                                   e.agreed = 'You must agree to the Terms of Service'
    return e
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true, agreed: true })
    const e2 = validate()
    setErrors(e2)
    if (Object.keys(e2).length > 0) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1600)
  }

  const fieldValid = (field) => touched[field] && !errors[field]
  const fieldError = (field) => touched[field] && errors[field]

  return (
    <div className="signup-page">

      {/* Ambient background blobs */}
      <div className="signup-blob signup-blob--1" aria-hidden />
      <div className="signup-blob signup-blob--2" aria-hidden />
      <div className="signup-blob signup-blob--3" aria-hidden />

      {/* Grid overlay */}
      <div className="signup-grid" aria-hidden />

      <div className="signup-card">

        {/* ── Card Header ── */}
        <div className="signup-card__header">
          <Link to="/" className="signup-logo">
            <LogoIcon />
            <span>UIverse</span>
          </Link>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">Join thousands of developers building beautiful UIs</p>
        </div>

        {/* ── Social Signup ── */}
        <div className="signup-socials">
          <button type="button" className="social-btn social-btn--google" aria-label="Sign up with Google">
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>
          <button type="button" className="social-btn social-btn--github" aria-label="Sign up with GitHub">
            <GitHubIcon />
            <span>Sign up with GitHub</span>
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="signup-divider">
          <span>or sign up with email</span>
        </div>

        {/* ── Form ── */}
        <form className="signup-form" onSubmit={handleSubmit} noValidate>

          {/* Full Name */}
          <div className={`form-group ${fieldError('name') ? 'form-group--error' : ''} ${fieldValid('name') ? 'form-group--valid' : ''}`}>
            <label className="form-label" htmlFor="signup-name">Full name</label>
            <div className="form-input-wrap">
              <span className="form-icon"><UserIcon /></span>
              <input
                id="signup-name"
                type="text"
                className="form-input"
                placeholder="Jane Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => handleBlur('name')}
                autoComplete="name"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </div>
            {fieldError('name') && (
              <p className="form-error" id="name-error" role="alert">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className={`form-group ${fieldError('email') ? 'form-group--error' : ''} ${fieldValid('email') ? 'form-group--valid' : ''}`}>
            <label className="form-label" htmlFor="signup-email">Email address</label>
            <div className="form-input-wrap">
              <span className="form-icon"><MailIcon /></span>
              <input
                id="signup-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                autoComplete="email"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {fieldError('email') && (
              <p className="form-error" id="email-error" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={`form-group ${fieldError('password') ? 'form-group--error' : ''} ${fieldValid('password') ? 'form-group--valid' : ''}`}>
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className="form-input-wrap">
              <span className="form-icon"><LockIcon /></span>
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                autoComplete="new-password"
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {fieldError('password') && (
              <p className="form-error" id="password-error" role="alert">{errors.password}</p>
            )}
            {/* Strength meter */}
            {password && (
              <div className="strength-meter" aria-label={`Password strength: ${strengthLabel[pwdStrength]}`}>
                <div className="strength-bars">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`strength-bar ${i <= pwdStrength ? strengthClass[pwdStrength] : ''}`}
                    />
                  ))}
                </div>
                <span className={`strength-label ${strengthClass[pwdStrength]}`}>
                  {strengthLabel[pwdStrength]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={`form-group ${fieldError('confirm') ? 'form-group--error' : ''} ${fieldValid('confirm') ? 'form-group--valid' : ''}`}>
            <label className="form-label" htmlFor="signup-confirm">Confirm password</label>
            <div className="form-input-wrap">
              <span className="form-icon"><LockIcon /></span>
              <input
                id="signup-confirm"
                type={showConf ? 'text' : 'password'}
                className="form-input"
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onBlur={() => handleBlur('confirm')}
                autoComplete="new-password"
                aria-describedby={errors.confirm ? 'confirm-error' : undefined}
              />
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowConf(v => !v)}
                aria-label={showConf ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConf ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {fieldError('confirm') && (
              <p className="form-error" id="confirm-error" role="alert">{errors.confirm}</p>
            )}
            {fieldValid('confirm') && confirm === password && (
              <p className="form-match"><CheckIcon /> Passwords match</p>
            )}
          </div>

          {/* Terms */}
          <div className={`terms-group ${fieldError('agreed') ? 'terms-group--error' : ''}`}>
            <label className="terms-label">
              <input
                type="checkbox"
                className="terms-checkbox"
                checked={agreed}
                onChange={e => {
                  setAgreed(e.target.checked)
                  setTouched(prev => ({ ...prev, agreed: true }))
                  setErrors(prev => {
                    const n = { ...prev }
                    if (e.target.checked) delete n.agreed
                    else n.agreed = 'You must agree to the Terms of Service'
                    return n
                  })
                }}
              />
              <span className="terms-custom-check" aria-hidden>
                {agreed && <CheckIcon />}
              </span>
              <span className="terms-text">
                I agree to the{' '}
                <Link to="/terms" className="terms-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </span>
            </label>
            {fieldError('agreed') && (
              <p className="form-error" role="alert">{errors.agreed}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`signup-submit ${loading ? 'signup-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading ? <span className="spinner" aria-hidden /> : null}
            <span>{loading ? 'Creating account…' : 'Create account'}</span>
          </button>

        </form>

        {/* ── Footer ── */}
        <p className="signup-card__footer">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Sign in</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup
