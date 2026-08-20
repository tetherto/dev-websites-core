import { codeBlock } from './code.js'
import { codeTabsBlock } from './code-tabs.js'
import { downloadCtaBlock } from './download-cta.js'
import { imageBlock } from './image.js'
import { richTextBlock } from './rich-text.js'
import { stepsBlock } from './steps.js'
import { videoBlock } from './video.js'

import type { Block } from 'payload'

export const leafBlocks: Block[] = [
  richTextBlock,
  codeBlock,
  codeTabsBlock,
  imageBlock,
  videoBlock,
  downloadCtaBlock,
  stepsBlock,
]
