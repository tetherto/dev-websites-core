# `@tetherto/dev-websites-core`

Shared non-UI libraries for WDK / QVAC websites. Domains:

| Import                         | Contents                                                                |
| ------------------------------ | ----------------------------------------------------------------------- |
| `@tetherto/dev-websites-core/cms`   | Payload `buildCmsConfig`, stock collections, access, Lexical, media I/O |
| `@tetherto/dev-websites-core/seo`   | `createMetadataFactory`, `getSiteUrl`, `getOgBackgroundDataUrl`         |
| `@tetherto/dev-websites-core/i18n`  | `Languages` / `LanguageLabel`                                           |
| `@tetherto/dev-websites-core/utils` | `createLogger`, `toPlainValue`, `stripShikiPreBackground`               |

### Install

```bash
npm install @tetherto/dev-websites-core
```

Local development — consume via `"@tetherto/dev-websites-core": "file:../wdk-core"`.

Sites use `install-links=true` in `.npmrc` so npm **copies** the package into
`node_modules` (Turbopack cannot follow a symlink outside the app root).

Built with [`tsdown`](https://tsdown.dev) (ESM only, per-domain entry points,
`.d.ts` + sourcemaps). `npm run prepare` / `npm publish` rebuilds `dist` via
`tsdown`. `npm run dev` runs `tsdown --watch`.

```bash
npm install
npm run build
# or: npm run dev
```

After changing this package locally, re-link it in each site — the `prepare` hook
rebuilds `dist` automatically on install, so an explicit `npm run build` is
usually unnecessary:

```bash
rm -rf node_modules/@tetherto/dev-websites-core && npm install @tetherto/dev-websites-core@file:../wdk-core
```

Do **not** import `@tetherto/dev-websites-core/cms` from Client Components — it includes Node-only
modules (`fs`, Payload, S3). Prefer domain subpaths over the root barrel.

### CMS stock

Registered by `buildCmsConfig` in this order. Disable or extend any of them via
`overrides[slug]` (`false` to drop, or `{ fields, hooks, admin, access, config }`).

| Slug             | Kind       | Purpose                                                                                                           |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `users`          | collection | Admin auth users (Payload local strategy).                                                                        |
| `api-tokens`     | collection | Server-to-server API-key auth for non-admin REST/GraphQL clients. Disable with `overrides['api-tokens'] = false`. |
| `media`          | collection | Uploads (image/video/pdf) with image sizes; served from S3 or disk.                                               |
| `authors`        | collection | Blog authors — bio, social profiles, JSON-LD `Person` overrides.                                                  |
| `categories`     | collection | Blog post categories.                                                                                             |
| `blog-posts`     | collection | Blog posts — drafts + autosave, SEO, author/category relations.                                                   |
| `pages`          | collection | Generic content pages (block-based body).                                                                         |
| `legal-pages`    | collection | Legal/policy content pages (same shape as `pages`).                                                               |
| `changelog-tags` | collection | Editor-managed tags shown on changelog entries.                                                                   |
| `changelog`      | collection | Changelog entries — **shared fields only** (see below).                                                           |
| `site-settings`  | global     | Site name, default description/OG image, organization + social.                                                   |

Changelog stock ships shared fields only; site-specific body / GitHub /
`relatedBlock` fields go in `overrides.fields`. Revalidation hooks go in
`overrides.hooks` (site-owned, e.g. `src/lib/cache`) — hook arrays are **appended**
to stock hooks, not replaced.

### Peer dependencies

The consuming site must install these (all are required peers):
`payload`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-s3`,
`@aws-sdk/client-s3`, `next`.

### Environment variables

Read from `process.env` at runtime by the package — **set them in the consuming
site's environment** (`.env` / hosting / CI); `@tetherto/dev-websites-core` never defines them.

| Variable                                      | Used by                                           | Notes                                                                                          |
| --------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `AWS_S3_BUCKET`                               | `media`, `createS3MediaPlugin`, `readMediaBuffer` | When set, media reads/writes go to S3; otherwise disk (`<cwd>/media`).                         |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | S3 access                                         | Optional; falls back to the default AWS credential chain.                                      |
| `AWS_S3_REGION`                               | S3 access                                         | Defaults to `us-east-1`.                                                                       |
| `AWS_S3_ENDPOINT`                             | S3 access                                         | Optional custom endpoint (S3-compatible stores on QVAC / PEAR). Omit on WDK for default AWS S3. |
| `AWS_S3_FORCE_PATH_STYLE`                     | S3 access                                         | Set to `true` when the custom endpoint requires path-style addressing.                         |
| `NEXT_PUBLIC_SITE_URL`                        | `getSiteUrl`                                      | Public origin; trailing slash trimmed. Warns in production if this and `VERCEL_URL` are unset. |
| `VERCEL_URL`                                  | `getSiteUrl`                                      | Fallback origin on Vercel when `NEXT_PUBLIC_SITE_URL` is unset.                                |
| `LOG_LEVEL`                                   | `createLogger`                                    | `debug` \| `info` \| `warn` \| `error`. Defaults to `info` in production, `debug` otherwise.   |
| `NEXT_PHASE`                                  | `requireEnvAtRuntime`                             | Build phases skip the required-env check (no DB connection).                                   |

Hard-required vars (e.g. `PAYLOAD_SECRET`, `MONGODB_URI`) should be read via
`requireEnvAtRuntime(name)` — it logs and throws at runtime when the var is
missing, but returns `""` during Next.js build phases (which never connect to
the DB). Silent fallbacks that would mask a misconfiguration (e.g. `getSiteUrl`)
log a warning in production.

### Usage

```ts
// src/payload.config.ts
import { buildCmsConfig, createS3MediaPlugin } from '@tetherto/dev-websites-core/cms'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import sharp from 'sharp'
import { Languages } from '@tetherto/dev-websites-core/i18n'

export default buildCmsConfig({
  secret: process.env.PAYLOAD_SECRET!,
  db: mongooseAdapter({ url: process.env.DATABASE_URI! }),
  sharp,
  locales: [Languages.English],
  defaultLocale: Languages.English,
  plugins: [createS3MediaPlugin()],
  overrides: {
    'api-tokens': false, // drop a stock collection
    'changelog': { fields: (base) => [...base /* site-specific fields */] },
  },
  extraCollections: [/* site-only collections */],
})
```
