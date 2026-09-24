import { apiConfig } from "@/lib/api/config"
import type { ApiResponse } from "@/lib/api/response"

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message)
    this.name = "ApiRequestError"
  }
}

/**
 * Shared client for calling this app's own `/api/*` route handlers. Use this
 * instead of scattering `fetch("/api/...")` (or hard-coded absolute URLs)
 * through page and component code — the base URL and timeout come from one
 * validated place (`@/lib/api/config`) and every caller gets the same
 * timeout/error handling for free.
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { timeoutMs?: number }
): Promise<T> {
  const { timeoutMs = apiConfig.defaultTimeoutMs, ...init } = options ?? {}

  let response: Response
  try {
    response = await fetch(`${apiConfig.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      signal: init.signal ?? AbortSignal.timeout(timeoutMs),
    })
  } catch (cause) {
    if (cause instanceof Error && cause.name === "TimeoutError") {
      throw new ApiRequestError(`Request to ${path} timed out after ${timeoutMs}ms`, 504, "TIMEOUT")
    }
    throw new ApiRequestError(`Request to ${path} failed`, 0, "NETWORK_ERROR")
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null

  if (!response.ok || !body || body.success === false) {
    const message = body && body.success === false ? body.error.message : `API request failed: ${response.status}`
    const code = body && body.success === false ? body.error.code : "UNKNOWN_ERROR"
    throw new ApiRequestError(message, response.status, code)
  }

  return body.data
}
