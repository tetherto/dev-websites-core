/**
 * Prints the assembled CMS config (collections + globals + field tree) without a
 * database or the admin UI. Fast sanity check that `buildCmsConfig` still produces
 * a valid, sanitized Payload config.
 *
 *   npm run cms:inspect
 */
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { buildCmsConfig } from '../src/cms/index.js'

import type { Field } from 'payload'

const INTERNAL = /^payload-/

function fieldLines(fields: Field[], depth = 1): string[] {
  const pad = '  '.repeat(depth)
  return fields.flatMap((f): string[] => {
    const label = 'name' in f && f.name ? f.name : `(${f.type})`
    const flags: string[] = [f.type]
    if ('localized' in f && f.localized) flags.push('localized')
    if ('required' in f && f.required) flags.push('required')
    if ('relationTo' in f && f.relationTo) {
      flags.push(`→ ${Array.isArray(f.relationTo) ? f.relationTo.join('|') : f.relationTo}`)
    }

    const lines = [`${pad}• ${label}  [${flags.join(', ')}]`]

    if (f.type === 'blocks' && 'blocks' in f) {
      f.blocks.forEach((b) => {
        lines.push(`${pad}  ▸ block: ${b.slug}`)
        lines.push(...fieldLines(b.fields, depth + 2))
      })
    } else if ('tabs' in f && Array.isArray(f.tabs)) {
      f.tabs.forEach((t) => {
        lines.push(`${pad}  ⌐ tab: ${'name' in t && t.name ? t.name : String(t.label)}`)
        lines.push(...fieldLines(t.fields, depth + 2))
      })
    } else if ('fields' in f && Array.isArray(f.fields)) {
      lines.push(...fieldLines(f.fields, depth + 1))
    }

    return lines
  })
}

const config = await buildCmsConfig({
  secret: 'inspect',
  // Not connected — buildConfig only stores the adapter, it does not open a socket.
  db: mongooseAdapter({ url: 'mongodb://127.0.0.1/inspect' }),
  locales: ['en'],
  defaultLocale: 'en',
})

const collections = config.collections.filter((c) => !INTERNAL.test(c.slug))
const internal = config.collections.filter((c) => INTERNAL.test(c.slug))

console.log(`\n\x1b[1mCOLLECTIONS\x1b[0m (${collections.length})`)
collections.forEach((c) => {
  const tags = [c.auth && 'auth', c.upload && 'upload', c.versions && 'versions'].filter(Boolean)
  console.log(`\n\x1b[36m▸ ${c.slug}\x1b[0m${tags.length ? `  [${tags.join(', ')}]` : ''}`)
  console.log(fieldLines(c.fields).join('\n'))
})

console.log(`\n\n\x1b[1mGLOBALS\x1b[0m (${config.globals.length})`)
config.globals.forEach((g) => {
  console.log(`\n\x1b[36m▸ ${g.slug}\x1b[0m`)
  console.log(fieldLines(g.fields).join('\n'))
})

console.log(`\n\x1b[2minternal (payload) collections: ${internal.map((c) => c.slug).join(', ')}\x1b[0m\n`)
