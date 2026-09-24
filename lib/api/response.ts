import { NextResponse } from "next/server"
import type { ZodError } from "zod"

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "TIMEOUT"
  | "UNKNOWN_ERROR"

export type ApiResponse<T> =
  | { success: true; data: T }
  | {
      success: false
      error: {
        code: ApiErrorCode
        message: string
        /** Optional field-level details, e.g. Zod issues. Never stack traces. */
        details?: Record<string, string | undefined>
      }
    }

const STATUS_BY_CODE: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
  TIMEOUT: 504,
  UNKNOWN_ERROR: 500,
}

/** Route handlers should return this for every successful response. */
export function apiSuccess<T>(data: T, init?: { status?: number }) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status: init?.status ?? 200 })
}

/**
 * Route handlers should return this for every error response. Never pass
 * `message` a raw caught error's `.message` for anything that might contain
 * internal details (DB errors, stack traces) — write a safe message instead
 * and log the original server-side.
 */
export function apiError(
  code: ApiErrorCode,
  message: string,
  init?: { details?: Record<string, string | undefined>; status?: number }
) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: { code, message, details: init?.details } },
    { status: init?.status ?? STATUS_BY_CODE[code] }
  )
}

/** Turns Zod field issues into the flat `details` shape `apiError` expects. */
export function zodIssuesToDetails(error: ZodError): Record<string, string> {
  const details: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "(root)"
    if (!details[key]) details[key] = issue.message
  }
  return details
}
