import type { Block } from 'payload'

export const stepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Steps List', plural: 'Steps Lists' },
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
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional avatar or icon shown next to the step' },
        },
      ],
    },
  ],
}
