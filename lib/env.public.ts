import { z } from "zod"
import type { ZodError } from "zod"

/**
 * Only NEXT_PUBLIC_* variables belong here — everything in this module is
 * safe to import from "use client" components and ends up inlined into the
 * browser bundle at build time.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  // A blank `NEXT_PUBLIC_SITE_NAME=` line parses as "", not undefined, so
  // fall through to the default in that case too.
  NEXT_PUBLIC_SITE_NAME: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().min(1).default("GJD Maintenance")
  ),
})

export type PublicEnv = z.infer<typeof publicEnvSchema>

export function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n")
}

function loadPublicEnv(): PublicEnv {
  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  })

  if (!parsed.success) {
    throw new Error(
      `❌ Invalid browser-exposed environment variables:\n${formatZodError(parsed.error)}\n\nCheck .env.local against .env.example.`
    )
  }

  return parsed.data
}

/** Validated NEXT_PUBLIC_* variables. Safe to import anywhere, client or server. */
export const publicEnv = loadPublicEnv()
