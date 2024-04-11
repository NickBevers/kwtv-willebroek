import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  fields: [
    {
      name: 'slides',
      label: 'Slides',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
        },
      ],
    },
    invertBackground,
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'showArrows',
      label: 'Show Arrows',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showDots',
      label: 'Show Dots',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'autoplay',
      label: 'Autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'autoplaySpeed',
      label: 'Autoplay Speed',
      type: 'number',
      defaultValue: 3000,
    },
    {
      name: 'pauseOnHover',
      label: 'Pause On Hover',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'height',
      label: 'Height (in px)',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
