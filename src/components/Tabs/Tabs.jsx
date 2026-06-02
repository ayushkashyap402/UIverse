import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import './Tabs.css'

const TabsContext = createContext(null)

export function Tabs({ defaultValue, value, onValueChange, variant = 'underline', children, className = '' }) {
  const [activeTab, setActiveTabState] = useState(value !== undefined ? value : defaultValue)

  useEffect(() => {
    if (value !== undefined) {
      setActiveTabState(value)
    }
  }, [value])

  const setActiveTab = (newValue) => {
    if (value === undefined) {
      setActiveTabState(newValue)
    }
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={`uiverse-tabs ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '' }) {
  const { activeTab, variant } = useContext(TabsContext)
  const listRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, top: 0, height: 0 })

  useEffect(() => {
    const listElement = listRef.current
    if (!listElement) return

    const updateIndicator = () => {
      const activeBtn = listElement.querySelector(`[role="tab"][data-value="${activeTab}"]`)
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          top: activeBtn.offsetTop,
          height: activeBtn.offsetHeight,
        })
      }
    }

    // Delay update slightly to allow layout to settle
    const rafId = requestAnimationFrame(updateIndicator)

    window.addEventListener('resize', updateIndicator)

    const observer = new MutationObserver(updateIndicator)
    observer.observe(listElement, { childList: true, subtree: true, attributes: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateIndicator)
      observer.disconnect()
    }
  }, [activeTab, children])

  const handleKeyDown = (e) => {
    const listElement = listRef.current
    if (!listElement) return

    const tabs = Array.from(
      listElement.querySelectorAll('[role="tab"]:not([disabled])')
    )
    const activeElement = document.activeElement
    const currentIndex = tabs.indexOf(activeElement)

    if (currentIndex === -1) return

    let nextIndex = currentIndex
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    e.preventDefault()
    const nextTab = tabs[nextIndex]
    if (nextTab) {
      nextTab.focus()
      const newValue = nextTab.getAttribute('data-value')
      nextTab.click()
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Tabs"
      className={`uiverse-tabs-list uiverse-tabs-list--${variant} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {children}
      <span
        className={`uiverse-tabs-indicator uiverse-tabs-indicator--${variant}`}
        style={{
          transform: `translateX(${indicatorStyle.left}px) translateY(${indicatorStyle.top}px)`,
          width: `${indicatorStyle.width}px`,
          height: variant === 'pills' ? `${indicatorStyle.height}px` : undefined,
        }}
      />
    </div>
  )
}

export function TabsTrigger({ value, disabled = false, children, className = '' }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`uiverse-tabpanel-${value}`}
      id={`uiverse-tab-${value}`}
      data-value={value}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={`uiverse-tabs-trigger ${isActive ? 'uiverse-tabs-trigger--active' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '' }) {
  const { activeTab } = useContext(TabsContext)
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      id={`uiverse-tabpanel-${value}`}
      aria-labelledby={`uiverse-tab-${value}`}
      tabIndex={0}
      className={`uiverse-tabs-content ${className}`}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
