import type { AccessHelpers } from '../shared/access.js'
import type { CollectionConfig } from 'payload'

export function createUsers(access: AccessHelpers): CollectionConfig {
  return {
    slug: 'users',
    admin: {
      useAsTitle: 'email',
    },
    auth: true,
    access: {
      read: access.adminOnly,
      create: access.adminOnly,
      update: access.adminOnly,
      delete: access.adminOnly,
      admin: access.adminOnly,
    },
    fields: [],
  }
}
