import { pageContentBlocks } from '../blocks/index.js'
import { setPublishedAt } from '../hooks/set-published-at.js'
import { slugify } from '../hooks/slugify.js'
import { draftsWithAutosave } from '../shared/drafts-with-autosave.js'
import { seoFields } from '../shared/seo-fields.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

function createContentPageCollection(
  access: AccessHelpers,
  slug: 'pages' | 'legal-pages'
): CollectionConfig {
  return {
    slug,
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'slug', 'publishedAt', '_status'],
    },
    access: {
      read: access.adminOrPublished,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
    },
    versions: draftsWithAutosave,
    hooks: {
      beforeChange: [setPublishedAt],
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          position: 'sidebar',
          description: 'URL-friendly identifier. Not localized — one slug per page.',
        },
        hooks: { beforeValidate: [slugify] },
      },
      {
        name: 'content',
        type: 'blocks',
        localized: true,
        blocks: pageContentBlocks,
      },
      {
        name: 'publishedAt',
        type: 'date',
        admin: {
          position: 'sidebar',
          date: { pickerAppearance: 'dayAndTime' },
          description: 'Auto-filled on first publish if left empty.',
        },
      },
      seoFields,
    ],
  }
}

export function createPages(access: AccessHelpers): CollectionConfig {
  return createContentPageCollection(access, 'pages')
}

export function createLegalPages(access: AccessHelpers): CollectionConfig {
  return createContentPageCollection(access, 'legal-pages')
}
