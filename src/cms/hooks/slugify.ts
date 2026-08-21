import type { FieldHook } from 'payload'

export const slugify: FieldHook = ({ value }) =>
  typeof value === 'string'
    ? value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    : value
