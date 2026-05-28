import React, { useState, useMemo, useEffect, useRef } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert.jsx'
import NavbarComponent from '../components/NavbarComponent/NavbarComponent.jsx'
import Card from '../components/Card/Card.jsx'
import Input from '../components/Input/Input.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

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
    id: 'inputs',
    label: 'Inputs',
    componentName: 'Input',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'cards',
    label: 'Cards',
    componentName: 'Card',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
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
    id: 'navbars',
    label: 'Navbars',
    componentName: 'Navbar',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="4" rx="1"/>
        <line x1="2" y1="13" x2="22" y2="13" strokeDasharray="3 3" strokeWidth="1.5"/>
        <line x1="2" y1="19" x2="22" y2="19" strokeDasharray="3 3" strokeWidth="1.5"/>
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

/* ================= COMPONENT ================= */

function Components() {
  const [activeSection, setActiveSection] = useState('buttons')
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Interactive preview state for showcase Input
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('invalid-email-address')

  // Refs for scrolling
  const buttonsRef = useRef(null)
  const inputsRef = useRef(null)
  const cardsRef = useRef(null)
  const badgesRef = useRef(null)
  const alertsRef = useRef(null)
  const navbarsRef = useRef(null)
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
      case 'inputs':
        element = inputsRef.current
        break
      case 'cards':
        element = cardsRef.current
        break
      case 'badges':
        element = badgesRef.current
        break
      case 'alerts':
        element = alertsRef.current
        break
      case 'navbars':
        element = navbarsRef.current
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
      } else if (searchLower.includes('input') || filteredComponents.some(c => c.name === 'Input')) {
        scrollTo('inputs')
      } else if (searchLower.includes('card') || filteredComponents.some(c => c.name === 'Card')) {
        scrollTo('cards')
      } else if (searchLower.includes('badge') || filteredComponents.some(c => c.name === 'Badge')) {
        scrollTo('badges')
      } else if (searchLower.includes('alert') || filteredComponents.some(c => c.name === 'Alert')) {
        scrollTo('alerts')
      } else if (searchLower.includes('navbar') || filteredComponents.some(c => c.name === 'Navbar')) {
        scrollTo('navbars')
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
    if (shouldShowSection('inputs', 'Input')) count++
    if (shouldShowSection('cards', 'Card')) count++
    if (shouldShowSection('badges', 'Badge')) count++
    if (shouldShowSection('alerts', 'Alert')) count++
    if (shouldShowSection('navbars', 'Navbar')) count++
    if (filteredComponents.length > 0) count++
    return count
  }, [searchQuery, filteredComponents])

  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="comp-sidebar">
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
                onClick={() => scrollTo(s.id)}
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
                  <span>JSX Usage</span>

                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Button 
  text="Primary" 
  variant="primary" 
  size="md" 
  onClick={() => console.log("Clicked")} 
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

                <pre>{`<Button 
  text="Primary" 
  variant="primary" 
  size="md" 
  onClick={() => console.log("Clicked")} 
/>`}</pre>
              </div>
            </section>
          )}

          {/* ================= INPUTS ================= */}
          {shouldShowSection('inputs', 'Input') && (
            <section className="comp-section" id="inputs" ref={inputsRef}>
              <div className="comp-section-header">
                <h2>Input</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Accessible, controlled form text input field. Demonstrates live state binding and validation error styling.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Interactive Field Showcase</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Type in the input below to see standard reactive binding.</p>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%', marginBottom: '1.5rem' }}>
                  <Input 
                    label="Username" 
                    placeholder="Enter username..." 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                  
                  {username && (
                    <div style={{ display: 'flex', alignItems: 'center', height: '42px', marginTop: '26px', padding: '0 1rem', border: '1px dashed #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', color: '#475569' }}>
                      State Value: <strong style={{ marginLeft: '6px', color: '#4f46e5' }}>{username}</strong>
                    </div>
                  )}
                </div>

                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Input with Error Validation</h3>
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                  <Input 
                    label="Email Address" 
                    placeholder="Enter email..." 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    error="Please enter a valid email address (missing '@')." 
                  />
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>JSX Usage</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Input 
  label="Username" 
  type="text" 
  placeholder="Enter username..." 
  value={username} 
  onChange={(e) => setUsername(e.target.value)} 
  error="" 
  id="username-field" 
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
                <pre>{`<Input 
  label="Username" 
  type="text" 
  placeholder="Enter username..." 
  value={username} 
  onChange={(e) => setUsername(e.target.value)} 
  error="" 
  id="username-field" 
/>`}</pre>
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
                        <td><code>label</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Input heading label text</td>
                      </tr>
                      <tr>
                        <td><code>type</code></td>
                        <td>string</td>
                        <td><code>"text"</code></td>
                        <td>Input field type: text · email · password etc.</td>
                      </tr>
                      <tr>
                        <td><code>placeholder</code></td>
                        <td>string</td>
                        <td><code>"Type here..."</code></td>
                        <td>Greyed out field guideline text</td>
                      </tr>
                      <tr>
                        <td><code>value</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>The controlled component state value</td>
                      </tr>
                      <tr>
                        <td><code>onChange</code></td>
                        <td>function</td>
                        <td><code>-</code></td>
                        <td>Input character typing event handler</td>
                      </tr>
                      <tr>
                        <td><code>error</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Renders validation border red and prints message</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ================= CARDS ================= */}
          {shouldShowSection('cards', 'Card') && (
            <section className="comp-section" id="cards" ref={cardsRef}>
              <div className="comp-section-header">
                <h2>Card</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                Visual card containers for structured content presentation. Supports top header images, status tags, action buttons, and hover animations.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '1.25rem' }}>Variants</h3>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', width: '100%', marginBottom: '1.5rem' }}>
                  
                  {/* Card with image and badge */}
                  <Card 
                    title="Vibrant Abstracts"
                    description="Explore premium modern design patterns, abstract color palettes, and elegant structural borders."
                    imageUrl="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80"
                    badgeText="New"
                    buttonText="Explore Now"
                    onButtonClick={() => alert('Card clicked!')}
                  />

                  {/* Text-only minimal card */}
                  <Card 
                    title="Minimal Card Structure"
                    description="Clean text-based card layout. Focuses purely on spacing, soft rounded corners, and minimal content composition."
                    buttonText="Read Details"
                    onButtonClick={() => alert('Details clicked!')}
                  />

                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>JSX Usage</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Card 
  title="Vibrant Abstracts"
  description="Explore premium modern design patterns."
  imageUrl="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600"
  badgeText="New"
  buttonText="Explore Now"
  onButtonClick={() => console.log("Card Clicked")}
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
                <pre>{`<Card 
  title="Vibrant Abstracts"
  description="Explore premium modern design patterns."
  imageUrl="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600"
  badgeText="New"
  buttonText="Explore Now"
  onButtonClick={() => console.log("Card Clicked")}
/>`}</pre>
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
                        <td><code>title</code></td>
                        <td>string</td>
                        <td><code>"Card Title"</code></td>
                        <td>The title text of the card</td>
                      </tr>
                      <tr>
                        <td><code>description</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Body text describing the content</td>
                      </tr>
                      <tr>
                        <td><code>imageUrl</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Optional header background image path</td>
                      </tr>
                      <tr>
                        <td><code>badgeText</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Optional tags / badges (e.g. "Featured")</td>
                      </tr>
                      <tr>
                        <td><code>buttonText</code></td>
                        <td>string</td>
                        <td><code>-</code></td>
                        <td>Optional call-to-action button text</td>
                      </tr>
                      <tr>
                        <td><code>onButtonClick</code></td>
                        <td>function</td>
                        <td><code>-</code></td>
                        <td>Click handler for the call-to-action button</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                  <span>JSX Usage</span>

                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Badge 
  text="Primary" 
  variant="primary" 
  pill={false} 
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

                <pre>{`<Badge 
  text="Primary" 
  variant="primary" 
  pill={false} 
/>`}</pre>
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
                  <span>JSX Usage</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<Alert 
  type="success" 
  message="Action completed successfully!" 
  closable={false} 
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
                <pre>{`<Alert 
  type="success" 
  message="Action completed successfully!" 
  closable={false} 
/>`}</pre>
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

          {/* ================= NAVBARS ================= */}
          {shouldShowSection('navbars', 'Navbar') && (
            <section className="comp-section" id="navbars" ref={navbarsRef}>
              <div className="comp-section-header">
                <h2>Navbar</h2>
                <span className="comp-badge comp-badge--stable">Stable</span>
              </div>

              <p className="comp-section-desc">
                A simple, fully responsive, and beginner-friendly top navigation bar component. Supports multiple color variants and auto-collapses on mobile screens.
              </p>

              <div className="comp-subsection">
                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Light Variant</h3>
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                  <NavbarComponent variant="light" brandName="UIverse" />
                </div>

                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Dark Variant</h3>
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                  <NavbarComponent variant="dark" brandName="UIverse" />
                </div>

                <h3 className="comp-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Primary Variant</h3>
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                  <NavbarComponent variant="primary" brandName="UIverse" />
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>JSX Usage</span>
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopy(`<NavbarComponent 
  brandName="UIverse" 
  variant="light" 
  links={[
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" }
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
                <pre>{`<NavbarComponent 
  brandName="UIverse" 
  variant="light" 
  links={[
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" }
  ]} 
/>`}</pre>
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
                        <td><code>brandName</code></td>
                        <td>string</td>
                        <td><code>"UIverse"</code></td>
                        <td>The text brand logo on the left</td>
                      </tr>
                      <tr>
                        <td><code>variant</code></td>
                        <td>string</td>
                        <td><code>"light"</code></td>
                        <td>Color scheme: <code>"light"</code> | <code>"dark"</code> | <code>"primary"</code></td>
                      </tr>
                      <tr>
                        <td><code>links</code></td>
                        <td>array</td>
                        <td><code>[...]</code></td>
                        <td>Array of link items: <code>{"{"} label, href {"}"}</code></td>
                      </tr>
                    </tbody>
                  </table>
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