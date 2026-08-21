import type { CollectionConfig } from 'payload'

export const draftsWithAutosave: CollectionConfig['versions'] = {
  maxPerDoc: 25,
  drafts: {
    autosave: {
      interval: 800,
    },
    schedulePublish: true,
  },
}
