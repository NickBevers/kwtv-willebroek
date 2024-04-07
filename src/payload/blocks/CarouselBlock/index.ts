import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  fields: [
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
        },
        {
          name: 'captionPosition',
          type: 'select',
          options: [
            {
              label: 'Top Left',
              value: 'top-left',
            },
            {
              label: 'Top Right',
              value: 'top-right',
            },
            {
              label: 'Bottom Left',
              value: 'bottom-left',
            },
            {
              label: 'Bottom Right',
              value: 'bottom-right',
            },
          ],
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
      name: 'infinite',
      label: 'Infinite',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'slidesToShow',
      label: 'Slides To Show',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'slidesToScroll',
      label: 'Slides To Scroll',
      type: 'number',
      defaultValue: 1,
    },
  ],
}
