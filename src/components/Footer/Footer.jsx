import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="uiverse-footer">
      <div className="footer-container">
        {/* Branding */}
        <div className="footer-section">
          <h2>UIverse</h2>
          <p>Beginner-friendly React UI component library.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/components">Components</Link>
        </div>

        {/* Community */}
        <div className="footer-section">
          <h3>Community</h3>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord />
            Discord
          </a>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3>Legal</h3>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} UIverse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
