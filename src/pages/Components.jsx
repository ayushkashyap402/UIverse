import React, { useState, useMemo, useEffect, useRef } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert.jsx'
import Tabs from '../components/Tabs/Tabs.jsx'
import Dropdown from '../components/Dropdown/Dropdown.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

/* ================= SECTIONS ================= */

const sections = [
  {
    id: 'buttons',
    label: 'Buttons',
    componentName: 'Button',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="8" width="18" height="8" rx="3" />
      </svg>
    ),
  },
  {
    id: 'badges',
    label: 'Badges',
    componentName: 'Badge',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7z" />
      </svg>
    ),
  },
  {
    id: 'alerts',
    label: 'Alerts',
    componentName: 'Alert',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 2L2 22h20L14 2z" />
      </svg>
    ),
  },
  {
    id: 'tabs',
    label: 'Tabs',
    componentName: 'Tabs',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    componentName: 'Dropdown',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="10 10 12 12 14 10" />
      </svg>
    ),
  },
  {
    id: 'all-components',
    label: 'All Components',
    componentName: null,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
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

/* ================= Dropdown Demo Data ================= */

const frameworkOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
]

const countryOptions = [
  {
    label: 'India',
    value: 'india',
    flag: '🇮🇳',
  },
  {
    label: 'United States',
    value: 'usa',
    flag: '🇺🇸',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    flag: '🇬🇧',
  },
  {
    label: 'Germany',
    value: 'germany',
    flag: '🇩🇪',
  },
  {
    label: 'Japan',
    value: 'japan',
    flag: '🇯🇵',
  },
  {
    label: 'Australia',
    value: 'australia',
    flag: '🇦🇺',
  },
]

const iconOptions = [
  {
    label: 'Documents',
    value: 'documents',
    icon: '📄',
  },
  {
    label: 'Photos',
    value: 'photos',
    icon: '🖼️',
  },
  {
    label: 'Music',
    value: 'music',
    icon: '🎵',
  },
  {
    label: 'Videos',
    value: 'videos',
    icon: '🎬',
  },
  {
    label: 'Downloads',
    value: 'downloads',
    icon: '⬇️',
  },
]

