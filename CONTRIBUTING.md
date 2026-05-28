# Contributing to UIverse

Thank you for your interest in contributing to UIverse.

UIverse is a beginner-friendly React UI component library built to help developers learn, build, and contribute to open source through reusable UI components.

Whether you're fixing bugs, improving responsiveness, enhancing accessibility, or creating new components — every contribution is valuable.

---

# Table of Contents

1. Ways to Contribute
2. Getting Started
3. Project Structure
4. Adding a New Component
5. Bug Reports & Issues
6. Pull Request Process
7. Code Style Guidelines
8. Contribution Checklist
9. Getting Help
10. Code of Conduct

---

# Ways to Contribute

## Add New Components

- Create reusable React UI components
- Add responsive layouts
- Improve existing component designs
- Build beginner-friendly examples

## Improve Existing Features

- Fix UI bugs
- Improve responsiveness
- Enhance accessibility
- Improve dark mode support
- Refactor components for readability

## Documentation

- Improve README files
- Add setup instructions
- Improve comments and explanations
- Fix formatting and typos

## UI/UX Improvements

- Improve navigation
- Enhance contributor experience
- Add missing pages
- Improve consistency across the project

---

# Getting Started

## 1. Fork & Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/uiverse.git
cd uiverse
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

Open:
```bash
http://localhost:5173
```

# Project Structure

```bash
uiverse/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Alert/
│   │   ├── Badge/
│   │   ├── Button/
│   │   └── Navbar/
│   │
│   ├── data/
│   │   └── componentsList.js
│   │
│   ├── pages/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── CONTRIBUTING.md
├── README.md
├── package.json
└── vite.config.js
```

---

# Adding a New Component

UIverse follows a simple 3-step contribution process.

## Step 1 — Create Component Files

Create a folder inside:

```bash
src/components/
```

Example:

```bash
src/components/YourComponent/
├── YourComponent.jsx
└── YourComponent.css
```

### YourComponent.jsx

```jsx
import React from 'react'
import './YourComponent.css'

function YourComponent({ propName }) {
  return (
    <div className="uiverse-yourcomponent">
      {/* component code */}
    </div>
  )
}

export default YourComponent
```

### YourComponent.css

```css
.uiverse-yourcomponent {
  /* styles */
}
```

---

## Step 2 — Register the Component

Open:

```bash
src/data/componentsList.js
```

Add your component:

```js
{
  id: 7,
  name: 'YourComponent',
  category: 'Layout',
  status: 'Beta',
  description: 'Short description of the component.',
}
```

---

## Step 3 — Add Showcase Section

Open:

```bash
src/pages/Components.jsx
```

### Import Your Component

```jsx
import YourComponent from '../components/YourComponent/YourComponent'
```

### Add Sidebar Navigation Entry

```js
{ id: 'your-component', label: 'YourComponent' }
```

### Add Showcase Section

Use existing component sections like Button or Navbar as templates.

---

# Git Workflow

## Create a Branch

```bash
git checkout -b feat/add-component-name
```

## Make Changes & Commit

```bash
git add .
git commit -m "feat: add Card component"
```

## Push Changes

```bash
git push origin feat/add-component-name
```

Then create a Pull Request on GitHub.

---

# Pull Request Process

Before submitting a PR:

- Keep PRs clean and focused
- Test your changes locally
- Add screenshots for UI changes if needed
- Ensure there are no console errors
- Update documentation if necessary

## Example Commit Messages

```bash
feat: add Badge component
fix: resolve navbar mobile overflow
style: improve button spacing
docs: update setup instructions
```

---

# Bug Reports & Issues

When reporting bugs, include:

```md
## Bug Description
Describe the issue clearly

## Steps to Reproduce
1. Go to...
2. Click on...
3. Observe issue

## Expected Behavior
What should happen

## Screenshots
Add screenshots if possible

## Environment
- Browser:
- OS:
- Device:
```

---

# Code Style Guidelines

## React

- Use functional components
- Keep components reusable
- Write beginner-friendly code
- Add comments where necessary

## CSS

- Use meaningful class names
- Follow `uiverse-*` naming pattern
- Ensure responsiveness
- Avoid hardcoded colors where possible

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard accessibility
- Maintain proper color contrast

---

# Contribution Checklist

Before opening a PR, ensure:

- [ ] Component has `.jsx` and `.css` files
- [ ] Props are documented
- [ ] Component is registered in `componentsList.js`
- [ ] Showcase section is added
- [ ] Responsive design works properly
- [ ] No console errors
- [ ] Accessibility improvements are included
- [ ] Documentation is updated if needed

---

# Getting Help

Need help? You can:

- Open a GitHub Issue
- Ask questions in Discussions
- Reach out through project discussions

---

# Code of Conduct

Please be respectful and welcoming to everyone.

- Be kind and constructive
- Help beginners
- Avoid spam PRs
- Respect all contributors

---

# License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

# Thank You

Thank you for contributing to UIverse and supporting open source.