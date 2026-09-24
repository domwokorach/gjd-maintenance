import "server-only"
import { z } from "zod"
import { formatZodError, publicEnv } from "@/lib/env.public"

/**
 * An unset env var and a blank `KEY=` line in an .env file both end up as
 * `""` in process.env, not `undefined` — so plain `.optional()` doesn't
 * treat them as absent. Wrap optional string fields with this so a blank
 * value is treated the same as a missing one.
 */
const optionalString = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional())

/**
 * Full, server-only environment configuration. The `server-only` import
 * above makes any accidental import from a "use client" component fail the
 * build instead of silently shipping (or silently dropping) secrets.
 *
 * Access this everywhere on the server instead of reaching for
 * `process.env.XYZ` directly, so every variable is validated once, in one
 * place, at startup.
 */
const serverEnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // Deployment tier, distinct from NODE_ENV: Vercel Preview builds run with
    // NODE_ENV=production but should behave like staging (separate DB/email/etc).
    APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

    // Email is optional at build time. Production submissions check for it
    // when a booking or contact enquiry is actually made.
    RESEND_API_KEY: optionalString(z.string().min(1)),
    BOOKING_EMAIL: optionalString(z.string().trim().email()),

    // Not wired up yet, but validated when present so future integrations
    // (database, auth, object storage, webhooks) can rely on this module
    // instead of adding their own ad-hoc process.env reads.
    DATABASE_URL: optionalString(z.string().min(1)),
    AUTH_SECRET: optionalString(z.string().min(32)),

    STORAGE_URL: optionalString(z.string().url()),
    STORAGE_ACCESS_KEY: optionalString(z.string().min(1)),
    STORAGE_SECRET_KEY: optionalString(z.string().min(1)),

    WEBHOOK_SECRET: optionalString(z.string().min(1)),
  })

function loadServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    APP_ENV: process.env.APP_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    BOOKING_EMAIL: process.env.BOOKING_EMAIL,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    STORAGE_URL: process.env.STORAGE_URL,
    STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
    STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  })

  if (!parsed.success) {
    throw new Error(
      `❌ Invalid server environment variables:\n${formatZodError(parsed.error)}\n\nCheck .env.local against .env.example.`
    )
  }

  return parsed.data
}

/** Validated environment configuration — public variables plus server-only secrets. */
export const env = {
  ...publicEnv,
  ...loadServerEnv(),
}

export const isProduction = env.APP_ENV === "production"
export const isStaging = env.APP_ENV === "staging"
export const isDevelopment = env.APP_ENV === "development"
