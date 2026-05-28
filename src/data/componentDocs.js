// Configuration data for component showcase sections
// Each object represents a reusable documentation section

export const componentDocs = [
  {
    id: 'buttons',
    title: 'Button',
    component: 'Button',

    status: 'Stable',

    description:
      'Versatile button component with variants and sizes.',

    variants: [
      {
        text: 'Primary',
        variant: 'primary',
      },
      {
        text: 'Secondary',
        variant: 'secondary',
      },
      {
        text: 'Danger',
        variant: 'danger',
      },
      {
        text: 'Disabled',
        variant: 'disabled',
      },
    ],

    code: `<Button text="Primary" variant="primary" />`,
  },

  {
    id: 'badges',
    title: 'Badge',
    component: 'Badge',

    status: 'Stable',

    description:
      'Small status indicator badge with color variants.',

    variants: [
      {
        text: 'Primary',
        variant: 'primary',
      },
      {
        text: 'Success',
        variant: 'success',
      },
      {
        text: 'Warning',
        variant: 'warning',
      },
      {
        text: 'Danger',
        variant: 'danger',
      },
    ],

    code: `<Badge text="Primary" variant="primary" />`,
  },
  {
  id: 'alerts',

  title: 'Alert',

  component: 'Alert',

  status: 'Stable',

  description:
    'Reusable alert component with multiple variants for success, error, warning, and informational messages.',

  subsectionTitle: 'Variants',

  variants: [
    {
      type: 'success',
      message: 'Action completed successfully!',
    },

    {
      type: 'error',
      message: 'Something went wrong.',
    },

    {
      type: 'warning',
      message: 'Warning message here.',
    },

    {
      type: 'info',
      message: 'Information message.',
    },

    {
      type: 'info',
      message: 'Closable alert example.',
      closable: true,
    },
  ],

  code: `<Alert type="success" message="Action completed successfully!" />
<Alert type="error" message="Something went wrong." />
<Alert type="warning" message="Warning message here." />
<Alert type="info" message="Information message." />
<Alert type="info" message="Closable alert example." closable />`,

  propsTable: [
    {
      name: 'type',
      type: 'string',
      defaultValue: '"info"',
      description: 'success · error · warning · info',
    },

    {
      name: 'message',
      type: 'string',
      defaultValue: '"This is an alert"',
      description: 'Alert message text',
    },

    {
      name: 'closable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows close button',
    },
  ],
}
]