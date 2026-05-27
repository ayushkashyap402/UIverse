// Components.jsx – Component showcase page
import React, { useState } from 'react'
import Button from '../components/Button/Button.jsx'
import AppNavbar from '../layout/AppNavbar/AppNavbar.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

/* ================= SECTIONS ================= */

const sections = [
  {
    id: 'buttons',
    label: 'Buttons',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="8" rx="3" />
      </svg>
    ),
  },
  {
    id: 'badges',
    label: 'Badges',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7z" />
      </svg>
    ),
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2L2 22h20L14 2z" />
      </svg>
    ),
  },
  {
    id: 'navbars',
    label: 'Navbars',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="5" rx="1.5" />
        <line x1="6" y1="6.5" x2="10" y2="6.5" />
        <circle cx="18" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    id: 'sidebars',
    label: 'Sidebars',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="18" rx="1.5" />
        <line x1="14" y1="8" x2="21" y2="8" />
        <line x1="14" y1="12" x2="21" y2="12" />
        <line x1="14" y1="16" x2="19" y2="16" />
      </svg>
    ),
  },
  {
    id: 'all-components',
    label: 'All Components',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
]
/* ================= ICONS ================= */

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/* ================= COMPONENT ================= */

function Components() {
  const [activeSection, setActiveSection] = useState('buttons')
  const [copied, setCopied] = useState(false)

  // Track which navbar variant is selected for the code preview
  const [selectedNavbar, setSelectedNavbar] = useState(0)

  // Track which sidebar variant is selected for the code preview
  const [selectedSidebar, setSelectedSidebar] = useState(0)

  // All navbar variant configurations — preview + code stay in sync
  const navbarVariants = [
    {
      brand: 'MyApp',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
      variant: 'default',
      cta: { label: 'Sign Up', href: '#' },
      code: `<Navbar
  brand="MyApp"
  links={[
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
  ]}
  variant="default"
  sticky={true}
  cta={{ label: 'Sign Up', href: '/signup' }}
/>`,
    },
    {
      brand: 'Studio',
      links: [
        { label: 'Work', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
      ],
      variant: 'solid',
      cta: null,
      code: `<Navbar
  brand="Studio"
  links={[
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ]}
  variant="solid"
  sticky={true}
/>`,
    },
    {
      brand: 'Starter',
      links: [
        { label: 'Docs', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
      variant: 'gradient',
      cta: { label: 'Get Started', href: '#' },
      code: `<Navbar
  brand="Starter"
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/components' },
    { label: 'GitHub', href: '/github' },
  ]}
  variant="gradient"
  sticky={true}
  cta={{ label: 'Get Started', href: '/get-started' }}
/>`,
    },
    {
      brand: 'Portfolio',
      links: [
        { label: 'Projects', href: '#' },
        { label: 'Resume', href: '#' },
        { label: 'Contact', href: '#' },
      ],
      variant: 'transparent',
      cta: null,
      code: `<Navbar
  brand="Portfolio"
  links={[
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ]}
  variant="transparent"
  sticky={true}
/>`,
    },
  ]

  // All sidebar variant configurations — preview + code stay in sync
  const sidebarVariants = [
    {
      brand: 'Dashboard',
      variant: 'default',
      activeItem: 'Analytics',
      sections: [
        {
          title: 'Main',
          items: [
            { label: 'Dashboard', href: '#', icon: 'dashboard' },
            { label: 'Analytics', href: '#', icon: 'analytics' },
            { label: 'Users', href: '#', icon: 'users' },
          ],
        },
        {
          title: 'Other',
          items: [
            { label: 'Settings', href: '#', icon: 'settings' },
            { label: 'Inbox', href: '#', icon: 'inbox' },
          ],
        },
      ],
      code: `<Sidebar
  brand="Dashboard"
  variant="default"
  activeItem="Analytics"
  sections={[
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/', icon: 'dashboard' },
        { label: 'Analytics', href: '/analytics', icon: 'analytics' },
        { label: 'Users', href: '/users', icon: 'users' },
      ],
    },
    {
      title: 'Other',
      items: [
        { label: 'Settings', href: '/settings', icon: 'settings' },
        { label: 'Inbox', href: '/inbox', icon: 'inbox' },
      ],
    },
  ]}
  onItemClick={(item) => console.log(item)}
/>`,
    },
    {
      brand: 'Studio',
      variant: 'gradient',
      activeItem: 'Bookmarks',
      sections: [
        {
          title: 'Workspace',
          items: [
            { label: 'Home', href: '#', icon: 'home' },
            { label: 'Bookmarks', href: '#', icon: 'bookmark' },
            { label: 'Search', href: '#', icon: 'search' },
          ],
        },
        {
          title: 'Manage',
          items: [
            { label: 'Calendar', href: '#', icon: 'calendar' },
            { label: 'Folders', href: '#', icon: 'folder' },
          ],
        },
      ],
      code: `<Sidebar
  brand="Studio"
  variant="gradient"
  activeItem="Bookmarks"
  sections={[
    {
      title: 'Workspace',
      items: [
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'Bookmarks', href: '/bookmarks', icon: 'bookmark' },
        { label: 'Search', href: '/search', icon: 'search' },
      ],
    },
    {
      title: 'Manage',
      items: [
        { label: 'Calendar', href: '/calendar', icon: 'calendar' },
        { label: 'Folders', href: '/folders', icon: 'folder' },
      ],
    },
  ]}
  onItemClick={(item) => console.log(item)}
/>`,
    },
    {
      brand: 'MyApp',
      variant: 'bordered',
      activeItem: 'Dashboard',
      collapsible: true,
      sections: [
        {
          title: 'Navigation',
          items: [
            { label: 'Dashboard', href: '#', icon: 'dashboard' },
            { label: 'Analytics', href: '#', icon: 'analytics' },
            { label: 'Notifications', href: '#', icon: 'bell' },
            { label: 'Favorites', href: '#', icon: 'star' },
          ],
        },
      ],
      code: `<Sidebar
  brand="MyApp"
  variant="bordered"
  activeItem="Dashboard"
  collapsible={true}
  sections={[
    {
      title: 'Navigation',
      items: [
        { label: 'Dashboard', href: '/', icon: 'dashboard' },
        { label: 'Analytics', href: '/analytics', icon: 'analytics' },
        { label: 'Notifications', href: '/notifications', icon: 'bell' },
        { label: 'Favorites', href: '/favorites', icon: 'star' },
      ],
    },
  ]}
  onItemClick={(item) => console.log(item)}
/>`,
    },
  ]

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
      <AppNavbar />

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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
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

          {/* ================= NAVBARS ================= */}
          <section className="comp-section" id="navbars">
            <div className="comp-section-header">
              <h2>Navbar</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <p className="comp-section-desc">
              Responsive navigation bar with multiple variants, configurable
              brand, links, and an optional CTA button.
            </p>

            {/* Variants */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Variants</h3>
              <p className="comp-section-desc" style={{ marginBottom: '12px', fontSize: '0.82rem', opacity: 0.7 }}>
                Click a navbar to see its code below.
              </p>

              <div className="comp-preview" style={{ flexDirection: 'column', gap: '16px', padding: '0' }}>
                {navbarVariants.map((nv, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedNavbar(i)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      outline: selectedNavbar === i
                        ? '2px solid rgba(99, 102, 241, 0.6)'
                        : '2px solid transparent',
                      transition: 'outline 0.2s ease',
                    }}
                  >
                    <Navbar
                      brand={nv.brand}
                      links={nv.links}
                      variant={nv.variant}
                      sticky={false}
                      cta={nv.cta}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Code Block — updates dynamically based on selected variant */}
            <div className="code-block">
              <div className="code-block-header">
                <span>JSX · {navbarVariants[selectedNavbar].variant}</span>

                <button
                  className="copy-btn"
                  onClick={() => handleCopy(navbarVariants[selectedNavbar].code)}
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

              <pre>{navbarVariants[selectedNavbar].code}</pre>
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
                      <td><code>brand</code></td>
                      <td>string</td>
                      <td><code>"Brand"</code></td>
                      <td>Brand / logo text on the left</td>
                    </tr>

                    <tr>
                      <td><code>links</code></td>
                      <td>array</td>
                      <td><code>[...]</code></td>
                      <td>Array of {`{ label, href }`} objects</td>
                    </tr>

                    <tr>
                      <td><code>variant</code></td>
                      <td>string</td>
                      <td><code>"default"</code></td>
                      <td>default · transparent · solid · gradient</td>
                    </tr>

                    <tr>
                      <td><code>sticky</code></td>
                      <td>boolean</td>
                      <td><code>true</code></td>
                      <td>Stick to top on scroll</td>
                    </tr>

                    <tr>
                      <td><code>cta</code></td>
                      <td>object</td>
                      <td><code>null</code></td>
                      <td>Optional CTA: {`{ label, href }`}</td>
                    </tr>

                    <tr>
                      <td><code>onLinkClick</code></td>
                      <td>function</td>
                      <td><code>null</code></td>
                      <td>Callback when a link is clicked</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ================= SIDEBARS ================= */}
          <section className="comp-section" id="sidebars">
            <div className="comp-section-header">
              <h2>Sidebar</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <p className="comp-section-desc">
              Vertical sidebar navigation with section grouping, built-in icons,
              multiple style variants, and an optional collapsible mode.
            </p>

            {/* Variants — click to update code below */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Variants</h3>
              <p className="comp-section-desc" style={{ marginBottom: '12px', fontSize: '0.82rem', opacity: 0.7 }}>
                Click a sidebar to see its code below.
              </p>

              <div className="comp-preview" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
                {sidebarVariants.map((sv, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedSidebar(i)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '16px',
                      outline: selectedSidebar === i
                        ? '2px solid rgba(99, 102, 241, 0.6)'
                        : '2px solid transparent',
                      transition: 'outline 0.2s ease',
                    }}
                  >
                    <Sidebar
                      brand={sv.brand}
                      variant={sv.variant}
                      activeItem={sv.activeItem}
                      sections={sv.sections}
                      collapsible={sv.collapsible || false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Code Block — updates dynamically based on selected sidebar */}
            <div className="code-block">
              <div className="code-block-header">
                <span>JSX · {sidebarVariants[selectedSidebar].variant}</span>

                <button
                  className="copy-btn"
                  onClick={() => handleCopy(sidebarVariants[selectedSidebar].code)}
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

              <pre>{sidebarVariants[selectedSidebar].code}</pre>
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
                      <td><code>brand</code></td>
                      <td>string</td>
                      <td><code>"AppName"</code></td>
                      <td>Brand / app name at the top</td>
                    </tr>

                    <tr>
                      <td><code>sections</code></td>
                      <td>array</td>
                      <td><code>[...]</code></td>
                      <td>Array of {`{ title, items: [{ label, href, icon }] }`}</td>
                    </tr>

                    <tr>
                      <td><code>variant</code></td>
                      <td>string</td>
                      <td><code>"default"</code></td>
                      <td>default · minimal · bordered · gradient</td>
                    </tr>

                    <tr>
                      <td><code>collapsible</code></td>
                      <td>boolean</td>
                      <td><code>false</code></td>
                      <td>Show collapse/expand toggle</td>
                    </tr>

                    <tr>
                      <td><code>defaultCollapsed</code></td>
                      <td>boolean</td>
                      <td><code>false</code></td>
                      <td>Start collapsed when collapsible</td>
                    </tr>

                    <tr>
                      <td><code>activeItem</code></td>
                      <td>string</td>
                      <td><code>"Dashboard"</code></td>
                      <td>Label of the initially active item</td>
                    </tr>

                    <tr>
                      <td><code>onItemClick</code></td>
                      <td>function</td>
                      <td><code>null</code></td>
                      <td>Callback when a nav item is clicked</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Icons reference */}
            <div className="comp-subsection">
              <h3 className="comp-subsection-title">Built-in Icons</h3>

              <div className="props-table-wrap">
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Icon Key</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>dashboard</code></td><td>Grid/overview icon</td></tr>
                    <tr><td><code>analytics</code></td><td>Bar chart icon</td></tr>
                    <tr><td><code>users</code></td><td>People/team icon</td></tr>
                    <tr><td><code>settings</code></td><td>Gear/cog icon</td></tr>
                    <tr><td><code>inbox</code></td><td>Mail inbox icon</td></tr>
                    <tr><td><code>calendar</code></td><td>Calendar icon</td></tr>
                    <tr><td><code>folder</code></td><td>Folder icon</td></tr>
                    <tr><td><code>bookmark</code></td><td>Bookmark icon</td></tr>
                    <tr><td><code>search</code></td><td>Magnifying glass icon</td></tr>
                    <tr><td><code>home</code></td><td>Home icon</td></tr>
                    <tr><td><code>star</code></td><td>Star/favorite icon</td></tr>
                    <tr><td><code>bell</code></td><td>Notification bell icon</td></tr>
                  </tbody>
                </table>
              </div>
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