import { richTextEditor } from '../lexical/editor.js'

import type { Block } from 'payload'

export const richTextBlock: Block = {
  slug: 'rich-text',
  labels: { singular: 'Rich Text', plural: 'Rich Text Blocks' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: richTextEditor(),
    },
  ],
}
