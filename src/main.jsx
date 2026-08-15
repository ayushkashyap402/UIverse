// main.jsx – Entry point of the application
// Wraps the app with BrowserRouter so routing works throughout the project

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Cursor from "./components/Cursor";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Cursor />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
