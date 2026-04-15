# UIverse 🚀

A beginner-friendly, open-source React UI component library built with Vite.

## Tech Stack

- React 18 + Vite
- React Router v6
- Plain CSS (no Tailwind)

## Getting Started

```bash
cd uiverse
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
uiverse/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Route definitions
    ├── index.css             # Global styles
    ├── pages/
    │   ├── Home.jsx          # Landing page
    │   ├── Home.css
    │   ├── Components.jsx    # Component showcase
    │   └── Components.css
    ├── components/
    │   └── Button/
    │       ├── Button.jsx    # Reusable Button component
    │       └── Button.css
    └── data/
        └── componentsList.js # Component metadata registry
```

## Routes

| Path          | Page                  |
|---------------|-----------------------|
| `/`           | Home (landing page)   |
| `/components` | Component showcase    |

## Button Component

```jsx
<Button text="Click me" variant="primary" />
<Button text="Cancel"   variant="secondary" />
<Button text="Delete"   variant="danger" />
```

| Prop      | Type     | Default     | Description                          |
|-----------|----------|-------------|--------------------------------------|
| `text`    | string   | `"Button"`  | Label text                           |
| `variant` | string   | `"primary"` | `primary` / `secondary` / `danger`   |
| `onClick` | function | —           | Click handler                        |

## Contributing a New Component

1. Create `src/components/YourComponent/YourComponent.jsx` and `YourComponent.css`
2. Register it in `src/data/componentsList.js`
3. Add a showcase section in `src/pages/Components.jsx`
4. Open a PR 🎉

## License

MIT
