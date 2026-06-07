import React, { useState, useMemo, useEffect, useRef } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert.jsx'
import Tabs from '../components/Tabs/Tabs.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

import { 
  Input, PasswordField, EmailInput, PhoneNumberInput, DatePicker, SearchInput,
  Dropdown, ToggleSwitch, Checkbox, RadioButton, SubmitButton, TextArea, MultiSelect, Autocomplete,
  FileUpload, Slider, RatingInput, OTPInput, AddressInput
} from '../components/FormBuilder/FormBuilder.jsx';
import '../components/FormBuilder/FormBuilder.css';

/* ================= SECTIONS ================= */

const sections = [
  {
    id: 'buttons',
    label: 'Buttons',
    componentName: 'Button',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="8" width="18" height="8" rx="3"/>
      </svg>
    ),
  },
  {
    id: 'badges',
    label: 'Badges',
    componentName: 'Badge',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7z"/>
      </svg>
    ),
  },
  {

    id: 'alerts',
    label: 'Alerts',
    componentName: 'Alert',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2L2 22h20L14 2z"/>
      </svg>
    ),
  },
  {
    id: 'tabs',
    label: 'Tabs',
    componentName: 'Tabs',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    id: 'form-builder',
    label: 'Form Builder',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 9h16v6H4zm0-4h16v2H4z" />
      </svg>
   ),
  }, 
  {
    id: 'all-components',
    label: 'All Components',
    componentName: null,
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
const SnippetCopyButton = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };
  return (
    <button className="copy-btn" onClick={handleCopy}>
      {isCopied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
    </button>
  );
};


/* ================= COMPONENT ================= */

