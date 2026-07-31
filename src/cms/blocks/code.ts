import { languageOptions } from './language-options.js'

import type { Block } from 'payload'

export const codeBlock: Block = {
  slug: 'code',
  labels: { singular: 'Code Block', plural: 'Code Blocks' },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: languageOptions,
    },
    {
      name: 'filename',
      type: 'text',
      admin: { description: 'Optional filename label shown above the block' },
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: { language: 'typescript' },
    },
  ],
}
