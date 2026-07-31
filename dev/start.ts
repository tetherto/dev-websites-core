/**
 * One-command CMS dev environment:
 *   1. boots an ephemeral in-memory MongoDB (data resets each run),
 *   2. builds the package to dist,
 *   3. generates the admin import map,
 *   4. rebuilds dist on change (tsup --watch) and serves the admin (next dev).
 *
 *   npm run dev:cms      → open http://localhost:3000/admin
 *
 * First admin visit: create the initial user (the DB is empty).
 */
import { spawn, type ChildProcess } from 'node:child_process'
import path from 'node:path'

import { MongoMemoryServer } from 'mongodb-memory-server'

const devDir = import.meta.dirname
const rootDir = path.resolve(devDir, '..')
const binDir = path.resolve(rootDir, 'node_modules', '.bin')
const port = process.env.PORT ?? '3000'

function run(command: string, args: string[], cwd: string, env: NodeJS.ProcessEnv): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit', env })
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited with ${code}`)),
    )
  })
}

const mongod = await MongoMemoryServer.create()
const uri = mongod.getUri('wdk-core-dev')

const env: NodeJS.ProcessEnv = {
  ...process.env,
  PATH: `${binDir}${path.delimiter}${process.env.PATH ?? ''}`,
  MONGODB_URI: uri,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-me',
}

const children: ChildProcess[] = []
let shuttingDown = false

async function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true
  children.forEach((c) => c.kill('SIGINT'))
  await mongod.stop().catch(() => {})
  process.exit(code)
}

process.on('SIGINT', () => void shutdown(0))
process.on('SIGTERM', () => void shutdown(0))

try {
  console.log(`\n[dev:cms] in-memory Mongo → ${uri}`)
  console.log('[dev:cms] building package (tsup)…')
  await run('tsup', [], rootDir, env)
  console.log('[dev:cms] generating admin import map…')
  await run('tsx', ['dev/importmap.ts'], rootDir, env)

  const watcher = spawn('tsup', ['--watch'], { cwd: rootDir, stdio: 'inherit', env })
  const next = spawn('next', ['dev', '--port', port], { cwd: devDir, stdio: 'inherit', env })
  children.push(watcher, next)

  console.log(`\n[dev:cms] admin → http://localhost:${port}/admin\n`)
  next.on('exit', (code) => void shutdown(code ?? 0))
} catch (err) {
  console.error('[dev:cms]', err instanceof Error ? err.message : err)
  await shutdown(1)
}
