// GettingStarted.jsx – Documentation & onboarding page
//
// Walks a brand-new user from cloning the repo to rendering their first
// UIverse component, then points them toward contributing.
//
// To add a new section: add an entry to `sections` and create the matching
// <section id="..."> below — the sidebar wires itself up automatically and
// the active item is tracked on scroll.

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import './Components.css' // shared layout + code-block + table styles
import './GettingStarted.css'

const REPO_URL = 'https://github.com/ayushkashyap402/UIverse'

// Sidebar items — `id` must match the section element id
const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'installation', label: 'Installation' },
  { id: 'project-structure', label: 'Project Structure' },
  { id: 'using-a-component', label: 'Using a Component' },
  { id: 'add-component', label: 'Add Your Own' },
  { id: 'next-steps', label: 'Next Steps' },
]

// Self-contained code block with its own copy-to-clipboard state
function CodeBlock({ label = 'BASH', code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{label}</span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

// Scroll progress bar — tracks how far the user has scrolled
function ScrollProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Set initial state
    updateProgress()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  )
}

// Labeled note box (replaces emoji callouts)
function Note({ label = 'Note', children }) {
  return (
    <div className="doc-callout">
      <span className="doc-callout-label">{label}</span>
      <span>{children}</span>
    </div>
  )
}

