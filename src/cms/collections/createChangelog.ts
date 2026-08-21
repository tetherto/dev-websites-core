import { slugify } from '../hooks/slugify.js'
import { draftsWithAutosave } from '../shared/drafts-with-autosave.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

/**
 * Stock changelog collection (shared fields only).
 * Site-specific body / GitHub / related-block fields — add via `overrides.fields`.
 * Revalidation — add via `overrides.hooks`.
 */
export function createChangelog(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'changelog',
    labels: { singular: 'Changelog', plural: 'Changelog' },
    defaultSort: '-releaseDate',
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'version', 'versionType', 'tags', 'releaseDate', '_status'],
    },
    access: {
      read: access.adminOrPublished,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
    },
    versions: draftsWithAutosave,
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        localized: true,
        admin: {
          description:
            'Release headline shown on the changelog detail page (e.g. "Added Solana Support").',
        },
      },
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          position: 'sidebar',
          description: 'URL-friendly identifier. Not localized — one slug per entry.',
        },
        hooks: { beforeValidate: [slugify] },
      },
      {
        name: 'version',
        type: 'text',
        admin: {
          position: 'sidebar',
          description:
            'Optional semantic version label shown in the badge, e.g. v1.1.0 or 2.3.0. Omit for non-versioned announcements.',
        },
      },
      {
        name: 'versionType',
        type: 'select',
        options: [
          { label: 'Major', value: 'major' },
          { label: 'Minor', value: 'minor' },
          { label: 'Patch', value: 'patch' },
        ],
        admin: {
          position: 'sidebar',
          description:
            'Release line for badge styling (major / minor / patch). Editors set this explicitly.',
        },
      },
      {
        name: 'releaseDate',
        type: 'date',
        required: true,
        admin: {
          position: 'sidebar',
          date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM d, yyyy' },
        },
      },
      {
        name: 'tags',
        type: 'relationship',
        relationTo: 'changelog-tags',
        hasMany: true,
        label: 'Tags',
        admin: {
          position: 'sidebar',
          description: 'Editor-managed tags from the Changelog Tags collection.',
        },
      },
      {
        name: 'heroImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Large visual above the article body on the changelog detail page.',
        },
      },
      {
        name: 'summary',
        type: 'textarea',
        localized: true,
        admin: {
          description: 'Short excerpt for listing cards and previews.',
        },
      },
    ],
  }
}
