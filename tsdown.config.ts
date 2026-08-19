import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'cms/index': 'src/cms/index.ts',
    'seo/index': 'src/seo/index.ts',
    'i18n/index': 'src/i18n/index.ts',
    'utils/index': 'src/utils/index.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  // tsdown externalizes dependencies/peerDependencies by default, so the peer
  // packages (payload, lexical, storage-s3, aws-sdk, next) stay unbundled.
})
