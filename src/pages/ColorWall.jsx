import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import './ColorWall.css';

const defaultPresets = [
  { name: 'Ocean Breeze', colors: ['#0f172a', '#0ea5e9', '#38bdf8', '#e0f2fe'] },
  { name: 'Sunset Glow', colors: ['#4c0519', '#e11d48', '#fb923c', '#ffedd5'] },
  { name: 'Forest Path', colors: ['#064e3b', '#10b981', '#6ee7b7', '#d1fae5'] },
  { name: 'Purple Dream', colors: ['#3b0764', '#9333ea', '#d8b4fe', '#f3e8ff'] }
];

function ColorWall() {
  const [copiedColor, setCopiedColor] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // PHASE 3 STATE
  // Initialize custom palettes from local storage
  const [customPalettes, setCustomPalettes] = useState(() => {
    const savedCustom = localStorage.getItem('uiverse-custom-palettes');
    return savedCustom ? JSON.parse(savedCustom) : [];
  });

  // State for the builder inputs
  const [customName, setCustomName] = useState('');
  const [customColors, setCustomColors] = useState(['#ffffff', '#ffffff', '#ffffff', '#ffffff']);

  // Combine default presets and user-created custom palettes into one master list
  const allPalettes = [...customPalettes, ...defaultPresets];

  // ── PHASE 2 STATE (Favorites) ──
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('uiverse-favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Sync favorites to local storage
  useEffect(() => {
    localStorage.setItem('uiverse-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync custom palettes to local storage
  useEffect(() => {
    localStorage.setItem('uiverse-custom-palettes', JSON.stringify(customPalettes));
  }, [customPalettes]);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const toggleFavorite = (presetName) => {
    if (favorites.includes(presetName)) {
      setFavorites(favorites.filter(name => name !== presetName));
    } else {
      setFavorites([...favorites, presetName]);
    }
  };

  // PHASE 3 FUNCTIONS 
  // Handles updating a specific color slot (0 to 3) when a picker changes
  const handleColorChange = (index, value) => {
    const updatedColors = [...customColors];
    updatedColors[index] = value;
    setCustomColors(updatedColors);
  };

  // Saves the custom palette
  const handleSaveCustomPalette = (e) => {
    e.preventDefault(); // Prevents the form from reloading the page
    if (!customName.trim()) return alert('Please enter a palette name!');

    const newPalette = {
      name: customName,
      colors: [...customColors],
      isCustom: true // Tagged so we can display a custom badge if we want
    };

    setCustomPalettes([newPalette, ...customPalettes]);
    setCustomName(''); // Reset input field
    setCustomColors(['#ffffff', '#ffffff', '#ffffff', '#ffffff']);
    alert(`🎉 "${customName}" added to your collection!`);
  };

  // Filter master list based on active tab
  const displayedPalettes = activeTab === 'all' 
    ? allPalettes 
    : allPalettes.filter(p => favorites.includes(p.name));

  return (
    <div className="color-wall-page">
      <Navbar />
      
      <main className="color-wall-main">
        <div className="color-wall-header">
          <h1>🎨 Color Wall</h1>
          <p>Explore, save, and test beautiful color combinations.</p>
        </div>

        {/* ── CUSTOM PALETTE BUILDER FORM ── */}
        <section className="builder-section">
          <h2>Create Custom Palette</h2>
          <form onSubmit={handleSaveCustomPalette} className="builder-form">
            <div className="builder-inputs">
              <input 
                type="text" 
                placeholder="Name your palette (e.g., Midnight Cyber)" 
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="builder-text-input"
              />
              <button type="submit" className="builder-submit-btn">Save Palette</button>
            </div>

            <div className="builder-pickers">
              {customColors.map((color, index) => (
                <div key={index} className="picker-container">
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="color-picker-input"
                  />
                  <span className="picker-hex-label">{color.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </form>
        </section>

        {/* ── PALETTE EXPLORER ── */}
        <section className="color-wall-section">
          <div className="wall-tabs">
            <button 
              className={`wall-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Palettes ({allPalettes.length})
            </button>
            <button 
              className={`wall-tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              My Favorites ({favorites.length})
            </button>
          </div>
          
          <div className="palette-grid">
            {displayedPalettes.length === 0 ? (
              <p className="empty-state">No palettes found here!</p>
            ) : (
              displayedPalettes.map((preset, index) => (
                <div key={index} className="palette-card">
                  
                  <div className="palette-swatches">
                    {preset.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="swatch"
                        style={{ backgroundColor: color }}
                        title={`Copy ${color}`}
                        onClick={() => handleCopy(color)}
                      ></div>
                    ))}
                  </div>

                  <div className="palette-info">
                    <div className="palette-info-header">
                      <h3>
                        {preset.name}
                        {preset.isCustom && <span className="custom-badge">Custom</span>}
                      </h3>
                      <button 
                        className="favorite-btn" 
                        onClick={() => toggleFavorite(preset.name)}
                      >
                        {favorites.includes(preset.name) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    <div className="hex-codes">
                      {preset.colors.map((color, idx) => (
                        <span 
                          key={idx} 
                          className="clickable-hex"
                          onClick={() => handleCopy(color)}
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {copiedColor && (
        <div className="copy-toast">
            🎨 Copied <strong>{copiedColor}</strong> to clipboard! 🎨
        </div>
      )}
    </div>
  );
}

export default ColorWall;