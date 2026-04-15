<div align="center">

<img src="https://img.shields.io/badge/UIverse-Open%20Source-4f46e5?style=for-the-badge&logo=react&logoColor=white" alt="UIverse" />

# ⬡ UIverse

### A beginner-friendly, open-source React UI component library

**Built for learners. Designed for contributors. Ready for GSSoC.**

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React%20Router-6-ca4245?style=flat-square&logo=reactrouter)](https://reactrouter.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)

</div>

---

## 📌 What is UIverse?

UIverse is a **clean, minimal React component library** built from scratch — no Tailwind, no heavy UI frameworks, just pure React + CSS.

The goal is simple:

> **Make it easy for beginners to learn React by building and contributing real UI components.**

Every component is:
- 📖 Fully commented for learning
- 🧩 Reusable and prop-driven
- 🎨 Styled with plain, readable CSS
- ⚡ Instantly usable — drop it in and it works

---

## 🎯 Project Goals

| Goal | Description |
|------|-------------|
| 🧑‍💻 Beginner Friendly | Every file has comments explaining what and why |
| 🤝 Contributor Ready | Clear folder structure, easy to add new components |
| 🏆 GSSoC Ready | Structured for open-source programs like GSSoC |
| 📦 Zero Extra Deps | Only React + React Router. No bloat |
| 🎨 Plain CSS | No Tailwind — so contributors learn real CSS |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) `v18+`
- [Git](https://git-scm.com/)
- A code editor — [VS Code](https://code.visualstudio.com/) recommended

### 1. Fork the repository

Click the **Fork** button at the top right of this page to create your own copy.

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/uiverse.git
cd uiverse
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. You're good to go! 🎉

---

## 📁 Project Structure

```
uiverse/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json
│
└── src/
    ├── main.jsx                # App entry — sets up BrowserRouter
    ├── App.jsx                 # Route definitions
    ├── index.css               # Global base styles
    │
    ├── components/             # ✅ All reusable UI components live here
    │   ├── Button/
    │   │   ├── Button.jsx      # Component logic + props
    │   │   └── Button.css      # Component styles
    │   └── Navbar/
    │       ├── Navbar.jsx
    │       └── Navbar.css
    │
    ├── pages/                  # Route-level page components
    │   ├── Home.jsx            # Landing page  →  route: "/"
    │   ├── Home.css
    │   ├── Components.jsx      # Showcase page →  route: "/components"
    │   └── Components.css
    │
    └── data/
        └── componentsList.js   # 📋 Registry of all components (metadata)
```

> **Rule of thumb:** Each component gets its own folder inside `src/components/`. One `.jsx` file + one `.css` file. That's it.

---

## 🧩 Available Components

| Component | Category | Status | Description |
|-----------|----------|--------|-------------|
| `Button` | Inputs | ✅ Stable | Primary, Secondary, Danger variants + sm/md/lg sizes |
| `Navbar` | Navigation | ✅ Stable | Sticky navbar with active link highlighting |
| `Input` | Inputs | 🔜 Planned | Text input with label and validation |
| `Card` | Layout | 🔜 Planned | Content card with header/body/footer slots |
| `Modal` | Overlay | 🔜 Planned | Accessible dialog with backdrop |
| `Badge` | Display | 🔜 Planned | Status indicator with color variants |

---

## 🛠️ How to Add a New Component

This is the most important section if you want to contribute. Follow these 3 steps:

### Step 1 — Create the component files

Create a new folder inside `src/components/` with your component name:

```
src/components/YourComponent/
├── YourComponent.jsx
└── YourComponent.css
```

**YourComponent.jsx** — minimal template:

```jsx
// YourComponent.jsx
// Props:
//   propName (type) – description

import React from 'react'
import './YourComponent.css'

function YourComponent({ propName }) {
  return (
    <div className="your-component">
      {/* your JSX here */}
    </div>
  )
}

export default YourComponent
```

**YourComponent.css** — minimal template:

```css
/* YourComponent.css */

.your-component {
  /* your styles here */
}
```

---

### Step 2 — Register it in `componentsList.js`

Open `src/data/componentsList.js` and add your component to the array:

```js
{
  id: 7,                          // next available id
  name: 'YourComponent',
  category: 'Layout',             // Inputs | Layout | Overlay | Display | Navigation
  status: 'Beta',                 // Stable | Beta | Planned
  description: 'One line about what this component does.',
},
```

---

### Step 3 — Add a showcase section in `Components.jsx`

Open `src/pages/Components.jsx` and:

1. Import your component at the top:
```jsx
import YourComponent from '../components/YourComponent/YourComponent.jsx'
```

2. Add it to the `sections` array (for sidebar navigation):
```js
{ id: 'your-component', label: '🆕 YourComponent' },
```

3. Add a `<section>` block in the JSX (copy the Button section as a template).

---

That's it. Open a PR and you're a UIverse contributor! 🎉

---

## 🌿 Git Workflow

```bash
# 1. Create a new branch for your feature
git checkout -b feat/add-card-component

# 2. Make your changes

# 3. Stage and commit
git add .
git commit -m "feat: add Card component with header/body/footer slots"

# 4. Push to your fork
git push origin feat/add-card-component

# 5. Open a Pull Request on GitHub
```

### Commit Message Format

We follow a simple convention:

| Prefix | When to use |
|--------|-------------|
| `feat:` | Adding a new component or feature |
| `fix:` | Fixing a bug |
| `style:` | CSS/UI changes only |
| `docs:` | README or comment updates |
| `refactor:` | Code cleanup, no behavior change |
| `chore:` | Config, deps, tooling |

**Examples:**
```
feat: add Badge component with color variants
fix: button hover state not working on Safari
style: improve Card component spacing
docs: update contributing steps in README
```

---

## ✅ Contribution Checklist

Before opening a PR, make sure:

- [ ] Component is inside its own folder in `src/components/`
- [ ] Component has a `.jsx` and a `.css` file
- [ ] Props are documented in comments at the top of the `.jsx` file
- [ ] Component is registered in `src/data/componentsList.js`
- [ ] A showcase section is added in `src/pages/Components.jsx`
- [ ] Code runs without errors (`npm run dev`)
- [ ] CSS class names follow the pattern: `uiverse-<componentname>`
- [ ] No external libraries added without discussion

---

## 💡 Component Ideas (Good First Issues)

Looking for something to build? Here are some ideas:

| Component | Difficulty | Notes |
|-----------|------------|-------|
| `Input` | 🟢 Easy | Text input with label + placeholder props |
| `Badge` | 🟢 Easy | Colored pill badge, similar to Button variants |
| `Card` | 🟡 Medium | Header, body, footer slots via props/children |
| `Alert` | 🟡 Medium | Info, success, warning, error variants |
| `Modal` | 🔴 Hard | Needs portal, backdrop, keyboard close (Esc) |
| `Tooltip` | 🔴 Hard | Hover-triggered, position-aware |
| `Toggle` | 🟡 Medium | On/off switch with controlled state |
| `Avatar` | 🟢 Easy | Image or initials fallback, size variants |

---

## 🏗️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 18 | UI rendering |
| [Vite](https://vitejs.dev) | 5 | Dev server + bundler |
| [React Router](https://reactrouter.com) | 6 | Client-side routing |
| Plain CSS | — | Component styling |

---

## 📜 Scripts

```bash
npm run dev       # Start development server at localhost:5173
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
```

---

## 🤝 Code of Conduct

- Be respectful and welcoming to all contributors
- Give constructive feedback on PRs
- Help beginners — everyone starts somewhere
- No spam PRs (e.g. only whitespace changes)

---

## 📄 License

This project is licensed under the **MIT License** — you're free to use, modify, and distribute it.

---

<div align="center">

**Made with ❤️ for the open-source community**

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
