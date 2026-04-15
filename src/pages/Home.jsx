// Home.jsx – Landing page of UIverse
// This is the first page users see when they visit the app

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        {/* Main headline */}
        <h1 className="home-title">Welcome to UIverse 🚀</h1>

        <p className="home-subtitle">
          A beginner-friendly, open-source React UI component library.
          <br />
          Built for learners. Ready for contributors.
        </p>

        {/* Navigate to the components showcase */}
        <Link to="/components">
          <Button text="Explore Components" variant="primary" />
        </Link>
      </div>

      {/* Feature highlights */}
      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🧩</span>
          <h3>Reusable Components</h3>
          <p>Drop-in components that work out of the box.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎨</span>
          <h3>Clean CSS</h3>
          <p>No heavy frameworks — just clean, readable styles.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🤝</span>
          <h3>Open Source</h3>
          <p>GSSoC-ready. Easy to contribute and extend.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
