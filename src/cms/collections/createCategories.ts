import { slugify } from '../hooks/slugify.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

export function createCategories(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'categories',
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'slug'],
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
        admin: { position: 'sidebar' },
        hooks: { beforeValidate: [slugify] },
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
      },
    ],
  }
}
