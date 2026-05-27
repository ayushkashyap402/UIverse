// App.jsx – Root component that defines all routes
// To add a new page: import it and add a new <Route> below

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'
import GettingStarted from './pages/GettingStarted.jsx'

function App() {
  return (
    <Routes>
      {/* Home page – landing screen */}
      <Route path="/" element={<Home />} />

      {/* Components showcase page */}
      <Route path="/components" element={<Components />} />

      {/* Getting Started / documentation page */}
      <Route path="/docs" element={<GettingStarted />} />
    </Routes>
  )
}

export default App
