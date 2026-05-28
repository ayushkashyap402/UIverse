// App.jsx – Root component that defines all routes
// To add a new page: import it and add a new <Route> below

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'
import GettingStarted from './pages/GettingStarted.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      {/* Home page – landing screen */}
      <Route path="/" element={<Home />} />

      {/* Components showcase page */}
      <Route path="/components" element={<Components />} />

      {/* Getting Started / documentation page */}
      <Route path="/docs" element={<GettingStarted />} />

      {/* Wildcard fallback page – catches all unmatched URLs to prevent a blank white screen */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App