function GettingStarted() {
  const [activeSection, setActiveSection] = useState('introduction')
  // Table of contents — collapsed by default on mobile
  const [tocOpen, setTocOpen] = useState(false)

  // While the user is mid-click-scroll, pause the observer so the active
  // item lands on the clicked section instead of flickering through others.
  const clickScrolling = useRef(false)

  const activeLabel =
    sections.find((s) => s.id === activeSection)?.label ?? sections[0].label

  const scrollTo = (id) => {
    clickScrolling.current = true
    setActiveSection(id)
    setTocOpen(false) // collapse the mobile TOC after picking a section
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      clickScrolling.current = false
    }, 700)
  }

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrolling.current) return
        // Pick the entry nearest the top of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="comp-page">
      <Navbar />
      <ScrollProgressBar />

      <div className="comp-layout">
        {/* ── Sidebar / table of contents ── */}
        <aside className="comp-sidebar doc-toc">
          <button
            type="button"
            className="doc-toc-toggle"
            aria-expanded={tocOpen}
            aria-controls="doc-toc-list"
            onClick={() => setTocOpen((open) => !open)}
          >
            <span className="doc-toc-toggle-text">
              <span className="doc-toc-toggle-eyebrow">On this page</span>
              <span className="doc-toc-toggle-current">{activeLabel}</span>
            </span>
            <span
              className={`doc-toc-caret ${
                tocOpen ? 'doc-toc-caret--open' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            id="doc-toc-list"
            className={`doc-toc-list ${tocOpen ? 'doc-toc-list--open' : ''}`}
          >
            <p className="sidebar-label">GETTING STARTED</p>
            {sections.map((s) => (
              <button
                key={s.id}
                className={`sidebar-item ${
                  activeSection === s.id ? 'sidebar-item--active' : ''
                }`}
                aria-current={activeSection === s.id ? 'true' : undefined}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}

            <div className="sidebar-divider" />
            <p className="sidebar-label">CONTRIBUTE</p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-item--link"
            >
              GitHub Repository
            </a>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="comp-main">
          <div className="comp-header">
            <h1>Getting Started</h1>
            <p>From a fresh clone to your first UIverse component.</p>
          </div>

          {/* ── Introduction ── */}
          <section className="comp-section" id="introduction">
            <div className="comp-section-header">
              <h2>Introduction</h2>
              <span className="comp-badge comp-badge--stable">Guide</span>
            </div>
            <div className="doc-prose">
              <p>
                <strong>UIverse</strong> is a beginner-friendly, open-source
                React component library built with plain CSS and zero extra
                dependencies. Components are designed to be copied, dropped in,
                and customized — no build configuration or wrappers required.
              </p>
              <p>This guide covers everything you need to:</p>
              <ul className="doc-list">
                <li>Set up the project locally and run the dev server.</li>
                <li>Understand how the codebase is organized.</li>
                <li>Use an existing component inside your own app.</li>
                <li>Contribute your own component back to UIverse.</li>
              </ul>
              <Note label="Tip">
                Already have the repo running? Jump straight to the{' '}
                <Link to="/components">Components</Link> page to browse
                copy-paste ready UI.
              </Note>
            </div>
          </section>

          {/* ── Prerequisites ── */}
          <section className="comp-section" id="prerequisites">
            <div className="comp-section-header">
              <h2>Prerequisites</h2>
            </div>
            <p className="comp-section-desc">
              A couple of common tools are required before you begin.
            </p>
            <ul className="doc-list">
              <li>
                <span>
                  <strong>Node.js 18 or newer</strong> — verify with{' '}
                  <code>node -v</code>.
                </span>
              </li>
              <li>
                <span>
                  <strong>npm</strong> (bundled with Node) — verify with{' '}
                  <code>npm -v</code>.
                </span>
              </li>
              <li>
                <span>
                  <strong>Git</strong> — required to clone the repository.
                </span>
              </li>
              <li>
                <span>Basic familiarity with React components and JSX.</span>
              </li>
            </ul>
          </section>

          {/* ── Installation ── */}
          <section className="comp-section" id="installation">
            <div className="comp-section-header">
              <h2>Installation</h2>
            </div>
            <p className="comp-section-desc">
              Clone the repository, install dependencies, and start the dev
              server.
            </p>

            <div className="comp-subsection">
              <h3 className="comp-subsection-title">1 · Clone &amp; install</h3>
              <CodeBlock
                code={`git clone ${REPO_URL}.git
cd UIverse
npm install`}
              />
            </div>

            <div className="comp-subsection">
              <h3 className="comp-subsection-title">2 · Start the dev server</h3>
              <CodeBlock code={`npm run dev`} />
              <Note>
                Vite prints a local URL — open{' '}
                <code>http://localhost:5173</code> in your browser. Edits
                hot-reload instantly.
              </Note>
            </div>

            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Available scripts</h3>
              <div className="props-table-wrap">
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Command</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>npm run dev</code>
                      </td>
                      <td>Start the Vite dev server with hot reload</td>
                    </tr>
                    <tr>
                      <td>
                        <code>npm run build</code>
                      </td>
                      <td>Create an optimized production build</td>
                    </tr>
                    <tr>
                      <td>
                        <code>npm run preview</code>
                      </td>
                      <td>Preview the production build locally</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── Project Structure ── */}
          <section className="comp-section" id="project-structure">
            <div className="comp-section-header">
              <h2>Project Structure</h2>
            </div>
            <p className="comp-section-desc">
              A quick map of the folders you will work with most.
            </p>
            <CodeBlock
              label="STRUCTURE"
              code={`src/
├─ components/        Reusable UI components
│  ├─ Button/         Button.jsx + Button.css
│  ├─ Badge/          Badge.jsx + Badge.css
│  └─ Navbar/         Shared navigation bar
├─ pages/             Route-level pages
│  ├─ Home.jsx        Landing page
│  ├─ Components.jsx  Component showcase
│  └─ GettingStarted.jsx  This guide
├─ data/
│  └─ componentsList.js   Component metadata registry
├─ App.jsx            Route definitions
└─ main.jsx           App entry point`}
            />
            <Note>
              Each component lives in its own folder with a co-located{' '}
              <code>.css</code> file — keep that pattern when adding new ones.
            </Note>
          </section>

          {/* ── Using a Component ── */}
          <section className="comp-section" id="using-a-component">
            <div className="comp-section-header">
              <h2>Using a Component</h2>
            </div>
            <p className="comp-section-desc">
              Import a component and render it with props. Below is a working
              example using <code>Button</code> and <code>Badge</code>.
            </p>

            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Live preview</h3>
              <div className="comp-preview">
                <Button
                  text="Get Started"
                  variant="primary"
                  size="lg"
                  onClick={() => alert('Hello from UIverse')}
                />
                <Badge text="New" variant="success" pill />
              </div>
            </div>

            <div className="comp-subsection">
              <h3 className="comp-subsection-title">The code</h3>
              <CodeBlock
                label="JSX"
                code={`import Button from './components/Button/Button.jsx'
import Badge from './components/Badge/Badge.jsx'

function App() {
  return (
    <div>
      <Button
        text="Get Started"
        variant="primary"
        size="lg"
        onClick={() => alert('Hello from UIverse')}
      />
      <Badge text="New" variant="success" pill />
    </div>
  )
}`}
              />
            </div>

            <Note label="Reference">
              Full prop tables and every variant live on the{' '}
              <Link to="/components">Components</Link> page — each block has a
              one-click copy button.
            </Note>
          </section>

          {/* ── Add Your Own ── */}
          <section className="comp-section" id="add-component">
            <div className="comp-section-header">
              <h2>Add Your Own Component</h2>
            </div>
            <p className="comp-section-desc">
              Contributing a new component takes just three steps.
            </p>

            <div className="doc-steps">
              <div className="doc-step">
                <span className="doc-step-num">1</span>
                <span>
                  Create your component folder in{' '}
                  <code>src/components/</code> with a co-located{' '}
                  <code>.jsx</code> and <code>.css</code> file.
                </span>
              </div>
              <div className="doc-step">
                <span className="doc-step-num">2</span>
                <span>
                  Register its metadata in{' '}
                  <code>src/data/componentsList.js</code>.
                </span>
              </div>
              <div className="doc-step">
                <span className="doc-step-num">3</span>
                <span>
                  Showcase it by adding a section in{' '}
                  <code>src/pages/Components.jsx</code>.
                </span>
              </div>
            </div>

            <CodeBlock
              label="src/components/Card/Card.jsx"
              code={`import './Card.css'

function Card({ title = 'Card', children }) {
  return (
    <div className="uiverse-card">
      <h3 className="uiverse-card-title">{title}</h3>
      <div className="uiverse-card-body">{children}</div>
    </div>
  )
}

export default Card`}
            />
          </section>

          {/* ── Next Steps ── */}
          <section className="comp-section" id="next-steps">
            <div className="comp-section-header">
              <h2>Next Steps</h2>
            </div>
            <p className="comp-section-desc">
              You are set up — here is where to go from here.
            </p>
            <div className="doc-link-row">
              <Link to="/components">
                <Button text="Browse Components" variant="primary" />
              </Link>
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Button text="Star on GitHub" variant="secondary" />
              </a>
              <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
                <Button text="Browse Issues" variant="secondary" />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default GettingStarted
