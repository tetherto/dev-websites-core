import {
  BlocksFeature,
  CodeBlock,
  EXPERIMENTAL_TableFeature,
  editorConfigFactory,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'

import { codeBlockLanguages, defaultCodeLanguage } from '../blocks/language-options.js'
import type { SanitizedConfig } from 'payload'

const richTextFeatures = ({
  defaultFeatures,
}: {
  defaultFeatures: FeatureProviderServer[]
  rootFeatures: FeatureProviderServer[]
}) => [
  ...defaultFeatures,
  BlocksFeature({
    blocks: [
      CodeBlock({
        languages: codeBlockLanguages,
        defaultLanguage: defaultCodeLanguage,
      }),
    ],
  }),
  EXPERIMENTAL_TableFeature(),
]

/**
 * Shared Lexical editor for every `richText` field.
 *
 * Adds `CodeBlock` and `EXPERIMENTAL_TableFeature` on top of Payload defaults.
 */
export const richTextEditor = () =>
  lexicalEditor({
    features: richTextFeatures,
  })

/** Resolve Lexical editor config for seed scripts / markdown conversion. */
export async function getRichTextEditorConfig(config: SanitizedConfig) {
  return editorConfigFactory.fromFeatures({
    config,
    features: richTextFeatures,
  })
}
