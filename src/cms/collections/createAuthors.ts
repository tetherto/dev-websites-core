import { slugify } from '../hooks/slugify.js'
import { seoFields } from '../shared/seo-fields.js'

import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

export function createAuthors(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'authors',
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'slug', 'role'],
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
        name: 'avatar',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'role',
        type: 'text',
        localized: true,
        admin: {
          description: 'Job title or role (e.g. "Lead Engineer")',
        },
      },
      {
        name: 'bio',
        type: 'textarea',
        localized: true,
      },
      {
        name: 'social',
        type: 'group',
        label: 'Social Profiles',
        admin: { position: 'sidebar' },
        fields: [
          { name: 'website', type: 'text' },
          { name: 'twitter', type: 'text', admin: { description: '@handle or full URL' } },
          { name: 'linkedin', type: 'text' },
          { name: 'github', type: 'text' },
        ],
      },
      {
        ...seoFields,
        fields: [
          ...seoFields.fields,
          {
            name: 'jsonLd',
            type: 'group',
            label: 'Structured Data Overrides',
            admin: {
              description: 'Used in JSON-LD Person schema on author pages and article bylines.',
            },
            fields: [
              {
                name: 'jobTitle',
                type: 'text',
                admin: { description: 'schema.org jobTitle (defaults to role if empty)' },
              },
              {
                name: 'worksFor',
                type: 'text',
                admin: { description: 'Organization name for schema.org worksFor' },
              },
              {
                name: 'sameAs',
                type: 'array',
                admin: {
                  description: 'Extra canonical URLs for this person (Wikipedia, Crunchbase, etc.)',
                },
                fields: [{ name: 'url', type: 'text', required: true }],
              },
            ],
          },
        ],
      },
    ],
  }
}
