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
        <div className="hero-badge">✨ Open Source · GSSoC Ready</div>
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
            <Button text="⭐ Star on GitHub" variant="secondary" size="lg" />
          </a>
        </div>

        {/* Stats row */}
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
        <p>Made with ❤️ for the open-source community · UIverse 2025</p>
      </footer>
    </div>
  )
}

const features = [
  { icon: '🧩', title: 'Plug & Play', desc: 'Drop any component into your project and it just works. No config, no wrappers.' },
  { icon: '🎨', title: 'Plain CSS', desc: 'No Tailwind, no CSS-in-JS. Just clean, readable stylesheets you can actually learn from.' },
  { icon: '📦', title: 'Zero Extra Deps', desc: 'Only React and React Router. Keeps your bundle lean and your project simple.' },
  { icon: '🤝', title: 'GSSoC Ready', desc: 'Structured for open-source contributions. Clear folders, clear comments, clear path.' },
  { icon: '📖', title: 'Beginner Friendly', desc: 'Every file is commented. Every pattern is explained. Perfect for learning React.' },
  { icon: '⚡', title: 'Vite Powered', desc: 'Instant HMR and lightning-fast builds out of the box with Vite 5.' },
]

export default Home
