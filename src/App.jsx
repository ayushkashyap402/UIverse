// App.jsx – Root component that defines all routes
// To add a new page: import it and add a new <Route> below


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Components from "./pages/Components.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

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


      {/* Auth pages */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected route */}
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

      {/* Getting Started / documentation page */}
      <Route path="/docs" element={<GettingStarted />} />

    </Routes>
  );
}

export default App;
