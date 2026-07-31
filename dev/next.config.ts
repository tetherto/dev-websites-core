import path from 'node:path'

import { withPayload } from '@payloadcms/next/withPayload'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The playground imports the built package from ../dist, which lives outside this
  // app dir, so point Turbopack's resolution root at the wdk-core package root.
  turbopack: {
    root: path.resolve(import.meta.dirname, '..'),
  },
}

export default withPayload(nextConfig)
