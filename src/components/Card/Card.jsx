// Card.jsx – Reusable Card component for layout presentation
//
// Props:
//   title          (string)   – The heading displayed in the card
//   description    (string)   – The main body text
//   imageUrl       (string)   – Optional image URL displayed at the top
//   badgeText      (string)   – Optional tag text (e.g., "New", "Hot")
//   buttonText     (string)   – Optional button label (e.g., "Read More")
//   onButtonClick  (function) – Callback triggered on button click
//
// Features:
//   - Self-contained, simple HTML elements
//   - Elegant Vanilla CSS transitions on hover

import React from 'react'
import './Card.css'

function Card({
  title = 'Card Title',
  description = 'This is a simple card description. You can pass custom props to modify this content.',
  imageUrl,
  badgeText,
  buttonText,
  onButtonClick
}) {
  return (
    <div className="uiverse-card">
      {/* Optional Badge/Tag */}
      {badgeText && (
        <span className="uiverse-card-badge">
          {badgeText}
        </span>
      )}

      {/* Optional Top Image */}
      {imageUrl && (
        <div className="uiverse-card-image-wrap">
          <img src={imageUrl} alt={title} className="uiverse-card-image" />
        </div>
      )}

      {/* Card Content body */}
      <div className="uiverse-card-body">
        <h3 className="uiverse-card-title">{title}</h3>
        <p className="uiverse-card-desc">{description}</p>
        
        {/* Optional Call to Action Button */}
        {buttonText && (
          <button className="uiverse-card-btn" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
