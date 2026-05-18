// Home.jsx – Landing page of UIverse

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Open Source · GSSoC Ready
        </div>
        <h1 className="hero-title">
          Build faster with <span className="hero-gradient">UIverse</span>
        </h1>
        <p className="hero-subtitle">
          A beginner-friendly React component library with clean CSS, zero dependencies,
          and a structure that's easy to contribute to.
        </p>
        <div className="hero-actions">
          <Link to="/components">
            <Button text="Browse Components →" variant="primary" size="lg" />
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button text="Star on GitHub" variant="secondary" size="lg" />
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">Components</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Variants each</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Dependencies</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">MIT</span>
            <span className="stat-label">License</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <h2 className="section-heading">Why UIverse?</h2>
        <p className="section-subheading">Everything you need to learn, build, and contribute — nothing you don't.</p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to contribute ── */}
      <section className="contribute-section">
        <div className="contribute-inner">
          <div className="contribute-text">
            <h2>Want to contribute?</h2>
            <p>
              UIverse is built for open-source contributors. Adding a new component
              takes just 3 steps — create, register, showcase. No complex setup needed.
            </p>
            <div className="steps">
              <div className="step"><span className="step-num">1</span>Create your component in <code>src/components/</code></div>
              <div className="step"><span className="step-num">2</span>Register it in <code>src/data/componentsList.js</code></div>
              <div className="step"><span className="step-num">3</span>Add a section in <code>src/pages/Components.jsx</code></div>
            </div>
          </div>
          <div className="contribute-cta">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button text="Fork on GitHub" variant="primary" size="lg" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>Made with care for the open-source community · UIverse 2025</p>
      </footer>
    </div>
  )
}

// SVG icon components (Lucide-style, 20×20)
const Icon = ({ d, children, viewBox = "0 0 24 24" }) => (
  <svg width="20" height="20" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
)

const features = [
  {
    icon: <Icon><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>,
    title: 'Plug & Play',
    desc: 'Drop any component into your project and it just works. No config, no wrappers.',
  },
  {
    icon: <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    title: 'Plain CSS',
    desc: 'No Tailwind, no CSS-in-JS. Just clean, readable stylesheets you can actually learn from.',
  },
  {
    icon: <Icon><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></Icon>,
    title: 'Zero Extra Deps',
    desc: 'Only React and React Router. Keeps your bundle lean and your project simple.',
  },
  {
    icon: <Icon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
    title: 'GSSoC Ready',
    desc: 'Structured for open-source contributions. Clear folders, clear comments, clear path.',
  },
  {
    icon: <Icon><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>,
    title: 'Beginner Friendly',
    desc: 'Every file is commented. Every pattern is explained. Perfect for learning React.',
  },
  {
    icon: <Icon><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>,
    title: 'Vite Powered',
    desc: 'Instant HMR and lightning-fast builds out of the box with Vite 5.',
  },
]

export default Home
