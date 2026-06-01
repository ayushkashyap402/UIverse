import React, {
  createContext, useContext, useState,
  useRef, useEffect, useCallback,
} from 'react'
import './Tabs.css'

const TabsContext = createContext(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Use inside <Tabs>')
  return ctx
}

function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue ?? '')
  const triggerRefs = useRef({})
  const registerTrigger = useCallback((value, el) => {
    if (el) triggerRefs.current[value] = el
    else delete triggerRefs.current[value]
  }, [])
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, triggerRefs, registerTrigger }}>
      <div className="uiverse-tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function List({ ariaLabel, children }) {
  const { activeTab, triggerRefs } = useTabs()
  const listRef = useRef(null)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })
  const [ready, setReady] = useState(false)

  const updateUnderline = useCallback(() => {
    const activeTrigger = triggerRefs.current[activeTab]
    const list = listRef.current
    if (!activeTrigger || !list) return
    const listRect = list.getBoundingClientRect()
    const triggerRect = activeTrigger.getBoundingClientRect()
    setUnderline({ left: triggerRect.left - listRect.left, width: triggerRect.width })
    setReady(true)
  }, [activeTab, triggerRefs])

  useEffect(() => { updateUnderline() }, [updateUnderline])

  useEffect(() => {
    const observer = new ResizeObserver(updateUnderline)
    if (listRef.current) observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [updateUnderline])

  function handleKeyDown(e) {
    const triggers = Array.from(
      listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') ?? []
    )
    const currentIndex = triggers.indexOf(document.activeElement)
    if (currentIndex === -1) return
    let nextIndex = currentIndex
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % triggers.length
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + triggers.length) % triggers.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = triggers.length - 1
    else return
    e.preventDefault()
    triggers[nextIndex].focus()
    triggers[nextIndex].click()
  }

  return (
    <div ref={listRef} role="tablist" aria-label={ariaLabel}
      className="uiverse-tabs__list" onKeyDown={handleKeyDown}>
      {children}
      <span className="uiverse-tabs__indicator"
        style={{ left: underline.left, width: underline.width, opacity: ready ? 1 : 0 }}
        aria-hidden="true" />
    </div>
  )
}

function Trigger({ value, children, disabled = false }) {
  const { activeTab, setActiveTab, registerTrigger } = useTabs()
  const isActive = activeTab === value
  const ref = useRef(null)
  useEffect(() => {
    registerTrigger(value, ref.current)
    return () => registerTrigger(value, null)
  }, [value, registerTrigger])
  return (
    <button ref={ref} role="tab"
      id={`uiverse-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`uiverse-tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={`uiverse-tabs__trigger${isActive ? ' uiverse-tabs__trigger--active' : ''}`}
      onClick={() => !disabled && setActiveTab(value)}>
      {children}
    </button>
  )
}

function Content({ value, children }) {
  const { activeTab } = useTabs()
  const isActive = activeTab === value
  return (
    <div role="tabpanel"
      id={`uiverse-tabpanel-${value}`}
      aria-labelledby={`uiverse-tab-${value}`}
      hidden={!isActive}
      className={`uiverse-tabs__content${isActive ? ' uiverse-tabs__content--active' : ''}`}>
      {children}
    </div>
  )
}

Tabs.List    = List
Tabs.Trigger = Trigger
Tabs.Content = Content

export default Tabs