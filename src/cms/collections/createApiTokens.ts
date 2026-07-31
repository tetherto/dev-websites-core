import type { AccessHelpers } from '../shared/access.js'
import type { Access, CollectionConfig } from 'payload'

const adminOrSelf: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true
  if (req.user?.collection === 'api-tokens') return { id: { equals: req.user.id } }
  return false
}

/**
 * Stock API-key auth collection for server-to-server Payload REST/GraphQL clients.
 * Disable per site with `overrides['api-tokens'] = false`.
 */
export function createApiTokens(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'api-tokens',
    labels: {
      singular: 'API Token',
      plural: 'API Tokens',
    },
    admin: {
      useAsTitle: 'name',
      defaultColumns: ['name', 'description', 'enabled', 'createdAt'],
      description:
        'Server-to-server tokens for non-admin clients calling the Payload REST/GraphQL API. ' +
        'Each token authenticates as an api-tokens user and is restricted to published, public-readable content.',
    },
    auth: {
      useAPIKey: true,
      disableLocalStrategy: true,
    },
    access: {
      read: adminOrSelf,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
      admin: access.adminOnly,
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
        admin: {
          description: 'Human-readable label, e.g. "mobile-app-prod" or "partner-foo".',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        admin: {
          description: 'Who is this token for and what is it used for? Free-form notes.',
        },
      },
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          position: 'sidebar',
          description:
            'Disable to soft-revoke. To hard-revoke, clear the API Key field or delete the document.',
        },
      },
    ],
  }
}
