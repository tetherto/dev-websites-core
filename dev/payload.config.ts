import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'

// Import the built package (not src) so Next/Turbopack resolves plain ESM.
// `npm run dev:cms` rebuilds dist on change via `tsup --watch`.
import { buildCmsConfig } from '../dist/cms/index.js'

// NOTE: keep this module free of `import.meta.dirname` / Node-only path logic —
// Next compiles it for the server bundle where those are unavailable. The import
// map output path is handled by dev/importmap.ts via ROOT_DIR.
export default buildCmsConfig({
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-me',
  // In dev:cms the URI points at an ephemeral mongodb-memory-server instance.
  db: mongooseAdapter({ url: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/wdk-core-dev' }),
  sharp,
  locales: ['en'],
  defaultLocale: 'en',
  admin: {
    meta: { titleSuffix: '— WDK Core CMS Dev' },
  },
})
