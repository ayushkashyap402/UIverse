// Components.jsx – Component showcase page
// To add a new section: add an entry to `sections` array and create the JSX below

import React, { useState } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

// Sidebar navigation items
const sections = [
  { id: 'buttons', label: '🔘 Buttons' },
  { id: 'all-components', label: '📋 All Components' },
]

function Components() {
  const [activeSection, setActiveSection] = useState('buttons')
  const [copied, setCopied] = useState(false)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const scrollTo = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">

        {/* ── Sidebar ── */}
        <aside className="comp-sidebar">
          <p className="sidebar-label">ON THIS PAGE</p>
          {sections.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item ${activeSection === s.id ? 'sidebar-item--active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}

          <div className="sidebar-divider" />
          <p className="sidebar-label">CONTRIBUTE</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="sidebar-item sidebar-item--link"
          >
            ↗ GitHub Repo
          </a>
        </aside>

        {/* ── Main content ── */}
        <main className="comp-main">
          <div className="comp-header">
            <h1>Components</h1>
            <p>Production-ready UI components. Copy the code, drop it in, done.</p>
          </div>

          {/* ── Buttons Section ── */}
          <section className="comp-section" id="buttons">
            <div className="comp-section-header">
              <h2>Button</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>
            <p className="comp-section-desc">
              Versatile button component with 3 variants and 3 sizes. Supports any click handler.
            </p>

            {/* Variants */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Variants</h3>
              <div className="comp-preview">
                <Button text="Primary" variant="primary" />
                <Button text="Secondary" variant="secondary" />
                <Button text="Danger" variant="danger" />
              </div>
            </div>

            {/* Sizes */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Sizes</h3>
              <div className="comp-preview comp-preview--align-end">
                <Button text="Small" variant="primary" size="sm" />
                <Button text="Medium" variant="primary" size="md" />
                <Button text="Large" variant="primary" size="lg" />
              </div>
            </div>

            {/* Code block */}
            <div className="code-block">
              <div className="code-block-header">
                <span>JSX</span>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(`<Button text="Primary"   variant="primary" />\n<Button text="Secondary" variant="secondary" />\n<Button text="Danger"    variant="danger" />\n\n{/* Sizes */}\n<Button text="Small"  variant="primary" size="sm" />\n<Button text="Medium" variant="primary" size="md" />\n<Button text="Large"  variant="primary" size="lg" />`)}
                >
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
              <pre>{`<Button text="Primary"   variant="primary" />
<Button text="Secondary" variant="secondary" />
<Button text="Danger"    variant="danger" />

{/* Sizes */}
<Button text="Small"  variant="primary" size="sm" />
<Button text="Medium" variant="primary" size="md" />
<Button text="Large"  variant="primary" size="lg" />`}</pre>
            </div>

            {/* Props table */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Props</h3>
              <div className="props-table-wrap">
                <table className="props-table">
                  <thead>
                    <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>text</code></td><td>string</td><td><code>"Button"</code></td><td>Label text</td></tr>
                    <tr><td><code>variant</code></td><td>string</td><td><code>"primary"</code></td><td>primary · secondary · danger</td></tr>
                    <tr><td><code>size</code></td><td>string</td><td><code>"md"</code></td><td>sm · md · lg</td></tr>
                    <tr><td><code>onClick</code></td><td>function</td><td>—</td><td>Click handler</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── All Components Table ── */}
          <section className="comp-section" id="all-components">
            <div className="comp-section-header">
              <h2>All Components</h2>
            </div>
            <p className="comp-section-desc">
              Full registry of current and upcoming UIverse components.
            </p>
            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr><th>Name</th><th>Category</th><th>Status</th><th>Description</th></tr>
                </thead>
                <tbody>
                  {componentsList.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td><span className="category-tag">{c.category}</span></td>
                      <td>
                        <span className={`comp-badge comp-badge--${c.status.toLowerCase()}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default Components