const avatarOptions = [
  {
    label: 'John Doe',
    value: 'john',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    label: 'Jane Smith',
    value: 'jane',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    label: 'Alex Johnson',
    value: 'alex',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    label: 'Emily Brown',
    value: 'emily',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
]

const groupedOptions = [
  {
    label: '🌏 Asia',
    group: true,
  },
  {
    label: 'India',
    value: 'india',
    flag: '🇮🇳',
  },
  {
    label: 'Japan',
    value: 'japan',
    flag: '🇯🇵',
  },
  {
    label: 'China',
    value: 'china',
    flag: '🇨🇳',
  },
  {
    label: '🌍 Europe',
    group: true,
  },
  {
    label: 'Germany',
    value: 'germany',
    flag: '🇩🇪',
  },
  {
    label: 'France',
    value: 'france',
    flag: '🇫🇷',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
    flag: '🇬🇧',
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
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/* ================= COMPONENT ================= */

function Components() {
  const [activeSection, setActiveSection] = useState('buttons')
  const [showToast, setShowToast] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [basicDropdown, setBasicDropdown] = useState('')
  const [searchDropdown, setSearchDropdown] = useState('')
  const [countryDropdown, setCountryDropdown] = useState('')
  const [iconDropdown, setIconDropdown] = useState('')
  const [avatarDropdown, setAvatarDropdown] = useState('')
  const [multiDropdown, setMultiDropdown] = useState([])
  const [successDropdown, setSuccessDropdown] = useState('')
  const [groupDropdown, setGroupDropdown] = useState('')
  const [clearableDropdown, setClearableDropdown] = useState('')

  // Refs for scrolling
  const buttonsRef = useRef(null)
  const badgesRef = useRef(null)
  const alertsRef = useRef(null)
  const tabsRef = useRef(null)
  const dropdownRef = useRef(null)
  const allComponentsRef = useRef(null)

  const toastTimeout = useRef(null)

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)

      setShowToast(true)

      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current)
      }

      toastTimeout.current = setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const scrollTo = (id) => {
    setActiveSection(id)
    let element = null

    switch (id) {
      case 'buttons':
        element = buttonsRef.current
        break
      case 'badges':
        element = badgesRef.current
        break
      case 'alerts':
        element = alertsRef.current
        break
      case 'tabs':
        element = tabsRef.current
        break
      case 'dropdown':
        element = dropdownRef.current
        break
      case 'all-components':
        element = allComponentsRef.current
        break
      default:
        element = document.getElementById(id)
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return componentsList

    const searchLower = searchQuery.toLowerCase()
    return componentsList.filter(
      (component) =>
        component.name.toLowerCase().includes(searchLower) ||
        component.category.toLowerCase().includes(searchLower)
    )
  }, [searchQuery])

  // Check if a section should be shown based on search
  const shouldShowSection = (sectionId, componentName) => {
    if (!searchQuery.trim()) return true

    const searchLower = searchQuery.toLowerCase()

    // Check if component name matches search
    if (componentName && componentName.toLowerCase().includes(searchLower)) {
      return true
    }

    // Check if any component in filtered list matches this section
    return filteredComponents.some((c) => c.name === componentName)
  }

  // Auto-scroll to first matching section when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase()

      // Find first matching section
      if (searchLower.includes('button') || filteredComponents.some((c) => c.name === 'Button')) {
        scrollTo('buttons')
      } else if (
        searchLower.includes('badge') ||
        filteredComponents.some((c) => c.name === 'Badge')
      ) {
        scrollTo('badges')
      } else if (
        searchLower.includes('alert') ||
        filteredComponents.some((c) => c.name === 'Alert')
      ) {
        scrollTo('alerts')
      } else if (searchLower.includes('tab') || filteredComponents.some((c) => c.name === 'Tabs')) {
        scrollTo('tabs')
      } else if (
        searchLower.includes('dropdown') ||
        filteredComponents.some((c) => c.name === 'Dropdown')
      ) {
        scrollTo('dropdown')
      } else if (filteredComponents.length > 0) {
        scrollTo('all-components')
      }
    }
  }, [searchQuery])

  useEffect(() => {
    return () => {
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current)
      }
    }
  }, [])

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('')
  }

  // Get visible sections count
  const visibleSectionsCount = useMemo(() => {
    let count = 0
    if (shouldShowSection('buttons', 'Button')) count++
    if (shouldShowSection('badges', 'Badge')) count++
    if (shouldShowSection('alerts', 'Alert')) count++
    if (shouldShowSection('tabs', 'Tabs')) count++
    if (shouldShowSection('dropdown', 'Dropdown')) count++
    if (filteredComponents.length > 0) count++
    return count
  }, [searchQuery, filteredComponents])

  return (
    <div className="comp-page">
      <Navbar />

      {showToast && <div className="copy-toast">Code copied successfully!</div>}

      <div className="comp-layout">
        {/* ================= SIDEBAR ================= */}
        <aside
          className={`comp-sidebar comp-sidebar--mobile ${sidebarOpen ? 'comp-sidebar--open' : ''}`}
        >
          {/* Mobile toggle — hidden on desktop */}
          <button
            type="button"
            className="sidebar-mobile-toggle"
            aria-expanded={sidebarOpen}
            aria-controls="comp-sidebar-drawer"
            onClick={() => setSidebarOpen((o) => !o)}
            id="sidebar-toggle-btn"
          >
            <span className="sidebar-mobile-toggle-text">
              <span className="sidebar-mobile-toggle-eyebrow">Navigate</span>
              <span className="sidebar-mobile-toggle-current">
                {sections.find((s) => s.id === activeSection)?.label ?? 'Components'}
              </span>
            </span>
            <span
              className={`sidebar-mobile-caret ${sidebarOpen ? 'sidebar-mobile-caret--open' : ''}`}
              aria-hidden="true"
            />
          </button>

          {/* Drawer content — always visible on desktop, toggleable on mobile */}
          <div
            id="comp-sidebar-drawer"
            className={`sidebar-drawer ${sidebarOpen ? 'sidebar-drawer--open' : ''}`}
          >
            <p className="sidebar-label">ON THIS PAGE</p>

            {sections.map((s) => {
              // Only show section in sidebar if it has content when searching
              if (searchQuery.trim()) {
                if (s.id === 'all-components' && filteredComponents.length === 0) return null
                if (s.componentName && !shouldShowSection(s.id, s.componentName)) return null
              }

              return (
                <button
                  key={s.id}
                  className={`sidebar-item ${activeSection === s.id ? 'sidebar-item--active' : ''}`}
                  onClick={() => {
                    scrollTo(s.id)
                    setSidebarOpen(false)
                  }}
                >
                  <span className="sidebar-item-icon">{s.icon}</span>
                  {s.label}
                </button>
              )
            })}

            <div className="sidebar-divider" />

            <p className="sidebar-label">CONTRIBUTE</p>

            <a
              href="https://github.com/ayushkashyap402/UIverse"
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-item--link"
            >
              <span className="sidebar-item-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </span>
              GitHub Repo
            </a>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="comp-main">
          <div className="comp-header">
            <h1>Components</h1>
            <p>Production-ready UI components. Copy the code, drop it in, done.</p>

            {/* SEARCH INPUT */}
            <div className="search-wrapper">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="🔍 Search components by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="clear-search-btn"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="search-results-info">
                  Found {filteredComponents.length} component
                  {filteredComponents.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  {visibleSectionsCount > 0 &&
                    ` in ${visibleSectionsCount} section${visibleSectionsCount !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          {shouldShowSection('buttons', 'Button') && (
            <section className="comp-section" id="buttons" ref={buttonsRef}>
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
                    onClick={() => handleCopy(`<Button text="Primary" variant="primary" />`)}
                  >
                    <>
                      <CopyIcon /> Copy
                    </>
                  </button>
                </div>

                <pre>{`<Button text="Primary" variant="primary" />`}</pre>
              </div>
            </section>
          )}

          {/* ================= BADGES ================= */}
          {shouldShowSection('badges', 'Badge') && (
            <section className="comp-section" id="badges" ref={badgesRef}>
              <div className="comp-section-header">
                <h2>Badge</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">Small status indicator badge with color variants.</p>

              <div className="comp-preview">
                <Badge text="Primary" variant="primary" />
                <Badge text="Success" variant="success" />
                <Badge text="Warning" variant="warning" />
                <Badge text="Danger" variant="danger" />
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>JSX</span>

                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(`<Badge text="Primary" variant="primary" />`)}
                  >
                    <>
                      <CopyIcon /> Copy
                    </>
                  </button>
                </div>

                <pre>{`<Badge text="Primary" variant="primary" />`}</pre>
              </div>
            </section>
          )}

          {/* ================= ALERTS ================= */}
          {shouldShowSection('alerts', 'Alert') && (
            <section className="comp-section" id="alerts" ref={alertsRef}>
              <div className="comp-section-header">
                <h2>Alert</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Reusable alert component with multiple variants for success, error, warning, and
                informational messages.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Variants</h3>

                <div className="comp-preview">
                  <Alert type="success" message="Action completed successfully!" />
                  <Alert type="error" message="Something went wrong." />
                  <Alert type="warning" message="Warning message here." />
                  <Alert type="info" message="Information message." />
                  <Alert type="info" message="Closable alert example." closable />
                </div>
              </div>

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
                    📋 Copy
                  </button>
                </div>
                <pre>{`<Alert type="success" message="Action completed successfully!" />
<Alert type="error" message="Something went wrong." />
<Alert type="warning" message="Warning message here." />
<Alert type="info" message="Information message." />
<Alert type="info" message="Closable alert example." closable />`}</pre>
              </div>

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
                        <td>
                          <code>type</code>
                        </td>
                        <td>string</td>
                        <td>
                          <code>"info"</code>
                        </td>
                        <td>success · error · warning · info</td>
                      </tr>
                      <tr>
                        <td>
                          <code>message</code>
                        </td>
                        <td>string</td>
                        <td>
                          <code>"This is an alert"</code>
                        </td>
                        <td>Alert message text</td>
                      </tr>
                      <tr>
                        <td>
                          <code>closable</code>
                        </td>
                        <td>boolean</td>
                        <td>
                          <code>false</code>
                        </td>
                        <td>Shows close button</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ================= TABS ================= */}
          {shouldShowSection('tabs', 'Tabs') && (
            <section className="comp-section" id="tabs" ref={tabsRef}>
              <div className="comp-section-header">
                <h2>Tabs</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Accessible tabs component with animated indicators, supporting underline and pills
                variants.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Underline Variant (Default)</h3>
                <div
                  className="comp-preview"
                  style={{ flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <Tabs defaultValue="overview">
                    <Tabs.List>
                      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                      <Tabs.Trigger value="features">Features</Tabs.Trigger>
                      <Tabs.Trigger value="disabled" disabled>
                        Disabled Tab
                      </Tabs.Trigger>
                      <Tabs.Trigger value="api">API Reference</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="overview">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
                          Explore UIverse
                        </h4>
                        <p>
                          UIverse is a collection of handcrafted, accessible React components
                          designed to make building beautiful interfaces fast and simple.
                        </p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="features">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Key Features</h4>
                        <p>
                          Our components are responsive, support dark mode natively, are keyboard
                          accessible, and follow standard WAI-ARIA guidelines.
                        </p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="api">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
                          Compound API Pattern
                        </h4>
                        <p>
                          Uses React Context to implicitly share state between components, making it
                          flexible and easy to customise layouts.
                        </p>
                      </div>
                    </Tabs.Content>
                  </Tabs>
                </div>
              </div>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Pills Variant</h3>
                <div
                  className="comp-preview"
                  style={{ flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <Tabs defaultValue="html" variant="pills">
                    <Tabs.List>
                      <Tabs.Trigger value="html">HTML5</Tabs.Trigger>
                      <Tabs.Trigger value="css">CSS3</Tabs.Trigger>
                      <Tabs.Trigger value="js">JavaScript</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="html">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
                          Semantic Markup
                        </h4>
                        <p>
                          Write clean, structured, and search-engine friendly markup using HTML5
                          elements.
                        </p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="css">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
                          Modern Layouts
                        </h4>
                        <p>
                          Utilise modern CSS properties like Flexbox, Grid, Custom Properties, and
                          Subgrid for layout.
                        </p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="js">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>
                          Dynamic Interactivity
                        </h4>
                        <p>
                          Add stateful behavior, async data loading, and interactive workflows with
                          Javascript.
                        </p>
                      </div>
                    </Tabs.Content>
                  </Tabs>
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>JSX (Compound API)</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>`)
                    }
                  >
                    <>
                      <CopyIcon /> Copy
                    </>
                  </button>
                </div>
                <pre>{`<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>`}</pre>
              </div>

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
                        <td>
                          <code>defaultValue</code>
                        </td>
                        <td>string</td>
                        <td>
                          <code>-</code>
                        </td>
                        <td>The value of the active tab on initial render.</td>
                      </tr>
                      <tr>
                        <td>
                          <code>value</code>
                        </td>
                        <td>string</td>
                        <td>
                          <code>-</code>
                        </td>
                        <td>Controlled active tab value.</td>
                      </tr>
                      <tr>
                        <td>
                          <code>onValueChange</code>
                        </td>
                        <td>function</td>
                        <td>
                          <code>-</code>
                        </td>
                        <td>Event handler called when the active tab changes.</td>
                      </tr>
                      <tr>
                        <td>
                          <code>variant</code>
                        </td>
                        <td>string</td>
                        <td>
                          <code>"underline"</code>
                        </td>
                        <td>
                          Visual style: <code>"underline"</code> or <code>"pills"</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ================= DROPDOWN ================= */}

          {shouldShowSection('dropdown', 'Dropdown') && (
            <section className="comp-section" id="dropdown" ref={dropdownRef}>
              <div className="comp-section-header">
                <h2>Dropdown</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                A highly customizable dropdown component supporting search, multi-select, avatars,
                country flags, icons, loading, validation states, and more.
              </p>

              {/* ================= Basic ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Basic Dropdown</h3>
                <div className="comp-preview">
                  <Dropdown
                    label="Framework"
                    options={frameworkOptions}
                    value={basicDropdown}
                    onChange={setBasicDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          label="Framework"
          options={frameworkOptions}
          value={value}
          onChange={setValue}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          label="Framework"
          options={frameworkOptions}
          value={value}
          onChange={setValue}
          />`}</pre>
                </div>
              </div>

              {/* ================= Searchable ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Searchable Dropdown</h3>

                <div className="comp-preview">
                  <Dropdown
                    searchable
                    label="Search Framework"
                    options={frameworkOptions}
                    value={searchDropdown}
                    onChange={setSearchDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          searchable
          options={frameworkOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          searchable
          options={frameworkOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Multi Select ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Multi Select</h3>

                <div className="comp-preview">
                  <Dropdown
                    multiple
                    searchable
                    clearable
                    label="Frameworks"
                    options={frameworkOptions}
                    value={multiDropdown}
                    onChange={setMultiDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          multiple
          searchable
          clearable
          options={frameworkOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          multiple
          searchable
          clearable
          options={frameworkOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Country Selector ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Country Selector</h3>

                <div className="comp-preview">
                  <Dropdown
                    searchable
                    clearable
                    label="Country"
                    options={countryOptions}
                    value={countryDropdown}
                    onChange={setCountryDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          searchable
          clearable
          options={countryOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          searchable
          clearable
          options={countryOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Icon Dropdown ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Icon Dropdown</h3>

                <div className="comp-preview">
                  <Dropdown
                    label="Categories"
                    options={iconOptions}
                    value={iconDropdown}
                    onChange={setIconDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          label="Categories"
          options={iconOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          label="Categories"
          options={iconOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Avatar Dropdown ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Avatar Dropdown</h3>

                <div className="comp-preview">
                  <Dropdown
                    searchable
                    label="Assign User"
                    options={avatarOptions}
                    value={avatarDropdown}
                    onChange={setAvatarDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          searchable
          options={avatarOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          searchable
          options={avatarOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Disabled ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Disabled</h3>

                <div className="comp-preview">
                  <Dropdown disabled label="Disabled Dropdown" options={frameworkOptions} />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          disabled
          options={frameworkOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          disabled
          options={frameworkOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Loading ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Loading State</h3>

                <div className="comp-preview">
                  <Dropdown loading label="Loading" options={frameworkOptions} />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          loading
          options={frameworkOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          loading
          options={frameworkOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Error ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Error State</h3>

                <div className="comp-preview">
                  <Dropdown
                    error
                    label="Framework"
                    options={frameworkOptions}
                    helperText="Please select a framework."
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          error
          helperText="Please select a framework."
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          error
          helperText="Please select a framework."
          />`}</pre>
                </div>
              </div>

              {/* ================= Success ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Success State</h3>

                <div className="comp-preview">
                  <Dropdown
                    success
                    label="Framework"
                    options={frameworkOptions}
                    value={successDropdown}
                    onChange={setSuccessDropdown}
                    helperText="Framework selected successfully."
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          success
          helperText="Framework selected successfully."
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          success
          helperText="Framework selected successfully."
          />`}</pre>
                </div>
              </div>

              {/* ================= Clearable ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Clearable Dropdown</h3>

                <div className="comp-preview">
                  <Dropdown
                    clearable
                    searchable
                    label="Country"
                    options={countryOptions}
                    value={clearableDropdown}
                    onChange={setClearableDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          clearable
          searchable
          options={countryOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          clearable
          searchable
          options={countryOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Grouped Dropdown ================= */}

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Grouped Options</h3>

                <div className="comp-preview">
                  <Dropdown
                    label="Country"
                    options={groupedOptions}
                    value={groupDropdown}
                    onChange={setGroupDropdown}
                  />
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(`<Dropdown
          options={groupedOptions}
          />`)
                      }
                    >
                      {copied ? (
                        <>
                          <CheckIcon />
                          Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{`<Dropdown
          options={groupedOptions}
          />`}</pre>
                </div>
              </div>

              {/* ================= Props ================= */}

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
                        <td>
                          <code>label</code>
                        </td>
                        <td>string</td>
                        <td>""</td>
                        <td>Dropdown label.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>options</code>
                        </td>
                        <td>array</td>
                        <td>[]</td>
                        <td>Options displayed in the dropdown.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>value</code>
                        </td>
                        <td>string | array</td>
                        <td>""</td>
                        <td>Current selected value(s).</td>
                      </tr>

                      <tr>
                        <td>
                          <code>onChange</code>
                        </td>
                        <td>function</td>
                        <td>-</td>
                        <td>Triggered whenever the selection changes.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>placeholder</code>
                        </td>
                        <td>string</td>
                        <td>"Select..."</td>
                        <td>Placeholder text.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>searchable</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Shows a search field inside the dropdown.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>multiple</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Enables multi-select mode.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>clearable</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Shows a clear selection button.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>disabled</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Disables user interaction.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>loading</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays a loading state.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>error</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays the error style.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>success</code>
                        </td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Displays the success style.</td>
                      </tr>

                      <tr>
                        <td>
                          <code>helperText</code>
                        </td>
                        <td>string</td>
                        <td>""</td>
                        <td>Helper or validation message.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="doc-callout">
                <strong>Tip:</strong> The Dropdown component is designed to be reusable across
                forms, country selectors, user pickers, category selectors, filters, settings pages,
                and any custom option list. Simply pass a different
                <code>options</code> array to adapt it for your use case.
              </div>
            </section>
          )}
          {/* ================= ALL COMPONENTS TABLE ================= */}
          {filteredComponents.length > 0 && (
            <section className="comp-section" id="all-components" ref={allComponentsRef}>
              <div className="comp-section-header">
                <h2>All Components</h2>
                {searchQuery && (
                  <span className="filtered-badge">
                    Filtered: {filteredComponents.length} of {componentsList.length}
                  </span>
                )}
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
                    {filteredComponents.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.name}</strong>
                        </td>
                        <td>{c.category}</td>
                        <td>
                          <span className={`status-badge status-${c.status.toLowerCase()}`}>
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
          )}

          {/* NO RESULTS MESSAGE */}
          {searchQuery && filteredComponents.length === 0 && (
            <div className="no-results">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>
                🔍 No components found matching <strong>"{searchQuery}"</strong>
              </p>
              <p>
                Try searching for "Button", "Alert", "Badge", or a category like "Inputs" or
                "Feedback"
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Components
