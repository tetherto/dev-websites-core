import type { Block } from 'payload'

export const sectionHeadingBlock: Block = {
  slug: 'section-heading',
  labels: { singular: 'Section Heading', plural: 'Section Headings' },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
