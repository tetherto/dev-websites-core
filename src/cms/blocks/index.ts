import { accordionBlock } from './accordion.js'
import { codeBlock } from './code.js'
import { codeTabsBlock } from './code-tabs.js'
import { downloadCtaBlock } from './download-cta.js'
import { imageBlock } from './image.js'
import { richTextBlock } from './rich-text.js'
import { sectionHeadingBlock } from './section-heading.js'
import { stepsBlock } from './steps.js'
import { videoBlock } from './video.js'

import type { Block } from 'payload'

export { richTextBlock } from './rich-text.js'
export { codeBlock } from './code.js'
export { codeTabsBlock } from './code-tabs.js'
export { imageBlock } from './image.js'
export { videoBlock } from './video.js'
export { downloadCtaBlock } from './download-cta.js'
export { stepsBlock } from './steps.js'
export { accordionBlock } from './accordion.js'
export { sectionHeadingBlock } from './section-heading.js'
export { leafBlocks } from './leaf-blocks.js'
export { languageOptions, codeBlockLanguages, defaultCodeLanguage } from './language-options.js'

export const blogContentBlocks: Block[] = [
  richTextBlock,
  codeBlock,
  codeTabsBlock,
  imageBlock,
  videoBlock,
  downloadCtaBlock,
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

export const showcaseContentBlocks: Block[] = [
  sectionHeadingBlock,
  richTextBlock,
  codeBlock,
  imageBlock,
]
