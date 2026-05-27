import React from 'react'
import Button from '../components/Button/Button.jsx'
import Badge from '../components/Badge/Badge.jsx'
import Alert from '../components/Alert/Alert.jsx'

// componentsList.js – Metadata registry for all UIverse components
export const componentsList = [
  {
    id: 1,
    name: 'Button',
    category: 'Inputs',
    status: 'Stable',
    description: 'Reusable button with primary, secondary, and danger variants.',
    preview: (
      <>
        <Button text="Primary" variant="primary" />
        <Button text="Secondary" variant="secondary" />
        <Button text="Danger" variant="danger" />
        <Button text="Disabled" variant="disabled" />
      </>
    ),
    code: `<Button text="Primary" variant="primary" />`
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
    status: 'Stable',
    description: 'Small status indicator badge with color variants.',
    preview: (
      <>
        <Badge text="Primary" variant="primary" />
        <Badge text="Success" variant="success" />
        <Badge text="Warning" variant="warning" />
        <Badge text="Danger" variant="danger" />
      </>
    ),
    code: `<Badge text="Primary" variant="primary" />`
  },
  {
    id: 6,
    name: 'Navbar',
    category: 'Navigation',
    status: 'Planned',
    description: 'Responsive top navigation bar with logo and links.',
  },
  {
    id: 7,
    name: 'Alert',
    category: 'Feedback',
    status: 'Stable',
    description: 'Reusable alert component for success, error, warning, and informational messages.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <Alert type="success" message="Action completed successfully!" />
        <Alert type="error" message="Something went wrong." />
        <Alert type="warning" message="Warning message here." />
        <Alert type="info" message="Information message." />
        <Alert type="info" message="Closable alert example." closable />
      </div>
    ),
    code: `<Alert type="success" message="Action completed successfully!" />
<Alert type="error" message="Something went wrong." />
<Alert type="warning" message="Warning message here." />
<Alert type="info" message="Information message." />
<Alert type="info" message="Closable alert example." closable />`
  },
]