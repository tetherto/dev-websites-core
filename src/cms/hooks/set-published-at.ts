import type { CollectionBeforeChangeHook } from 'payload'

export const setPublishedAt: CollectionBeforeChangeHook = ({ data }) => {
  if (data && !data.publishedAt && data._status === 'published') {
    data.publishedAt = new Date().toISOString()
  }
  return data
}
