import React, { useState, useMemo, useEffect, useRef } from 'react'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'
import CodeBlock from '../components/docs/CodeBlock.jsx'
import PropsTable from '../components/docs/PropsTable.jsx'
import VariantPreview from '../components/docs/VariantPreview.jsx'
import ComponentSection from '../components/docs/ComponentSection.jsx'
import { componentDocs } from '../data/componentDocs.js'

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

const componentMap = {
  Button,
  Badge,
  Alert,
}

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
  
  // Refs for scrolling
  const buttonsRef = useRef(null)
  const badgesRef = useRef(null)
  const alertsRef = useRef(null)
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
      } else if (searchLower.includes('badge') || filteredComponents.some(c => c.name === 'Badge')) {
        scrollTo('badges')
      } else if (searchLower.includes('alert') || filteredComponents.some(c => c.name === 'Alert')) {
        scrollTo('alerts')
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

          {componentDocs.map((doc) => {
  const DynamicComponent =
    componentMap[doc.component]

  return (
    shouldShowSection(doc.id, doc.component) && (
      <ComponentSection
        key={doc.id}
        id={doc.id}
        sectionRef={
          doc.id === 'buttons'
            ? buttonsRef
            : doc.id === 'badges'
            ? badgesRef
            : alertsRef
        }
        title={doc.title}
        status={doc.status}
        description={doc.description}
      >
        <div className="comp-subsection">
  {doc.subsectionTitle && (
    <h3 className="comp-subsection-title">
      {doc.subsectionTitle}
    </h3>
  )}

  <VariantPreview>
    {doc.variants.map((variant, index) => (
      <DynamicComponent
        key={index}
        {...variant}
      />
    ))}
  </VariantPreview>
</div>

        <CodeBlock
          code={doc.code}
          copied={copied}
          onCopy={handleCopy}
          CopyIcon={CopyIcon}
          CheckIcon={CheckIcon}
        />

        {doc.propsTable && (
          <div className="comp-subsection">
            <h3 className="comp-subsection-title">
              Props
            </h3>

            <PropsTable
              propsData={doc.propsTable}
            />
          </div>
        )}
      </ComponentSection>
    )
  )
})}

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