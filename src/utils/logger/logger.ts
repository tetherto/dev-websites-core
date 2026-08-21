/**
 * Tiny, dependency-free structured logger. Prefer `createLogger(scope)` over
 * `console.*` so callers can filter by `LOG_LEVEL` and keep a consistent prefix.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

function resolveMinLevel(): LogLevel {
  const raw = (process.env.LOG_LEVEL ?? '').toLowerCase()
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') {
    return raw
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug'
}

const minLevel = resolveMinLevel()

export type Logger = {
  debug: (message: string) => void
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
  /** Returns a logger whose scope is `${parent}:${suffix}`. */
  child: (suffix: string) => Logger
}

function emit(level: LogLevel, scope: string, message: string): void {
  if (LEVEL_RANK[level] < LEVEL_RANK[minLevel]) return
  const line = `[${scope}] ${message}`
  switch (level) {
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(line)
      return
    case 'info':
      // eslint-disable-next-line no-console
      console.info(line)
      return
    case 'warn':
      // eslint-disable-next-line no-console
      console.warn(line)
      return
    case 'error':
      // eslint-disable-next-line no-console
      console.error(line)
      return
  }
}

export function createLogger(scope: string): Logger {
  return {
    debug: (m) => emit('debug', scope, m),
    info: (m) => emit('info', scope, m),
    warn: (m) => emit('warn', scope, m),
    error: (m) => emit('error', scope, m),
    child: (suffix) => createLogger(`${scope}:${suffix}`),
  }
}
