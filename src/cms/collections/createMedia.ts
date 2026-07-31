import { draftsWithAutosave } from '../shared/drafts-with-autosave.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

/** Stock media upload collection (drafts + published read). */
export function createMedia(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'media',
    admin: {
      useAsTitle: 'filename',
      defaultColumns: ['filename', 'alt', '_status', 'updatedAt'],
    },
    access: {
      read: access.adminOrPublished,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
    },
    versions: draftsWithAutosave,
    upload: {
      imageSizes: [
        {
          name: 'thumbnail',
          width: 400,
          height: 300,
          position: 'centre',
        },
        {
          name: 'card',
          width: 768,
          height: 512,
          position: 'centre',
        },
        {
          name: 'tablet',
          width: 1024,
          height: undefined,
          position: 'centre',
        },
      ],
      adminThumbnail: 'thumbnail',
      mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    },
    fields: [
      {
        name: 'alt',
        type: 'text',
        required: true,
        localized: true,
      },
    ],
  }
}
