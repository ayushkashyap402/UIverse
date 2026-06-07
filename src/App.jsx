// App.jsx – Root component that defines all routes
// To add a new page: import it and add a new <Route> below

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'
import GettingStarted from './pages/GettingStarted.jsx'

import ColorWall from './pages/ColorWall.jsx';

function App() {
  return (
    <Routes>
      {/* Home page – landing screen */}
      <Route path="/" element={<Home />} />

      {/* Components showcase page */}
      <Route path="/components" element={<Components />} />

      {/* Color Wall */}
      <Route path="/color-wall" element={<ColorWall />} />
      {/* Getting Started / documentation page */}
      <Route path="/docs" element={<GettingStarted />} />
    </Routes>
  )
}

export default App
