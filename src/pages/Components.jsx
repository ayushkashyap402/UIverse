// Components.jsx – Component showcase page

import React, { useState } from "react";
import Button from "../components/Button/Button.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Badge from "../components/Badge/Badge.jsx";
import { componentsList } from "../data/componentsList.js";
import "./Components.css";
import { generateComponent as aiGenerate } from "../lib/ai.js";

/* ================= SECTIONS ================= */

const sections = [
  {
    id: "buttons",
    label: "Buttons",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="8" width="18" height="8" rx="3" />
      </svg>
    ),
  },
  {
    id: "badges",
    label: "Badges",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7z" />
      </svg>
    ),
  },
  {
    id: "all-components",
    label: "All Components",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    id: "ai-generator",
    label: "AI Generator",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
];

/* ================= ICONS ================= */

const CopyIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ================= COMPONENT ================= */

function Components() {
  const [activeSection, setActiveSection] = useState("buttons");
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const generateComponent = async () => {
    if (!prompt.trim()) return;
    try {
      setLoading(true);
      const text = await aiGenerate(`
      Generate a reusable React JSX UI component.
      Requirements: Return ONLY JSX code, no explanations, modern UI, Tailwind CSS only.
      Prompt: ${prompt}
    `);
      setGeneratedCode(text);
    } catch (error) {
      setGeneratedCode("Failed to generate component.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="comp-page">
      <Navbar />

      <div className="comp-layout">
        {/* ================= SIDEBAR ================= */}
        <aside className="comp-sidebar">
          <p className="sidebar-label">ON THIS PAGE</p>

          {sections.map((s) => (
            <button
              key={s.id}
              className={`sidebar-item ${activeSection === s.id ? "sidebar-item--active" : ""}`}
              onClick={() => scrollTo(s.id)}
            >
              <span className="sidebar-item-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}

          <div className="sidebar-divider" />

          <p className="sidebar-label">CONTRIBUTE</p>

          <a
            href="https://github.com/ayushkashyap402/UIverse"
            target="_blank"
            rel="noreferrer"
            className="sidebar-item sidebar-item--link"
          >
            <span className="sidebar-item-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </span>
            GitHub Repo
          </a>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="comp-main">
          <div className="comp-header">
            <h1>Components</h1>
            <p>
              Production-ready UI components. Copy the code, drop it in, done.
            </p>
          </div>
          <section className="comp-section" id="ai-generator">
            <div className="comp-section-header">
              <h2>AI Component Generator</h2>
              <span className="comp-badge comp-badge--stable">AI</span>
            </div>

            <p className="comp-section-desc">
              Generate reusable React UI components using Gemini AI.
            </p>

            <div className="ai-generator-box">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Create a modern purple pricing card"
                className="ai-generator-input"
              />

              <button className="ai-generator-btn" onClick={generateComponent}>
                {loading ? "Generating..." : "Generate Component"}
              </button>
            </div>

            {generatedCode && (
              <div className="ai-preview-box">
                <div className="code-block">
                  <div className="code-block-header">
                    <span>Generated JSX</span>

                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(generatedCode)}
                    >
                      {copied ? (
                        <>
                          <CheckIcon /> Copied
                        </>
                      ) : (
                        <>
                          <CopyIcon /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <pre>{generatedCode}</pre>
                </div>
              </div>
            )}
          </section>
          {/* ================= BUTTONS ================= */}
          <section className="comp-section" id="buttons">
            <div className="comp-section-header">
              <h2>Button</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <p className="comp-section-desc">
              Versatile button component with variants and sizes.
            </p>

            <div className="comp-preview">
              <Button text="Primary" variant="primary" />
              <Button text="Secondary" variant="secondary" />
              <Button text="Danger" variant="danger" />
              <Button text="Disabled" variant="disabled" />
            </div>

            <div className="code-block">
              <div className="code-block-header">
                <span>JSX</span>

                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopy(`<Button text="Primary" variant="primary" />`)
                  }
                >
                  {copied ? (
                    <>
                      <CheckIcon /> Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon /> Copy
                    </>
                  )}
                </button>
              </div>

              <pre>{`<Button text="Primary" variant="primary" />`}</pre>
            </div>
          </section>

          {/* ================= BADGES ================= */}
          <section className="comp-section" id="badges">
            <div className="comp-section-header">
              <h2>Badge</h2>
              <span className="comp-badge comp-badge--stable">Stable</span>
            </div>

            <div className="comp-preview">
              <Badge text="Primary" variant="primary" />
              <Badge text="Success" variant="success" />
              <Badge text="Warning" variant="warning" />
              <Badge text="Danger" variant="danger" />
            </div>
          </section>

          {/* ================= ALL COMPONENTS ================= */}
          <section className="comp-section" id="all-components">
            <div className="comp-section-header">
              <h2>All Components</h2>
            </div>

            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>

                <tbody>
                  {componentsList.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <strong>{c.name}</strong>
                      </td>
                      <td>{c.category}</td>
                      <td>{c.status}</td>
                      <td>{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Components;
