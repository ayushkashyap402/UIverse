// Components.jsx – Component showcase page
import React, { useState } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert'
import { componentsList } from '../data/componentsList.js'
import './Components.css'
import FooterC from '../components/FooterC/footerC.jsx'

/* ================= SECTIONS ================= */

const sections = [
  {
    id: 'buttons',
    label: 'Buttons',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="8" rx="3"/>
      </svg>
    ),
  },
  {
    id: 'badges',
    label: 'Badges',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7z"/>
      </svg>
    ),
  },
  {
  id: 'alerts',
  label: 'Alerts',
  icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 2L2 22h20L14 2z"/>
    </svg>
  ),
},
  {
    id: 'all-components',
    label: 'All Components',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
]
/* ================= ICONS ================= */

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ================= COMPONENT ================= */

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
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="comp-sidebar">
          <p className="sidebar-label">ON THIS PAGE</p>

          {sections.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item ${activeSection === s.id ? "sidebar-item--active" : ""}`}
              onClick={() => scrollTo(s.id)}
            >
              <span className="sidebar-item-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}

          <div className="sidebar-divider" />

          <p className="sidebar-label">CONTRIBUTE</p>

          <a
            href="https://github.com/ayushkashyap402/UIverse"
            target="_blank"
            rel="noreferrer"
            className="sidebar-item sidebar-item--link"
          >
            <span className="sidebar-item-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </span>
            GitHub Repo
          </a>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="comp-main">

          <div className="comp-header">
            <h1>Components</h1>
            <p>Production-ready UI components. Copy the code, drop it in, done.</p>
          </div>

          {/* ================= BUTTONS ================= */}
          <section className="comp-section" id="buttons">
            <div className="comp-section-header">
              <h2>Button</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <p className="comp-section-desc">
              Versatile button component with variants and sizes.
            </p>

            <div className="comp-preview">
              <Button text="Primary" variant="primary" />
              <Button text="Secondary" variant="secondary" />
              <Button text="Danger" variant="danger" />
              <Button text="Disabled" variant="disabled" />
            </div>

            <div className="code-block">
              <div className="code-block-header">
                <span>JSX</span>

                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(`<Button text="Primary" variant="primary" />`)
                  }
                >
                  {copied ? (
                    <>
                      <CheckIcon /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy
                    </>
                  )}
                </button>
              </div>

              <pre>{`<Button text="Primary" variant="primary" />`}</pre>
            </div>
          </section>

          {/* ================= BADGES ================= */}
          <section className="comp-section" id="badges">
            <div className="comp-section-header">
              <h2>Badge</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <div className="comp-preview">
              <Badge text="Primary" variant="primary" />
              <Badge text="Success" variant="success" />
              <Badge text="Warning" variant="warning" />
              <Badge text="Danger" variant="danger" />
            </div>
          </section>


          {/* ── Alert Section ── */}
<section className="comp-section" id="alerts">
  <div className="comp-section-header">
    <h2>Alert</h2>
    <span className="comp-badge comp-badge--stable">
      Stable
    </span>
  </div>

  <p className="comp-section-desc">
    Reusable alert component with multiple variants
    for success, error, warning, and informational
    messages.
  </p>

  {/* Variants */}
  <div className="comp-subsection">
    <h3 className="comp-subsection-title">
      Variants
    </h3>

    <div className="comp-preview">
      <Alert
        type="success"
        message="Action completed successfully!"
      />

      <Alert
        type="error"
        message="Something went wrong."
      />

      <Alert
        type="warning"
        message="Warning message here."
      />

      <Alert
        type="info"
        message="Information message."
      />

      <Alert
    type="info"
    message="Closable alert example."
    closable
      />
    </div>
  </div>

  {/* Code Block */}
  <div className="code-block">
    <div className="code-block-header">
      <span>JSX</span>

      <button
        className="copy-btn"
        onClick={() =>
          handleCopy(`<Alert type="success" message="Action completed successfully!" />
<Alert type="error" message="Something went wrong." />
<Alert type="warning" message="Warning message here." />
<Alert type="info" message="Information message." />
<Alert type="info" message="Closable alert example." closable />`)
        }
      >
        {copied ? '✅ Copied!' : '📋 Copy'}
      </button>
    </div>

    <pre>{`<Alert type="success" message="Action completed successfully!" />
<Alert type="error" message="Something went wrong." />
<Alert type="warning" message="Warning message here." />
<Alert type="info" message="Information message." />
<Alert type="info" message="Closable alert example." closable />`}</pre>
  </div>

  {/* Props Table */}
  <div className="comp-subsection">
    <h3 className="comp-subsection-title">Props</h3>

    <div className="props-table-wrap">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><code>type</code></td>
            <td>string</td>
            <td><code>"info"</code></td>
            <td>
              success · error · warning · info
            </td>
          </tr>

          <tr>
            <td><code>message</code></td>
            <td>string</td>
            <td>
              <code>"This is an alert"</code>
            </td>
            <td>Alert message text</td>
          </tr>

          <tr>
            <td><code>closable</code></td>
            <td>boolean</td>
            <td><code>false</code></td>
            <td>Shows close button</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section className="comp-section" id="footer">
  <div className="comp-section-header">
    <h2>Footer</h2>

    <span className="comp-badge comp-badge--stable">
      Stable
    </span>
  </div>

  <p className="comp-section-desc">
    Responsive reusable footer component with dynamic links and social icons.
  </p>

  {/* Preview */}
  <div className="comp-preview">
    <FooterC
      logo="UIverse"
      description="Reusable modern React components for developers."
      links={[
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Contact", href: "#" },
      ]}    />
  </div>

  {/* Code Block */}
  <div className="code-block">
    <div className="code-block-header">
      <span>JSX</span>

      <button
        className="copy-btn"
        onClick={() =>
          handleCopy(`<Footer
  logo="UIverse"
  links={[
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Contact", href: "#" },
  ]}
/>`)
        }
      >
        {copied ? (
          <>
            <CheckIcon /> Copied
          </>
        ) : (
          <>
            <CopyIcon /> Copy
          </>
        )}
      </button>
    </div>

    <pre>{`<Footer
  logo="UIverse"
  links={[
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Contact", href: "#" },
  ]}
/>`}</pre>
  </div>
</section>

          {/* ── All Components Table ── */}

          {/* ================= ALL COMPONENTS ================= */}

          <section className="comp-section" id="all-components">
            <div className="comp-section-header">
              <h2>All Components</h2>
            </div>

            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  {componentsList.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.category}</td>
                      <td>{c.status}</td>
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