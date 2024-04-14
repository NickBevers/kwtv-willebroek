import type { Block } from 'payload/types'

export const ButtonBlock: Block = {
  slug: 'button',
  labels: {
    singular: 'Button',
    plural: 'Buttons',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'URL',
      required: false,
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in New Tab',
      required: true,
    },
    {
      name: 'appearance',
      type: 'select',
      label: 'Appearance',
      defaultValue: 'primary',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Position',
      required: false,
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'invert',
      type: 'checkbox',
      label: 'Invert',
      required: false,
    },
  ],
}
