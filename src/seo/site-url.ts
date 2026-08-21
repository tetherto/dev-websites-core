import { createLogger } from '../utils/logger/logger.js'

const log = createLogger('siteUrl')

export type GetSiteUrlOptions = {
  /** Fallback when no env URL is set. Defaults to `http://localhost:3000`. */
  fallback?: string
}

/** Resolve the public site origin from env (`NEXT_PUBLIC_SITE_URL` / `VERCEL_URL`). */
export function getSiteUrl(options: GetSiteUrlOptions = {}): string {
  const fallback = options.fallback ?? 'http://localhost:3000'
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
  // A localhost origin in production means canonical/OG URLs will be wrong — surface it loudly.
  if (process.env.NODE_ENV === 'production') {
    log.warn(
      `NEXT_PUBLIC_SITE_URL and VERCEL_URL are unset — falling back to ${fallback}. Canonical and Open Graph URLs will be incorrect.`
    )
  }
  return fallback.replace(/\/$/, '')
}
