import React, { useState, useMemo, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import { componentsList } from '../data/componentsList.js'
import './Components.css'

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

const GenericIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="8" width="18" height="8" rx="3"/>
  </svg>
)

const AllIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)

/* ================= COMPONENT ================= */

function Components() {
  // Generate sections dynamically from componentsList
  const dynamicSections = useMemo(() => {
    const stableComponents = componentsList.filter(c => c.status === 'Stable')
    const sections = stableComponents.map(c => ({
      id: c.name.toLowerCase() + 's',
      label: c.name + 's',
      componentName: c.name,
      icon: <GenericIcon />,
    }))
    sections.push({
      id: 'all-components',
      label: 'All Components',
      componentName: null,
      icon: <AllIcon />,
    })
    return sections
  }, [])

  const [activeSection, setActiveSection] = useState(dynamicSections[0]?.id || 'all-components')
  const [copiedCode, setCopiedCode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Refs for scrolling
  const sectionRefs = useRef({})

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 1800)
  }

  const scrollTo = (id) => {
    setActiveSection(id)
    const element = sectionRefs.current[id]
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
    
    if (componentName && componentName.toLowerCase().includes(searchLower)) {
      return true
    }
    
    return filteredComponents.some(c => c.name === componentName)
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const firstMatching = dynamicSections.find(s => 
        s.componentName ? shouldShowSection(s.id, s.componentName) : filteredComponents.length > 0
      )
      if (firstMatching) {
        scrollTo(firstMatching.id)
      }
    }
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
  }

  const visibleSectionsCount = useMemo(() => {
    return dynamicSections.filter(s => 
      s.componentName ? shouldShowSection(s.id, s.componentName) : filteredComponents.length > 0
    ).length
  }, [searchQuery, filteredComponents, dynamicSections])

  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">
        {/* ================= SIDEBAR ================= */}
        <aside className="comp-sidebar">
          <p className="sidebar-label">ON THIS PAGE</p>

          {dynamicSections.map((s) => {
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

          {/* DYNAMIC SECTIONS */}
          {componentsList.filter(c => c.status === 'Stable').map(c => {
            const sectionId = c.name.toLowerCase() + 's'
            if (!shouldShowSection(sectionId, c.name)) return null

            return (
              <section 
                key={c.id} 
                className="comp-section" 
                id={sectionId} 
                ref={el => sectionRefs.current[sectionId] = el}
              >
                <div className="comp-section-header">
                  <h2>{c.name}</h2>
                  <span className="comp-badge comp-badge--stable">Stable</span>
                </div>

                <p className="comp-section-desc">{c.description}</p>

                {c.preview && (
                  <div className="comp-preview">
                    {c.preview}
                  </div>
                )}

                {c.code && (
                  <div className="code-block">
                    <div className="code-block-header">
                      <span>JSX</span>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopy(c.code, c.id)}
                      >
                        {copiedCode === c.id ? (
                          <><CheckIcon /> Copied</>
                        ) : (
                          <><CopyIcon /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre>{c.code}</pre>
                  </div>
                )}
              </section>
            )
          })}

          {/* ================= ALL COMPONENTS TABLE ================= */}
          {filteredComponents.length > 0 && (
            <section 
              className="comp-section" 
              id="all-components" 
              ref={el => sectionRefs.current['all-components'] = el}
            >
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
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Components