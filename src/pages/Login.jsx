// Login.jsx – Dedicated login page for UIverse
// Matches existing purple/indigo/violet brand theme, supports light + dark mode

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

/* ── Icons (inline SVG — no extra deps) ── */

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#login-logo-grad)" strokeWidth="1.8">
    <defs>
      <linearGradient id="login-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

/* ── Component ── */

function Login() {
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [touched, setTouched]   = useState({})

  /* ── Validation ── */
  const validate = () => {
    const e = {}
    if (!email.trim())                          e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address'
    if (!password)                              e.password = 'Password is required'
    else if (password.length < 6)              e.password = 'Password must be at least 6 characters'
    return e
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const e = validate()
    setErrors(e)
  }

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const e2 = validate()
    setErrors(e2)
    if (Object.keys(e2).length > 0) return

    setLoading(true)
    // Simulate async login — replace with real auth call
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1400)
  }

  return (
    <div className="login-page">

      {/* Ambient background blobs */}
      <div className="login-blob login-blob--1" aria-hidden />
      <div className="login-blob login-blob--2" aria-hidden />
      <div className="login-blob login-blob--3" aria-hidden />

      {/* Grid overlay */}
      <div className="login-grid" aria-hidden />

      <div className="login-card">

        {/* ── Card Header ── */}
        <div className="login-card__header">
          <Link to="/" className="login-logo">
            <LogoIcon />
            <span>UIverse</span>
          </Link>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue building beautiful UIs</p>
        </div>

        {/* ── Social Login ── */}
        <div className="login-socials">
          <button type="button" className="social-btn social-btn--google" aria-label="Continue with Google">
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="social-btn social-btn--github" aria-label="Continue with GitHub">
            <GitHubIcon />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="login-divider">
          <span>or sign in with email</span>
        </div>

        {/* ── Form ── */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className={`form-group ${touched.email && errors.email ? 'form-group--error' : ''} ${touched.email && !errors.email && email ? 'form-group--valid' : ''}`}>
            <label className="form-label" htmlFor="login-email">Email address</label>
            <div className="form-input-wrap">
              <span className="form-icon"><MailIcon /></span>
              <input
                id="login-email"
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
            {touched.email && errors.email && (
              <p className="form-error" id="email-error" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={`form-group ${touched.password && errors.password ? 'form-group--error' : ''} ${touched.password && !errors.password && password ? 'form-group--valid' : ''}`}>
            <div className="form-label-row">
              <label className="form-label" htmlFor="login-password">Password</label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>
            <div className="form-input-wrap">
              <span className="form-icon"><LockIcon /></span>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                autoComplete="current-password"
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
            {touched.password && errors.password && (
              <p className="form-error" id="password-error" role="alert">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`login-submit ${loading ? 'login-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <span className="spinner" aria-hidden />
              : null}
            <span>{loading ? 'Signing in…' : 'Sign in'}</span>
          </button>

        </form>

        {/* ── Footer ── */}
        <p className="login-card__footer">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">Create one free</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
