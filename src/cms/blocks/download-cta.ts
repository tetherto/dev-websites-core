import type { Block } from 'payload'

export const downloadCtaBlock: Block = {
  slug: 'download-cta',
  labels: { singular: 'Download CTA', plural: 'Download CTAs' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'headingAccent',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'submitLabel',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'downloadUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'downloadLabel',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'successMessage',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'consent',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'footnote',
      type: 'textarea',
      localized: true,
    },
  ],
}
