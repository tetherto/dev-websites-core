import type { GroupField, Validate } from 'payload'

const MAX_META_TITLE = 60
const MAX_META_DESCRIPTION = 160

const validateMetaTitle: Validate<string | null | undefined> = (value) => {
  if (!value || value.trim().length === 0) return 'Meta title is required.'
  if (value.length > MAX_META_TITLE)
    return `Meta title must be ${MAX_META_TITLE} characters or fewer (currently ${value.length}).`
  return true
}

const validateMetaDescription: Validate<string | null | undefined> = (value) => {
  if (!value || value.trim().length === 0) return 'Meta description is required.'
  if (value.length > MAX_META_DESCRIPTION)
    return `Meta description must be ${MAX_META_DESCRIPTION} characters or fewer (currently ${value.length}).`
  return true
}

const validateUrl: Validate<string | null | undefined> = (value) => {
  if (!value) return true
  try {
    new URL(value)
    return true
  } catch {
    return 'Must be a valid URL (e.g. https://example.com/page).'
  }
}

export const seoFields: GroupField = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      required: true,
      localized: true,
      maxLength: MAX_META_TITLE,
      validate: validateMetaTitle,
      admin: {
        description: `Required. ${MAX_META_TITLE} characters max — shown in browser tabs and search results.`,
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      localized: true,
      validate: validateMetaDescription,
      admin: {
        description: `Required. ${MAX_META_DESCRIPTION} characters max — shown in search result snippets.`,
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Used when the page is shared on social media (1200×630 recommended). Falls back to cover image if empty.',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      validate: validateUrl,
      admin: {
        description: 'Override for syndicated content. Leave empty to auto-derive from slug.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'When checked, search engines will not index this page.',
      },
    },
    {
      name: 'noFollow',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'When checked, search engines will not follow links on this page (paired with noIndex if needed).',
      },
    },
  ],
}
