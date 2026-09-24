/**
 * Runs once when a new server instance boots, before it accepts requests.
 * Importing `@/lib/env` triggers Zod validation as a side effect, so a
 * missing/invalid required variable crashes startup loudly instead of
 * failing silently the first time a route handler touches it.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/lib/env")
  }
}
