import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

import config from '@payload-config'

import { importMap } from '../importMap.js'

import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: PageProps): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

export default function Page({ params, searchParams }: PageProps) {
  return RootPage({ config, importMap, params, searchParams })
}
