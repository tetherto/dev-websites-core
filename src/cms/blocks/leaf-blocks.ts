import { codeBlock } from './code.js'
import { codeTabsBlock } from './code-tabs.js'
import { imageBlock } from './image.js'
import { richTextBlock } from './rich-text.js'
import { stepsBlock } from './steps.js'

import type { Block } from 'payload'

export const leafBlocks: Block[] = [richTextBlock, codeBlock, codeTabsBlock, imageBlock, stepsBlock]
