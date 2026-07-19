// Dropdown.jsx

// Props:
// label (string) - Input label
// options (array) - Array of options
// value (string | array) - Selected value(s)
// onChange (function) - Change handler
// placeholder (string) - Placeholder text
// searchable (boolean) - Enable search
// multiple (boolean) - Enable multi-select
// disabled (boolean) - Disable dropdown
// loading (boolean) - Loading state
// clearable (boolean) - Show clear button
// error (boolean) - Error state
// success (boolean) - Success state
// helperText (string) - Helper/error text

import React, { useState, useMemo, useRef, useEffect } from 'react'
import './Dropdown.css'

function Dropdown({
  label = '',
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Select...',
  searchable = false,
  multiple = false,
  disabled = false,
  loading = false,
  clearable = false,
  error = false,
  success = false,
  helperText = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options

    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
  }, [search, searchable, options])

  const isSelected = (option) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(option.value)
    }

    return value === option.value
  }

  const handleSelect = (option) => {
    if (disabled) return

    if (multiple) {
      let updated = []

      if (Array.isArray(value)) {
        if (value.includes(option.value)) {
          updated = value.filter((v) => v !== option.value)
        } else {
          updated = [...value, option.value]
        }
      } else {
        updated = [option.value]
      }

      onChange(updated)
    } else {
      onChange(option.value)

      setIsOpen(false)
    }
  }

  const getLabel = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder

      return value.length + ' selected'
    }

    const selected = options.find((o) => o.value === value)

    return selected ? selected.label : placeholder
  }

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}

      <button
        type="button"
        disabled={disabled}
        className={`
          dropdown-trigger
          ${error ? 'dropdown-error' : ''}
          ${success ? 'dropdown-success' : ''}
        `}
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
      >
        <span>{loading ? 'Loading...' : getLabel()}</span>

        <div className="dropdown-actions">
          {clearable && !multiple && value && (
            <button
              type="button"
              className="dropdown-clear"
              onClick={(e) => {
                e.stopPropagation()

                onChange('')
              }}
            >
              ×
            </button>
          )}

          <span className={`dropdown-arrow ${isOpen ? 'dropdown-arrow-open' : ''}`}>▼</span>
        </div>
      </button>

      {isOpen && !loading && (
        <div className="dropdown-menu">
          {searchable && (
            <input
              className="dropdown-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {filteredOptions.length === 0 ? (
            <div className="dropdown-empty">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`
                  dropdown-option
                  ${isSelected(option) ? 'selected' : ''}
                `}
                onClick={() => handleSelect(option)}
              >
                {option.icon && <span className="dropdown-icon">{option.icon}</span>}

                {option.flag && <span className="dropdown-flag">{option.flag}</span>}

                {option.avatar && <img src={option.avatar} alt="" className="dropdown-avatar" />}

                <span>{option.label}</span>
              </div>
            ))
          )}
        </div>
      )}

      {helperText && (
        <small
          className={`
            dropdown-helper
            ${error ? 'dropdown-helper-error' : ''}
            ${success ? 'dropdown-helper-success' : ''}
          `}
        >
          {helperText}
        </small>
      )}
    </div>
  )
}

export default Dropdown
