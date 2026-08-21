import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type AccessOptions = {
  /**
   * When true, disabled `api-tokens` users are denied public reads.
   * Defaults to on when the stock `api-tokens` collection is enabled.
   */
  apiTokens?: boolean
}

export type AccessHelpers = {
  adminOnly: ({ req }: { req: PayloadRequest }) => boolean
  adminOrPublished: Access
  publicRead: Access
  adminOnlyField: FieldAccess
}

const isAdminUser = (req: PayloadRequest): boolean => req.user?.collection === 'users'

const isDisabledApiToken = (req: PayloadRequest): boolean =>
  req.user?.collection === 'api-tokens' && req.user?.enabled === false

/**
 * Build access helpers. Pass `{ apiTokens: true }` when the `api-tokens`
 * collection is registered (stock by default via `buildCmsConfig`).
 */
export function createAccessHelpers(options: AccessOptions = {}): AccessHelpers {
  const apiTokens = options.apiTokens === true

  const adminOnly = ({ req }: { req: PayloadRequest }): boolean => isAdminUser(req)

  const adminOrPublished: Access = ({ req }) => {
    if (isAdminUser(req)) return true
    if (apiTokens && isDisabledApiToken(req)) return false
    return { _status: { equals: 'published' } }
  }

  const publicRead: Access = ({ req }) => {
    if (apiTokens && isDisabledApiToken(req)) return false
    return true
  }

  const adminOnlyField: FieldAccess = ({ req }) => isAdminUser(req)

  return { adminOnly, adminOrPublished, publicRead, adminOnlyField }
}
