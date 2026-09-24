import { publicEnv } from "@/lib/env.public"

/**
 * Client-safe API configuration. Only ever reads NEXT_PUBLIC_* values, so
 * this module can be imported from "use client" components as well as the
 * server. For server-to-server calls (which may need an internal base URL
 * that isn't exposed to the browser), use `@/lib/api/server` instead.
 */
export const apiConfig = {
  baseUrl: publicEnv.NEXT_PUBLIC_API_URL,
  appUrl: publicEnv.NEXT_PUBLIC_APP_URL,
  siteName: publicEnv.NEXT_PUBLIC_SITE_NAME,
  /** Default timeout (ms) applied to requests that don't specify their own. */
  defaultTimeoutMs: 10_000,
} as const
