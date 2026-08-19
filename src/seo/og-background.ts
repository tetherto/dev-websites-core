/**
 * Resolves a Payload Media document into a base64 data URL for Satori OG images.
 * Server-only — reads via disk/S3, not the public HTTP media URL.
 */

import { createLogger } from '../utils/logger/logger.js'
import { readPayloadMediaAsDataUrl } from '../cms/payload/readMediaBuffer.js'

import type { PayloadMedia } from '../cms/payload/readMediaBuffer.js'

const log = createLogger('ogBackground')

export async function getOgBackgroundDataUrl(
  media: PayloadMedia | null | undefined
): Promise<string | undefined> {
  if (!media || !media.filename) return undefined
  try {
    return await readPayloadMediaAsDataUrl({
      filename: media.filename,
      mimeType: media.mimeType,
    })
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    log.warn(`Failed to load OG background for media ${media.filename}: ${reason}`)
    return undefined
  }
}
