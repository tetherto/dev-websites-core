# `@wdk/core`

Shared non-UI libraries for WDK / QVAC websites. Domains:

| Import | Contents |
|---|---|
| `@wdk/core/cms` | Payload `buildCmsConfig`, stock collections, access, Lexical, media I/O |
| `@wdk/core/seo` | `createMetadataFactory`, `getSiteUrl`, `getOgBackgroundDataUrl` |
| `@wdk/core/i18n` | `Languages` / `LanguageLabel` |
| `@wdk/core/utils` | `createLogger`, `toPlainValue`, `stripShikiPreBackground` |

Local development — consume via `"@wdk/core": "file:../wdk-core"`.

Sites use `install-links=true` in `.npmrc` so npm **copies** the package into
`node_modules` (Turbopack cannot follow a symlink outside the app root).

```bash
npm install
npm run build
# or: npm run dev
```

After changing this package:

```bash
npm run build
# in each site:
rm -rf node_modules/@wdk/core && npm install @wdk/core@file:../wdk-core
```

Do **not** import `@wdk/core/cms` from Client Components — it includes Node-only
modules (`fs`, Payload, S3). Prefer domain subpaths over the root barrel.

### CMS stock

Collections: `users`, `api-tokens`, `media`, `authors`, `categories`,
`blog-posts`, `pages`, `legal-pages`, `changelog-tags`, `changelog`.
Global: `site-settings`.

Disable or extend via `overrides[slug]`. Changelog stock has shared fields only;
site-specific body / GitHub / `relatedBlock` fields go in `overrides.fields`.
Revalidation hooks go in `overrides.hooks` (site-owned, e.g. `src/lib/cache`).
