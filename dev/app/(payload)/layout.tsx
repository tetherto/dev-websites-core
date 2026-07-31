import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import config from '@payload-config'

import { serverFunction } from './actions'
import { importMap } from './admin/importMap.js'

type Props = {
  children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
