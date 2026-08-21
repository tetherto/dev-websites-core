/**
 * Read a Payload-managed Media file's raw bytes, bypassing the public HTTP
 * surface. Uses S3 when `AWS_S3_BUCKET` is set; otherwise reads from
 * `<cwd>/media/<filename>` (Payload's default upload staticDir for `media`).
 */

import { readFile } from 'fs/promises'
import { join } from 'path'

import { GetObjectCommand, S3Client, type S3ClientConfig } from '@aws-sdk/client-s3'

import { createLogger } from '../../utils/logger/logger.js'

const log = createLogger('readPayloadMedia')

export type PayloadMedia = {
  filename?: string | null
  mimeType?: string | null
}

let cachedS3Client: S3Client | null = null

function isS3Enabled(): boolean {
  return Boolean(process.env.AWS_S3_BUCKET)
}

function getS3Client(): S3Client {
  if (cachedS3Client) return cachedS3Client
  const endpoint = process.env.AWS_S3_ENDPOINT?.trim()
  const clientConfig: S3ClientConfig = {
    region: process.env.AWS_S3_REGION ?? 'us-east-1',
    ...(endpoint ? { endpoint } : {}),
    ...(process.env.AWS_S3_FORCE_PATH_STYLE === 'true' ? { forcePathStyle: true } : {}),
  }
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if (accessKeyId && secretAccessKey) {
    clientConfig.credentials = { accessKeyId, secretAccessKey }
  }
  cachedS3Client = new S3Client(clientConfig)
  return cachedS3Client
}

async function readFromS3(filename: string): Promise<Buffer> {
  const bucket = process.env.AWS_S3_BUCKET
  if (!bucket) {
    throw new Error('AWS_S3_BUCKET is not set — cannot read media from S3')
  }
  const client = getS3Client()
  const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: filename }))
  if (!response.Body) {
    throw new Error(`S3 returned an empty body for media file: ${filename}`)
  }

  const bytes = await response.Body.transformToByteArray()
  return Buffer.from(bytes)
}

async function readFromDisk(filename: string): Promise<Buffer> {
  const filePath = join(process.cwd(), 'media', filename)
  return readFile(filePath)
}

export async function readPayloadMediaBuffer(media: PayloadMedia): Promise<Buffer> {
  const filename = media.filename?.trim()
  if (!filename) {
    throw new Error('Media document has no filename')
  }
  const source = isS3Enabled() ? 's3' : 'disk'
  log.debug(`reading media filename=${filename} source=${source}`)
  return source === 's3' ? readFromS3(filename) : readFromDisk(filename)
}

export async function readPayloadMediaAsDataUrl(media: PayloadMedia): Promise<string> {
  const buffer = await readPayloadMediaBuffer(media)
  const mimeType = media.mimeType?.trim() || 'image/jpeg'
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}
