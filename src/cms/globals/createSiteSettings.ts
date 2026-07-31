import type { AccessHelpers } from '../shared/access.js'
import type { GlobalConfig } from 'payload'

export function createSiteSettings(access: AccessHelpers): GlobalConfig {
  return {
    slug: 'site-settings',
    label: 'Site Settings',
    access: {
      read: access.publicRead,
      update: access.adminOnly,
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        localized: true,
        admin: {
          description: 'Public site name used in titles and structured data.',
        },
      },
      {
        name: 'defaultDescription',
        type: 'textarea',
        required: true,
        localized: true,
        admin: {
          description: 'Fallback meta description when a page does not define its own.',
        },
      },
      {
        name: 'defaultOgImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          description: 'Default Open Graph image (1200×630 recommended).',
        },
      },
      {
        name: 'organization',
        type: 'group',
        label: 'Organization',
        fields: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'legalName',
            type: 'text',
          },
          {
            name: 'description',
            type: 'textarea',
            localized: true,
          },
          {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
          },
          {
            name: 'foundingDate',
            type: 'text',
            admin: { description: 'Year or ISO date for schema.org structured data.' },
          },
        ],
      },
      {
        name: 'social',
        type: 'group',
        label: 'Social Profiles',
        fields: [
          { name: 'twitter', type: 'text' },
          { name: 'github', type: 'text' },
          { name: 'linkedin', type: 'text' },
        ],
      },
    ],
  }
}
