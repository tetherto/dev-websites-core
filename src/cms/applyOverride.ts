import type { CollectionConfig, Field, GlobalConfig } from 'payload'

type OverridableConfig = CollectionConfig | GlobalConfig

type Override<TConfig extends OverridableConfig> =
  | false
  | {
      fields?: (base: Field[]) => Field[]
      hooks?: Partial<TConfig['hooks']>
      admin?: Partial<TConfig['admin']>
      access?: Partial<TConfig['access']>
      config?: (base: TConfig) => TConfig
    }

export type CollectionOverride = Override<CollectionConfig>
export type GlobalOverride = Override<GlobalConfig>

type HookArrays = Record<string, unknown[] | undefined>

// Payload collection/global hooks are all arrays of functions, so overrides are
// appended to the base hooks rather than replacing them.
function mergeHooks(base: HookArrays | undefined, extra: HookArrays | undefined): HookArrays {
  const keys = new Set([...Object.keys(base ?? {}), ...Object.keys(extra ?? {})])
  const merged: HookArrays = {}
  keys.forEach((key) => {
    const combined = [...(base?.[key] ?? []), ...(extra?.[key] ?? [])]
    if (combined.length) merged[key] = combined
  })
  return merged
}

function applyOverride<TConfig extends OverridableConfig>(
  base: TConfig,
  override: Override<TConfig> | undefined
): TConfig | null {
  if (override === false) return null
  if (!override) return base

  const next = {
    ...base,
    ...(override.admin && { admin: { ...base.admin, ...override.admin } }),
    ...(override.access && { access: { ...base.access, ...override.access } }),
    ...(override.fields && { fields: override.fields(base.fields ?? []) }),
    ...(override.hooks && { hooks: mergeHooks(base.hooks, override.hooks as HookArrays) }),
  } as TConfig

  return override.config ? override.config(next) : next
}

export const applyCollectionOverride = (
  base: CollectionConfig,
  override: CollectionOverride | undefined
): CollectionConfig | null => applyOverride(base, override)

export const applyGlobalOverride = (
  base: GlobalConfig,
  override: GlobalOverride | undefined
): GlobalConfig | null => applyOverride(base, override)
