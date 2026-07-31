import { s3Storage } from '@payloadcms/storage-s3'

import type { Plugin } from 'payload'

export type CreateS3MediaPluginOptions = {
  /** Defaults to `process.env.AWS_S3_BUCKET`. */
  bucket?: string
  accessKeyId?: string
  secretAccessKey?: string
  region?: string
  /** Collection slug that owns uploads. Defaults to `media`. */
  collection?: string
}

/** Payload S3 storage plugin wired for the stock `media` collection. */
export function createS3MediaPlugin(options: CreateS3MediaPluginOptions = {}): Plugin {
  const bucket = options.bucket ?? process.env.AWS_S3_BUCKET ?? ''
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
    },
  })
}
