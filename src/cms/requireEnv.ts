/**
 * Read a required env var. During Next.js `phase-production-build` and
 * `generate:importmap` (when NEXT_PHASE is unset) returns "" instead of throwing,
 * because those phases do not connect to the DB.
 */
export function requireEnvAtRuntime(name: string): string {
  const value = process.env[name]
  const isBuildTime = !process.env.NEXT_PHASE || process.env.NEXT_PHASE === 'phase-production-build'
  if (!value && !isBuildTime) throw new Error(`Missing required environment variable: ${name}`)
  return value ?? ''
}
