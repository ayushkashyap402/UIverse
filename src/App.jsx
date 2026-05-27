// App.jsx – Root component that defines all routes
// To add a new page: import it and add a new <Route> below

import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home.jsx'))
const Components = lazy(() => import('./pages/Components.jsx'))
const GettingStarted = lazy(() => import('./pages/GettingStarted.jsx'))

function App() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <Routes>
        {/* Home page – landing screen */}
        <Route path="/" element={<Home />} />

        {/* Components showcase page */}
        <Route path="/components" element={<Components />} />

        {/* Getting Started / documentation page */}
        <Route path="/docs" element={<GettingStarted />} />
      </Routes>
    </Suspense>
  )
}

export default App
