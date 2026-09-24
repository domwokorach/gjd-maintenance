import "server-only"
import { env } from "@/lib/env"

const LEVELS = ["debug", "info", "warn", "error"] as const
type Level = (typeof LEVELS)[number]

const threshold = LEVELS.indexOf(env.LOG_LEVEL)

function log(level: Level, message: string, meta?: Record<string, unknown>) {
  if (LEVELS.indexOf(level) < threshold) return
  const line = { level, message, ...meta }
  console[level === "debug" ? "log" : level](line)
}

/**
 * Centralised, level-gated logging. Never pass secrets, tokens, full
 * request/auth headers, or raw customer PII in `meta` — log identifiers
 * (an id, a masked email) instead.
 */
export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => log("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),
}