function Components() {
  const [activeSection, setActiveSection] = useState('buttons')
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // Mobile sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Refs for scrolling
  const buttonsRef = useRef(null)
  const badgesRef = useRef(null)
  const alertsRef = useRef(null)
  const tabsRef = useRef(null)
  const formBuilderRef = useRef(null)
  const allComponentsRef = useRef(null)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const scrollTo = (id) => {
    setActiveSection(id)
    let element = null
    
    switch(id) {
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
      case 'all-components':
        element = allComponentsRef.current
        break
      case 'form-builder':                  
        element = formBuilderRef.current
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
    return componentsList.filter(component => 
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
    return filteredComponents.some(c => c.name === componentName)
  }

  // Auto-scroll to first matching section when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase()
      
      // Find first matching section
      if (searchLower.includes('button') || filteredComponents.some(c => c.name === 'Button')) {
        scrollTo('buttons')
      } else if (searchLower.includes('badge') || filteredComponents.some(c => c.name === 'Badge')) {
        scrollTo('badges')
      } else if (searchLower.includes('alert') || filteredComponents.some(c => c.name === 'Alert')) {
        scrollTo('alerts')
      } else if (searchLower.includes('tab') || filteredComponents.some(c => c.name === 'Tabs')) {
        scrollTo('tabs')
      } else if (searchLower.includes('form') || filteredComponents.some(c => c.name === 'Form Components')) { // <-- Add this
        scrollTo('form-builder')
      } else if (filteredComponents.length > 0) {
        scrollTo('all-components')
      }
    }
  }, [searchQuery])

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
    if (shouldShowSection('form-builder', 'Form Components')) count++
    if (filteredComponents.length > 0) count++
    
    return count
  }, [searchQuery, filteredComponents])

  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className={`comp-sidebar comp-sidebar--mobile ${sidebarOpen ? 'comp-sidebar--open' : ''}`}>
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
                  className={`sidebar-item ${activeSection === s.id ? "sidebar-item--active" : ""}`}
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
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
                  <button onClick={clearSearch} className="clear-search-btn" aria-label="Clear search">
                    ✕
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="search-results-info">
                  Found {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  {visibleSectionsCount > 0 && ` in ${visibleSectionsCount} section${visibleSectionsCount !== 1 ? 's' : ''}`}
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
          )}

          {/* ================= BADGES ================= */}
          {shouldShowSection('badges', 'Badge') && (
            <section className="comp-section" id="badges" ref={badgesRef}>
              <div className="comp-section-header">
                <h2>Badge</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Small status indicator badge with color variants.
              </p>

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
                    onClick={() =>
                      handleCopy(`<Badge text="Primary" variant="primary" />`)
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
                Reusable alert component with multiple variants
                for success, error, warning, and informational
                messages.
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
                    {copied ? '✅ Copied!' : '📋 Copy'}
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
                        <td><code>type</code></td>
                        <td>string</td>
                        <td><code>"info"</code></td>
                        <td>success · error · warning · info</td>
                      </tr>
                      <tr>
                        <td><code>message</code></td>
                        <td>string</td>
                        <td><code>"This is an alert"</code></td>
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
          )}

          {/* ================= TABS ================= */}
          {shouldShowSection('tabs', 'Tabs') && (
            <section className="comp-section" id="tabs" ref={tabsRef}>
              <div className="comp-section-header">
                <h2>Tabs</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Accessible tabs component with animated indicators, supporting underline and pills variants.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Underline Variant (Default)</h3>
                <div className="comp-preview" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <Tabs defaultValue="overview">
                    <Tabs.List>
                      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                      <Tabs.Trigger value="features">Features</Tabs.Trigger>
                      <Tabs.Trigger value="disabled" disabled>Disabled Tab</Tabs.Trigger>
                      <Tabs.Trigger value="api">API Reference</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="overview">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Explore UIverse</h4>
                        <p>UIverse is a collection of handcrafted, accessible React components designed to make building beautiful interfaces fast and simple.</p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="features">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Key Features</h4>
                        <p>Our components are responsive, support dark mode natively, are keyboard accessible, and follow standard WAI-ARIA guidelines.</p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="api">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Compound API Pattern</h4>
                        <p>Uses React Context to implicitly share state between components, making it flexible and easy to customise layouts.</p>
                      </div>
                    </Tabs.Content>
                  </Tabs>
                </div>
              </div>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title">Pills Variant</h3>
                <div className="comp-preview" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <Tabs defaultValue="html" variant="pills">
                    <Tabs.List>
                      <Tabs.Trigger value="html">HTML5</Tabs.Trigger>
                      <Tabs.Trigger value="css">CSS3</Tabs.Trigger>
                      <Tabs.Trigger value="js">JavaScript</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="html">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Semantic Markup</h4>
                        <p>Write clean, structured, and search-engine friendly markup using HTML5 elements.</p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="css">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Modern Layouts</h4>
                        <p>Utilise modern CSS properties like Flexbox, Grid, Custom Properties, and Subgrid for layout.</p>
                      </div>
                    </Tabs.Content>
                    <Tabs.Content value="js">
                      <div className="tab-demo-content" style={{ padding: '8px 0' }}>
                        <h4 style={{ marginBottom: '8px', color: 'var(--text)' }}>Dynamic Interactivity</h4>
                        <p>Add stateful behavior, async data loading, and interactive workflows with Javascript.</p>
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
                        <td><code>defaultValue</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>The value of the active tab on initial render.</td>
                      </tr>
                      <tr>
                        <td><code>value</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Controlled active tab value.</td>
                      </tr>
                      <tr>
                        <td><code>onValueChange</code></td>
                        <td>function</td>
                        <td><code>-</code></td>
                        <td>Event handler called when the active tab changes.</td>
                      </tr>
                      <tr>
                        <td><code>variant</code></td>
                        <td>string</td>
                        <td><code>"underline"</code></td>
                        <td>Visual style: <code>"underline"</code> or <code>"pills"</code>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
          
          {/* ================= FORM COMPONENTS ================= */}
          {shouldShowSection('form-builder', 'Form Components') && (
            <section className="comp-section" id="form-builder" ref={formBuilderRef}>
              <div className="comp-section-header">
                <h2>Form Components</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                A complete suite of 20 form elements. Copy the base CSS once, then grab the clean JSX code for the components you need.
              </p>

              {/* ================= GLOBAL CSS COPY BLOCK ================= */}
              <div className="comp-subsection" style={{ marginTop: '32px', backgroundColor: 'var(--surface-2)', padding: '24px', borderRadius: '8px' }}>
                <h3 className="comp-subsection-title">1. Copy Base CSS</h3>
                <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--muted)' }}>Add this to your <code>index.css</code> or <code>App.css</code> file. It powers all the components below.</p>
                
                <div className="code-block">
                  <div className="code-block-header">
                    <span>CSS (form-styles.css)</span>
                    <SnippetCopyButton code={`.uv-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }\n.uv-label { font-size: 14px; font-weight: 500; color: var(--text); }\n.uv-required { color: #ef4444; margin-left: 4px; }\n.uv-input { padding: 10px 14px; border: 1px solid var(--border); border-radius: 6px; font-size: 15px; background: var(--surface); outline: none; transition: all 0.2s; font-family: inherit; width: 100%; color: var(--text); }\n.uv-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px var(--accent); }\n.uv-input.error { border-color: #ef4444; }\n.uv-helper { font-size: 12px; color: var(--muted); }\n.uv-helper.error { color: #ef4444; }\n.uv-button { padding: 12px 24px; background: var(--brand); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s; width: 100%; }\n.uv-button:hover { background: var(--brand-dark); }\n.uv-check-radio-label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; color: var(--text); }\n.uv-checkbox, .uv-radio { width: 16px; height: 16px; accent-color: var(--brand); cursor: pointer; }\n.uv-file-input { font-size: 14px; color: var(--text); }\n.uv-file-input::file-selector-button { padding: 8px 16px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); cursor: pointer; margin-right: 12px; transition: 0.2s; }\n.uv-file-input::file-selector-button:hover { background: var(--border); }\n.uv-slider { width: 100%; accent-color: var(--brand); }\n.uv-otp-container { display: flex; gap: 8px; }\n.uv-otp-input { width: 44px; height: 52px; text-align: center; font-size: 18px; font-weight: 600; border: 1px solid var(--border); border-radius: 6px; outline: none; background: var(--surface); color: var(--text); }\n.uv-otp-input:focus { border-color: var(--brand); }\n.uv-rating { display: flex; gap: 4px; font-size: 24px; color: var(--border); cursor: pointer; }\n.uv-rating .active { color: #f59e0b; }\n.uv-toggle-input { display: none; }\n.uv-toggle-pill { width: 44px; height: 24px; background: var(--border); border-radius: 12px; position: relative; transition: 0.2s; }\n.uv-toggle-pill.active { background: var(--brand); }\n.uv-toggle-circle { width: 20px; height: 20px; background: var(--surface); border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.2s; }\n.uv-toggle-pill.active .uv-toggle-circle { transform: translateX(20px); }\n.uv-address-row { display: flex; gap: 12px; }`} />
                  </div>
                  <pre style={{ maxHeight: '250px', overflowY: 'auto' }}>{`.uv-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }
.uv-label { font-size: 14px; font-weight: 500; color: var(--text); }
.uv-required { color: #ef4444; margin-left: 4px; }
.uv-input { padding: 10px 14px; border: 1px solid var(--border); border-radius: 6px; font-size: 15px; background: var(--surface); outline: none; transition: all 0.2s; font-family: inherit; width: 100%; color: var(--text); }
.uv-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px var(--accent); }
.uv-input.error { border-color: #ef4444; }
.uv-helper { font-size: 12px; color: var(--muted); }
.uv-helper.error { color: #ef4444; }
.uv-button { padding: 12px 24px; background: var(--brand); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: 0.2s; width: 100%; }
.uv-button:hover { background: var(--brand-dark); }
.uv-check-radio-label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; color: var(--text); }
.uv-checkbox, .uv-radio { width: 16px; height: 16px; accent-color: var(--brand); cursor: pointer; }
.uv-file-input { font-size: 14px; color: var(--text); }
.uv-file-input::file-selector-button { padding: 8px 16px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); cursor: pointer; margin-right: 12px; transition: 0.2s; }
.uv-file-input::file-selector-button:hover { background: var(--border); }
.uv-slider { width: 100%; accent-color: var(--brand); }
.uv-otp-container { display: flex; gap: 8px; }
.uv-otp-input { width: 44px; height: 52px; text-align: center; font-size: 18px; font-weight: 600; border: 1px solid var(--border); border-radius: 6px; outline: none; background: var(--surface); color: var(--text); }
.uv-otp-input:focus { border-color: var(--brand); }
.uv-rating { display: flex; gap: 4px; font-size: 24px; color: var(--border); cursor: pointer; }
.uv-rating .active { color: #f59e0b; }
.uv-toggle-input { display: none; }
.uv-toggle-pill { width: 44px; height: 24px; background: var(--border); border-radius: 12px; position: relative; transition: 0.2s; }
.uv-toggle-pill.active { background: var(--brand); }
.uv-toggle-circle { width: 20px; height: 20px; background: var(--surface); border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: transform 0.2s; }
.uv-toggle-pill.active .uv-toggle-circle { transform: translateX(20px); }
.uv-address-row { display: flex; gap: 12px; }`}</pre>
                </div>
              </div>

              {/* ================= 20 INDIVIDUAL COMPONENTS ================= */}
              
              {/* 1. Text Input */}
              <div className="comp-subsection" style={{ marginTop: '48px' }}>
                <h3 className="comp-subsection-title">Text Input</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Full Name <span className="uv-required">*</span></label>
                    <input type="text" className="uv-input" placeholder="John Doe" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Full Name <span className="uv-required">*</span></label>\n  <input type="text" className="uv-input" placeholder="John Doe" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Full Name <span className="uv-required">*</span></label>\n  <input type="text" className="uv-input" placeholder="John Doe" />\n</div>`}</pre>
                </div>
              </div>

              {/* 2. Text Area */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Text Area</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Bio</label>
                    <textarea className="uv-input" rows="4" placeholder="Tell us about yourself..."></textarea>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Bio</label>\n  <textarea className="uv-input" rows="4" placeholder="Tell us about yourself..."></textarea>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Bio</label>\n  <textarea className="uv-input" rows="4" placeholder="Tell us about yourself..."></textarea>\n</div>`}</pre>
                </div>
              </div>

              {/* 3. Password Field */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Password Field</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Password</label>
                    <input type="password" className="uv-input" placeholder="••••••••" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Password</label>\n  <input type="password" className="uv-input" placeholder="••••••••" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Password</label>\n  <input type="password" className="uv-input" placeholder="••••••••" />\n</div>`}</pre>
                </div>
              </div>

              {/* 4. Email Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Email Input</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Email Address</label>
                    <input type="email" className="uv-input" placeholder="name@example.com" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Email Address</label>\n  <input type="email" className="uv-input" placeholder="name@example.com" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Email Address</label>\n  <input type="email" className="uv-input" placeholder="name@example.com" />\n</div>`}</pre>
                </div>
              </div>

              {/* 5. Phone Number Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Phone Number Input</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Phone Number</label>
                    <input type="tel" className="uv-input" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Phone Number</label>\n  <input type="tel" className="uv-input" placeholder="(555) 000-0000" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Phone Number</label>\n  <input type="tel" className="uv-input" placeholder="(555) 000-0000" />\n</div>`}</pre>
                </div>
              </div>

              {/* 6. Search Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Search Input</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <input type="search" className="uv-input" placeholder="Search..." />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <input type="search" className="uv-input" placeholder="Search..." />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <input type="search" className="uv-input" placeholder="Search..." />\n</div>`}</pre>
                </div>
              </div>

              {/* 7. Date Picker */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Date Picker</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Date of Birth</label>
                    <input type="date" className="uv-input" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Date of Birth</label>\n  <input type="date" className="uv-input" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Date of Birth</label>\n  <input type="date" className="uv-input" />\n</div>`}</pre>
                </div>
              </div>

              {/* 8. Checkbox */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Checkbox</h3>
                <div className="comp-preview">
                  <div className="uv-group">
                    <label className="uv-check-radio-label">
                      <input type="checkbox" className="uv-checkbox" /> I agree to the Terms of Service
                    </label>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-check-radio-label">\n    <input type="checkbox" className="uv-checkbox" /> I agree to the Terms of Service\n  </label>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-check-radio-label">\n    <input type="checkbox" className="uv-checkbox" /> I agree to the Terms of Service\n  </label>\n</div>`}</pre>
                </div>
              </div>

              {/* 9. Radio Button */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Radio Button</h3>
                <div className="comp-preview">
                  <div className="uv-group">
                    <label className="uv-label">Shipping Method</label>
                    <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Standard Shipping</label>
                    <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Express Shipping</label>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Shipping Method</label>\n  <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Standard Shipping</label>\n  <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Express Shipping</label>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Shipping Method</label>\n  <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Standard Shipping</label>\n  <label className="uv-check-radio-label"><input type="radio" name="shipping" className="uv-radio" /> Express Shipping</label>\n</div>`}</pre>
                </div>
              </div>

              {/* 10. Dropdown / Select */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Dropdown / Select</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Country</label>
                    <select className="uv-input" defaultValue="">
                      <option value="" disabled>Select an option</option>
                      <option>United States</option>
                      <option>India</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Country</label>\n  <select className="uv-input" defaultValue="">\n    <option value="" disabled>Select an option</option>\n    <option>United States</option>\n    <option>India</option>\n    <option>United Kingdom</option>\n  </select>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Country</label>\n  <select className="uv-input" defaultValue="">\n    <option value="" disabled>Select an option</option>\n    <option>United States</option>\n    <option>India</option>\n    <option>United Kingdom</option>\n  </select>\n</div>`}</pre>
                </div>
              </div>

              {/* 11. Multi-select */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Multi-select</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Select Skills (Hold Ctrl/Cmd to select multiple)</label>
                    <select multiple className="uv-input" style={{ minHeight: '100px' }}>
                      <option>React</option>
                      <option>Node.js</option>
                      <option>Python</option>
                      <option>CSS</option>
                    </select>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Select Skills (Hold Ctrl/Cmd to select multiple)</label>\n  <select multiple className="uv-input" style={{ minHeight: '100px' }}>\n    <option>React</option>\n    <option>Node.js</option>\n    <option>Python</option>\n    <option>CSS</option>\n  </select>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Select Skills (Hold Ctrl/Cmd to select multiple)</label>\n  <select multiple className="uv-input" style={{ minHeight: '100px' }}>\n    <option>React</option>\n    <option>Node.js</option>\n    <option>Python</option>\n    <option>CSS</option>\n  </select>\n</div>`}</pre>
                </div>
              </div>

              {/* 12. Autocomplete */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Autocomplete</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Browser</label>
                    <input list="browsers" className="uv-input" placeholder="Start typing..." />
                    <datalist id="browsers">
                      <option value="Chrome" />
                      <option value="Firefox" />
                      <option value="Safari" />
                      <option value="Edge" />
                    </datalist>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Browser</label>\n  <input list="browsers" className="uv-input" placeholder="Start typing..." />\n  <datalist id="browsers">\n    <option value="Chrome" />\n    <option value="Firefox" />\n    <option value="Safari" />\n    <option value="Edge" />\n  </datalist>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Browser</label>\n  <input list="browsers" className="uv-input" placeholder="Start typing..." />\n  <datalist id="browsers">\n    <option value="Chrome" />\n    <option value="Firefox" />\n    <option value="Safari" />\n    <option value="Edge" />\n  </datalist>\n</div>`}</pre>
                </div>
              </div>

              {/* 13. File Upload */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">File Upload</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Upload Profile Picture</label>
                    <input type="file" className="uv-file-input" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Upload Profile Picture</label>\n  <input type="file" className="uv-file-input" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Upload Profile Picture</label>\n  <input type="file" className="uv-file-input" />\n</div>`}</pre>
                </div>
              </div>

              {/* 14. Toggle Switch */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Toggle Switch (Native Checkbox)</h3>
                <div className="comp-preview">
                  <div className="uv-group">
                    <label className="uv-check-radio-label">
                      <input type="checkbox" className="uv-checkbox" /> Enable Notifications
                    </label>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-check-radio-label">\n    <input type="checkbox" className="uv-checkbox" /> Enable Notifications\n  </label>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-check-radio-label">\n    <input type="checkbox" className="uv-checkbox" /> Enable Notifications\n  </label>\n</div>`}</pre>
                </div>
              </div>

              {/* 15. Slider */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Slider</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Volume</label>
                    <input type="range" className="uv-slider" min="0" max="100" />
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Volume</label>\n  <input type="range" className="uv-slider" min="0" max="100" />\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Volume</label>\n  <input type="range" className="uv-slider" min="0" max="100" />\n</div>`}</pre>
                </div>
              </div>

              {/* 16. OTP Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">OTP Input</h3>
                <div className="comp-preview">
                  <div className="uv-group">
                    <label className="uv-label">Enter 4-digit Code</label>
                    <div className="uv-otp-container">
                      <input type="text" maxLength="1" className="uv-otp-input" />
                      <input type="text" maxLength="1" className="uv-otp-input" />
                      <input type="text" maxLength="1" className="uv-otp-input" />
                      <input type="text" maxLength="1" className="uv-otp-input" />
                    </div>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Enter 4-digit Code</label>\n  <div className="uv-otp-container">\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n  </div>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Enter 4-digit Code</label>\n  <div className="uv-otp-container">\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n    <input type="text" maxLength="1" className="uv-otp-input" />\n  </div>\n</div>`}</pre>
                </div>
              </div>

              {/* 17. Rating Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Rating Input</h3>
                <div className="comp-preview">
                  <RatingInput label="Rate your experience" />
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>React Component (Requires state)</span>
                    <SnippetCopyButton code={`import React, { useState } from 'react';\n\nexport default function Rating() {\n  const [rating, setRating] = useState(0);\n  \n  return (\n    <div className="uv-group">\n      <label className="uv-label">Rate your experience</label>\n      <div className="uv-rating">\n        {[1, 2, 3, 4, 5].map((star) => (\n          <span \n            key={star} \n            className={star <= rating ? 'active' : ''} \n            onClick={() => setRating(star)}\n          >\n            ★\n          </span>\n        ))}\n      </div>\n    </div>\n  );\n}`} />
                  </div>
                  <pre>{`import React, { useState } from 'react';

export default function Rating() {
  const [rating, setRating] = useState(0);
  
  return (
    <div className="uv-group">
      <label className="uv-label">Rate your experience</label>
      <div className="uv-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= rating ? 'active' : ''} 
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}`}</pre>
                </div>
              </div>

              {/* 18. Address Input */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Address Input (Group)</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '400px' }} className="uv-group">
                    <label className="uv-label">Shipping Address</label>
                    <input type="text" className="uv-input" placeholder="Street Address" style={{ marginBottom: '8px' }} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" className="uv-input" placeholder="City" />
                      <input type="text" className="uv-input" placeholder="Zip Code" />
                    </div>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Shipping Address</label>\n  <input type="text" className="uv-input" placeholder="Street Address" style={{ marginBottom: '8px' }} />\n  <div style={{ display: 'flex', gap: '8px' }}>\n    <input type="text" className="uv-input" placeholder="City" />\n    <input type="text" className="uv-input" placeholder="Zip Code" />\n  </div>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Shipping Address</label>\n  <input type="text" className="uv-input" placeholder="Street Address" style={{ marginBottom: '8px' }} />\n  <div style={{ display: 'flex', gap: '8px' }}>\n    <input type="text" className="uv-input" placeholder="City" />\n    <input type="text" className="uv-input" placeholder="Zip Code" />\n  </div>\n</div>`}</pre>
                </div>
              </div>

              {/* 19. Validation Message */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Validation Message (Error State)</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <label className="uv-label">Username</label>
                    <input type="text" className="uv-input error" defaultValue="johndoe" />
                    <span className="uv-helper error">This username is already taken.</span>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<div className="uv-group">\n  <label className="uv-label">Username</label>\n  <input type="text" className="uv-input error" defaultValue="johndoe" />\n  <span className="uv-helper error">This username is already taken.</span>\n</div>`} />
                  </div>
                  <pre>{`<div className="uv-group">\n  <label className="uv-label">Username</label>\n  <input type="text" className="uv-input error" defaultValue="johndoe" />\n  <span className="uv-helper error">This username is already taken.</span>\n</div>`}</pre>
                </div>
              </div>

              {/* 20. Submit Button */}
              <div className="comp-subsection" style={{ marginTop: '32px' }}>
                <h3 className="comp-subsection-title">Submit Button</h3>
                <div className="comp-preview">
                  <div style={{ maxWidth: '300px' }} className="uv-group">
                    <button type="submit" className="uv-button">Create Account</button>
                  </div>
                </div>
                <div className="code-block">
                  <div className="code-block-header">
                    <span>JSX</span>
                    <SnippetCopyButton code={`<button type="submit" className="uv-button">\n  Create Account\n</button>`} />
                  </div>
                  <pre>{`<button type="submit" className="uv-button">\n  Create Account\n</button>`}</pre>
                </div>
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
                        <td><strong>{c.name}</strong></td>
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
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>🔍 No components found matching <strong>"{searchQuery}"</strong></p>
              <p>Try searching for "Button", "Alert", "Badge", or a category like "Inputs" or "Feedback"</p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Components