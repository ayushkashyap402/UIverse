# Contributing to UIverse

Thanks for your interest in contributing! UIverse is built for learners, so
this guide is intentionally detailed — don't worry if you're new to React or
open source.

## 🚀 Getting started

### Prerequisites

- Node.js v18+
- Git
- A code editor (VS Code recommended)

### Setup

```bash
# 1. Fork the repository (click "Fork" top-right on GitHub)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/uiverse.git
cd uiverse

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` — you're ready to go.

## 🧩 How to add a new component

1. **Create the component folder** inside `src/components/`:

   ```bash
   src/components/YourComponent/
   ├── YourComponent.jsx
   └── YourComponent.css
   ```

2. **Register it** in `src/data/componentsList.js`:

   ```js
   {
     id: 7,
     name: 'YourComponent',
     category: 'Layout',       // Inputs | Layout | Overlay | Display | Navigation
     status: 'Beta',           // Stable | Beta | Planned
     description: 'One line about what this component does.',
   },
   ```

3. **Add a showcase section** in `src/pages/Components.jsx`:
   - Import your component
   - Add an entry to the `sections` array
   - Add a `<section>` block (copy the Button section as a template)

See the README's "How to Add a New Component" section for full code templates.

## 🌿 Git workflow

```bash
git checkout -b feat/add-card-component
# ...make your changes...
git add .
git commit -m "feat: add Card component with header/body/footer slots"
git push origin feat/add-card-component
# Open a Pull Request on GitHub
```

### Commit message prefixes

| Prefix      | When to use                       |
| ----------- | --------------------------------- |
| `feat:`     | Adding a new component or feature |
| `fix:`      | Fixing a bug                      |
| `style:`    | CSS/UI changes only               |
| `docs:`     | README or comment updates         |
| `refactor:` | Code cleanup, no behavior change  |
| `chore:`    | Config, deps, tooling             |

## 🙋 Claiming an issue

Browse open issues, especially ones tagged `good first issue`. Comment
`/claim` (or `/assign`) on the issue to self-assign it. If it's already
assigned, the bot will let you know — pick another one. Comment `/unassign`
if you can no longer work on it.

## ✅ Before opening a PR

- [ ] Component is in its own folder in `src/components/`
- [ ] Has a `.jsx` and a `.css` file
- [ ] Props documented in comments at the top of the `.jsx`
- [ ] Registered in `src/data/componentsList.js`
- [ ] Showcase section added in `src/pages/Components.jsx`
- [ ] `npm run dev` runs without errors
- [ ] CSS classes follow `uiverse-<componentname>`
- [ ] No new external libraries without prior discussion in an issue

## 💡 Looking for ideas?

Check the **Component Ideas (Good First Issues)** table in the README —
Input, Badge, Card, Alert, Modal, Tooltip, Toggle, and Avatar are all up
for grabs.

## 🤝 Code of conduct

Please read our Code of Conduct before participating. In short: be
respectful, give constructive feedback, help beginners, and avoid
spam/low-effort PRs.

## 🏆 GSSoC contributors

This project participates in GSSoC. Merged PRs labeled `gssoc:approved` earn
points based on difficulty, quality, and contribution type — see the labels
applied to your PR by our triage bot for the breakdown.

Happy contributing!
