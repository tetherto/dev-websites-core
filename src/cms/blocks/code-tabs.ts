import { languageOptions } from './language-options.js'

import type { Block } from 'payload'

export const codeTabsBlock: Block = {
  slug: 'code-tabs',
  labels: { singular: 'Code Tabs', plural: 'Code Tabs' },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Tab label (e.g. Windows, Linux, Android)' },
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'bash',
          options: languageOptions,
        },
        {
          name: 'code',
          type: 'code',
          required: true,
          admin: { language: 'bash' },
        },
      ],
    },
  ],
}
