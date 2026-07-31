import { leafBlocks } from './leaf-blocks.js'

import type { Block } from 'payload'

export const accordionBlock: Block = {
  slug: 'accordion',
  labels: { singular: 'Accordion', plural: 'Accordions' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: leafBlocks,
          localized: true,
        },
      ],
    },
  ],
}
