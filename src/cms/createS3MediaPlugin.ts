import { s3Storage } from '@payloadcms/storage-s3'

import type { Plugin } from 'payload'

export type CreateS3MediaPluginOptions = {
  /** Defaults to `process.env.AWS_S3_BUCKET`. */
  bucket?: string
  accessKeyId?: string
  secretAccessKey?: string
  region?: string
  /** Custom S3-compatible endpoint (MinIO, etc.). Defaults to `AWS_S3_ENDPOINT`. */
  endpoint?: string
  /** Defaults to `AWS_S3_FORCE_PATH_STYLE === 'true'`. */
  forcePathStyle?: boolean
  /** Collection slug that owns uploads. Defaults to `media`. */
  collection?: string
}

/** Payload S3 storage plugin wired for the stock `media` collection. */
export function createS3MediaPlugin(options: CreateS3MediaPluginOptions = {}): Plugin {
  const bucket = options.bucket ?? process.env.AWS_S3_BUCKET ?? ''
  const endpoint = options.endpoint ?? process.env.AWS_S3_ENDPOINT ?? ''
  const forcePathStyle = options.forcePathStyle ?? process.env.AWS_S3_FORCE_PATH_STYLE === 'true'

  return s3Storage({
    enabled: Boolean(bucket),
    collections: {
      [options.collection ?? 'media']: true,
    },
    bucket,
    config: {
      credentials: {
        accessKeyId: options.accessKeyId ?? process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: options.secretAccessKey ?? process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
      region: options.region ?? process.env.AWS_S3_REGION ?? 'us-east-1',
      ...(endpoint ? { endpoint } : {}),
      ...(forcePathStyle ? { forcePathStyle: true } : {}),
    },
  })
}
