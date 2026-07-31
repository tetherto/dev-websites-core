'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'

import config from '@payload-config'

import { importMap } from './admin/importMap.js'

import type { ServerFunctionClientArgs } from 'payload'

export async function serverFunction(args: ServerFunctionClientArgs): Promise<unknown> {
  return handleServerFunctions({ ...args, config, importMap })
}
