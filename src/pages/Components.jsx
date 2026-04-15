// Components.jsx – Showcase page for all UIverse components
// To add a new component section: import it and add a new <section> block below

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

function Components() {
  return (
    <div className="components-page">

      {/* Top navigation bar */}
      <nav className="components-nav">
        <Link to="/" className="nav-logo">UIverse 🚀</Link>
        <span className="nav-tagline">Component Showcase</span>
      </nav>

      <div className="components-container">
        <h1 className="components-heading">UI Components</h1>
        <p className="components-subheading">
          Browse all available components. Click a variant to see it in action.
        </p>

        {/* ── Button Section ── */}
        <section className="component-section" id="buttons">
          <h2 className="section-title">Buttons</h2>
          <p className="section-description">
            The <code>Button</code> component supports three variants:
            <strong> primary</strong>, <strong>secondary</strong>, and <strong>danger</strong>.
          </p>

          <div className="component-preview">
            {/* Primary button – main call-to-action */}
            <Button text="Primary" variant="primary" />

            {/* Secondary button – less prominent action */}
            <Button text="Secondary" variant="secondary" />

            {/* Danger button – destructive or warning action */}
            <Button text="Danger" variant="danger" />
          </div>

          {/* Usage code snippet */}
          <div className="code-block">
            <pre>{`<Button text="Primary"   variant="primary" />
<Button text="Secondary" variant="secondary" />
<Button text="Danger"    variant="danger" />`}</pre>
          </div>
        </section>

        {/* ── Component Metadata Table ── */}
        <section className="component-section" id="all-components">
          <h2 className="section-title">All Components</h2>
          <div className="components-table-wrapper">
            <table className="components-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {componentsList.map((comp) => (
                  <tr key={comp.id}>
                    <td><strong>{comp.name}</strong></td>
                    <td>{comp.category}</td>
                    <td>
                      <span className={`status-badge status-${comp.status.toLowerCase()}`}>
                        {comp.status}
                      </span>
                    </td>
                    <td>{comp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Components
