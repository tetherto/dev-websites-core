import { getSiteUrl } from './site-url.js'

import type { Metadata } from 'next'

export type OgImage = {
  url: string
  width?: number
  height?: number
  alt?: string
}

export type CreateMetadataInput = {
  title: string
  description?: string
  pathname?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
  locale?: string
  images?: OgImage[]
  ogType?: 'website' | 'article'
  article?: {
    publishedTime?: string
    modifiedTime?: string
    expirationTime?: string
    section?: string
    tags?: string[]
    authors?: string[]
  }
  twitterCreator?: string
  /** Per-call overrides (e.g. localized site name). */
  siteName?: string
  defaultDescription?: string
}

export type CreateMetadataFactoryOptions = {
  siteName: string
  defaultDescription: string
  locales: readonly string[]
  defaultLocale: string
  /** Maps locale → Open Graph locale tag (e.g. `en` → `en_US`). */
  getOpenGraphLocale: (locale: string) => string
  localePrefix?: 'always' | 'as-needed' | 'never'
  getSiteUrl?: () => string
}

const ABSOLUTE_URL_RE = /^https?:\/\//i

function toAbsolute(value: string, base: string): string {
  if (ABSOLUTE_URL_RE.test(value)) return value
  return new URL(value, base).toString()
}

export function createMetadataFactory(options: CreateMetadataFactoryOptions) {
  const localePrefix = options.localePrefix ?? 'as-needed'
  const resolveSiteUrl = options.getSiteUrl ?? (() => getSiteUrl())

  function createMetadata(input: CreateMetadataInput): Metadata {
    const siteName = input.siteName ?? options.siteName
    const defaultDescription = input.defaultDescription ?? options.defaultDescription
    const description = input.description?.trim() || defaultDescription
    const pathname = input.pathname ?? '/'
    const base = resolveSiteUrl()
    const canonical = input.canonicalUrl
      ? toAbsolute(input.canonicalUrl, base)
      : new URL(pathname, base).toString()

    const locale = input.locale ?? options.defaultLocale
    const ogLocale = options.getOpenGraphLocale(locale)

    const languages: Record<string, string> = {}
    for (const l of options.locales) {
      const isDefault = l === options.defaultLocale
      const localizedPath =
        localePrefix === 'as-needed' && isDefault ? pathname : `/${l}${pathname}`
      languages[l] = new URL(localizedPath, base).toString()
    }
    languages['x-default'] = new URL(pathname, base).toString()

    const images: OgImage[] | undefined = input.images?.map((img) => ({
      ...img,
      url: toAbsolute(img.url, base),
    }))

    const ogType = input.ogType ?? 'website'

    const robots =
      input.noIndex || input.noFollow
        ? {
            index: !input.noIndex,
            follow: !input.noFollow,
          }
        : undefined

    return {
      title: input.title,
      description,
      alternates: {
        canonical,
        languages,
      },
      openGraph: {
        type: ogType,
        title: input.title,
        description,
        url: canonical,
        siteName,
        locale: ogLocale,
        ...(images ? { images } : {}),
        ...(ogType === 'article' && input.article
          ? {
              publishedTime: input.article.publishedTime,
              modifiedTime: input.article.modifiedTime,
              expirationTime: input.article.expirationTime,
              section: input.article.section,
              tags: input.article.tags,
              authors: input.article.authors,
            }
          : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title: input.title,
        description,
        ...(images ? { images: images.map((i) => i.url) } : {}),
        ...(input.twitterCreator ? { creator: input.twitterCreator } : {}),
      },
      ...(robots ? { robots } : {}),
    }
  }

  function createRootMetadata(overrides?: {
    siteName?: string
    defaultDescription?: string
  }): Metadata {
    const base = resolveSiteUrl()
    const siteName = overrides?.siteName ?? options.siteName
    const description = overrides?.defaultDescription ?? options.defaultDescription
    return {
      metadataBase: new URL(base),
      title: {
        default: siteName,
        template: `%s | ${siteName}`,
      },
      description,
    }
  }

  return { createMetadata, createRootMetadata }
}
