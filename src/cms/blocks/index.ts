import { accordionBlock } from './accordion.js'
import { codeBlock } from './code.js'
import { codeTabsBlock } from './code-tabs.js'
import { imageBlock } from './image.js'
import { richTextBlock } from './rich-text.js'
import { stepsBlock } from './steps.js'

import type { Block } from 'payload'

export { richTextBlock } from './rich-text.js'
export { codeBlock } from './code.js'
export { codeTabsBlock } from './code-tabs.js'
export { imageBlock } from './image.js'
export { stepsBlock } from './steps.js'
export { accordionBlock } from './accordion.js'
export { leafBlocks } from './leaf-blocks.js'
export { languageOptions, codeBlockLanguages, defaultCodeLanguage } from './language-options.js'

export const blogContentBlocks: Block[] = [
  richTextBlock,
  codeBlock,
  codeTabsBlock,
  imageBlock,
  stepsBlock,
  accordionBlock,
]

export const pageContentBlocks: Block[] = [
  richTextBlock,
  codeBlock,
  codeTabsBlock,
  imageBlock,
  stepsBlock,
  accordionBlock,
]
