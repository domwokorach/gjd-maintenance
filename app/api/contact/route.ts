import { submitContact } from "@/actions/contact-actions"
import { apiError, apiSuccess } from "@/lib/api/response"
import { logger } from "@/lib/logger"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== "object") {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.")
  }

  try {
    const result = await submitContact(body)

    if (result.status === "error") {
      return apiError("VALIDATION_ERROR", result.message, { details: result.fieldErrors })
    }

    return apiSuccess({ submitted: true })
  } catch (cause) {
    logger.error("contact route failed", { error: cause instanceof Error ? cause.message : String(cause) })
    return apiError("INTERNAL_ERROR", "Something went wrong while sending your message. Please try again.")
  }
}
