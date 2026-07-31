import { slugify } from '../hooks/slugify.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

/** Stock changelog-tags (no site revalidation — add via overrides.hooks). */
export function createChangelogTags(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'changelog-tags',
    defaultSort: 'order',
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'slug', 'order'],
      description: 'Tags shown on changelog entries.',
    },
    access: {
      read: access.publicRead,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
    },
    fields: [
      {
        name: 'name',
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
          description: 'URL-friendly identifier used by listing filters.',
        },
        hooks: { beforeValidate: [slugify] },
      },
      {
        name: 'order',
        type: 'number',
        defaultValue: 0,
        admin: {
          position: 'sidebar',
          description: 'Display order in admin lists (ascending). Ties broken by name.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
        admin: { description: 'Optional context shown to editors. Not rendered publicly yet.' },
      },
    ],
  }
}
