// componentsList.js – Metadata registry for all UIverse components
//
// Each entry describes one component available in the library.
// This data is used by the Components page to render the overview table.
//
// To register a new component:
//   1. Add a new object to the array below
//   2. Fill in: id, name, category, status, description
//   3. Status options: "Stable" | "Beta" | "Planned"

export const componentsList = [
  {
    id: 1,
    name: 'Button',
    category: 'Inputs',
    status: 'Stable',
    description: 'Reusable button with primary, secondary, and danger variants.',
  },
  {
    id: 2,
    name: 'Input',
    category: 'Inputs',
    status: 'Planned',
    description: 'Text input field with label and validation support.',
  },
  {
    id: 3,
    name: 'Card',
    category: 'Layout',
    status: 'Planned',
    description: 'Content card with optional header, body, and footer slots.',
  },
  {
    id: 4,
    name: 'Modal',
    category: 'Overlay',
    status: 'Planned',
    description: 'Accessible dialog modal with backdrop and close controls.',
  },
  {
    id: 5,
    name: 'Badge',
    category: 'Display',
    status: 'Planned',
    description: 'Small status indicator badge with color variants.',
  },
  {
    id: 6,
    name: 'Navbar',
    category: 'Navigation',
    status: 'Planned',
    description: 'Responsive top navigation bar with logo and links.',
  },
]
