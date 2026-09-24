import { env } from "@/lib/env"
import { apiSuccess } from "@/lib/api/response"

/**
 * Lightweight liveness check for uptime monitoring / Vercel deployment
 * checks. Reports which environment is running, never any configuration
 * values.
 */
export async function GET() {
  return apiSuccess({
    status: "ok",
    environment: env.APP_ENV,
    timestamp: new Date().toISOString(),
  })
}
