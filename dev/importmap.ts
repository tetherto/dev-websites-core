/**
 * Regenerates dev/app/(payload)/admin/importMap.js from the current CMS config.
 * Run after changing admin components / editor features:
 *
 *   npm run cms:importmap
 *
 * (dev:cms runs this automatically on startup.)
 */
import path from 'node:path'

import { generateImportMap } from 'payload'

import config from './payload.config.js'

// generateImportMap locates app/(payload)/admin under process.env.ROOT_DIR (else cwd).
process.env.ROOT_DIR = path.resolve(import.meta.dirname)

await generateImportMap(await config, { log: true, force: true })
console.log('[cms:importmap] import map written')
