import { submitBooking } from "@/actions/booking-actions"
import { apiError, apiSuccess } from "@/lib/api/response"
import { logger } from "@/lib/logger"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== "object") {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.")
  }

  try {
    const result = await submitBooking(body)

    if (result.status === "error") {
      return apiError("VALIDATION_ERROR", result.message, { details: result.fieldErrors })
    }

    return apiSuccess({ submitted: true })
  } catch (cause) {
    logger.error("booking route failed", { error: cause instanceof Error ? cause.message : String(cause) })
    return apiError("INTERNAL_ERROR", "Something went wrong while submitting your booking. Please try again.")
  }
}
