import React from 'react'
import './footerC.css'


const FooterC = ({
  logo = "YourBrand",
  description = "Building modern web experiences with clean and reusable components.",
  links = [],
  socialLinks = [],
  copyright = "© 2026 YourBrand. All rights reserved.",
}) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>{logo}</h2>
          <p>{description}</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Follow Us</h3>

          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{copyright}</p>
      </div>
    </footer>
  );
};

export default FooterC;