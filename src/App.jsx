import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Components from './pages/Components.jsx'

import Footer from './components/Footer/Footer.jsx'

import GettingStarted from './pages/GettingStarted.jsx'


function App() {
  return (
    <>
      <Routes>
        {/* Home page – landing screen */}
        <Route path="/" element={<Home />} />

        {/* Components showcase page */}
        <Route path="/components" element={<Components />} />
      </Routes>


      {/* Footer shown on all pages */}
      <Footer />
    </>

      {/* Components showcase page */}
      <Route path="/components" element={<Components />} />

      {/* Getting Started / documentation page */}
      <Route path="/docs" element={<GettingStarted />} />
    </Routes>

  )
}

export default App