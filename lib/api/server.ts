import "server-only"
import { env } from "@/lib/env"

export class ServerFetchError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly cause?: unknown
  ) {
    super(message)
    this.name = "ServerFetchError"
  }
}

/**
 * Base URL for server-to-server calls back into this deployment (e.g. from a
 * cron job, webhook handler, or server action that needs an absolute URL).
 * Prefers Vercel's own runtime URL over the public app URL so preview
 * deployments call themselves rather than production.
 */
export function internalBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return env.NEXT_PUBLIC_APP_URL
}

/**
 * Fetch wrapper for server-side calls to third-party/private services (an
 * email provider, storage, a database's REST API, etc). Distinct from
 * `@/lib/api/client`'s `apiFetch`, which targets this app's own public
 * `/api/*` routes — this one is for outbound calls that may carry secrets
 * (API keys, service tokens) and must never run in the browser.
 */
export async function serverFetch<T>(
  url: string,
  options?: RequestInit & { timeoutMs?: number }
): Promise<T> {
  const { timeoutMs = 10_000, ...init } = options ?? {}

  let response: Response
  try {
    response = await fetch(url, {
      ...init,
      signal: init.signal ?? AbortSignal.timeout(timeoutMs),
    })
  } catch (cause) {
    if (cause instanceof Error && cause.name === "TimeoutError") {
      throw new ServerFetchError(`Request to ${url} timed out after ${timeoutMs}ms`, 504, cause)
    }
    throw new ServerFetchError(`Request to ${url} failed`, undefined, cause)
  }

  if (!response.ok) {
    // Log full detail server-side only; callers should surface a generic message.
    console.error(`[serverFetch] ${url} responded ${response.status}`)
    throw new ServerFetchError(`Upstream request failed: ${response.status}`, response.status)
  }

  return response.json() as Promise<T>
}
