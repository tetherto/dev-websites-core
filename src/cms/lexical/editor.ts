import {
  BlocksFeature,
  CodeBlock,
  EXPERIMENTAL_TableFeature,
  UploadFeature,
  editorConfigFactory,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { codeBlockLanguages, defaultCodeLanguage } from '../blocks/language-options.js'
import { videoBlock } from '../blocks/video.js'

import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'
import type { SanitizedConfig } from 'payload'

const richTextFeatures = ({
  defaultFeatures,
}: {
  defaultFeatures: FeatureProviderServer[]
  rootFeatures: FeatureProviderServer[]
}) => [
  ...defaultFeatures.filter((feature) => feature.key !== 'upload'),
  UploadFeature({
    collections: {
      media: {
        fields: [
          {
            name: 'caption',
            type: 'text',
          },
        ],
      },
    },
  }),
  BlocksFeature({
    blocks: [
      CodeBlock({
        languages: codeBlockLanguages,
        defaultLanguage: defaultCodeLanguage,
      }),
      videoBlock,
    ],
  }),
  EXPERIMENTAL_TableFeature(),
]

/**
 * Shared Lexical editor for every `richText` field.
 *
 * Adds `CodeBlock`, inline `video` block, media upload captions, and
 * `EXPERIMENTAL_TableFeature` on top of Payload defaults.
 */
// Return type is derived from `lexicalEditor` (a public export) rather than the
// inferred `LexicalRichTextAdapterProvider` (not re-exported), so the generated
// declaration stays portable while keeping the narrow Lexical adapter type that
// consumers like `editorConfigFactory.fromEditor` require.
export const richTextEditor = (): ReturnType<typeof lexicalEditor> =>
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
